import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from 'src/app/models/Group';
import { ClicksObservableService } from 'src/app/clicks-observable.service';
import { User } from 'src/app/models/User';
import { UserObservableService } from 'src/app/user-observable.service';
import { ContactsObject } from 'src/app/models/ContactsObject';
import { GroupMessagesObject } from 'src/app/models/GroupMessagesObject';
import { GroupChatObservableService } from 'src/app/group-chat-observable.service';
import { GroupService } from 'src/app/group.service';
import { ChatService } from 'src/app/chat.service';
import { DefaultResponse } from 'src/app/models/requests';
import { DownloadService } from 'src/app/download.service';
import { GMessage } from 'src/app/models/GMessage';
import { GroupMessagesResponseObject } from 'src/app/models/GroupMessagesResponseObject';
import { ReceivedContactAddContactObservableService } from 'src/app/received-contact-add-contact-observable.service';
import { FileDocumentType } from 'src/app/models/FileDocument';
import { DocumentsObservableService } from 'src/app/documents-observable.service';
import { ReceivedContactObject } from 'src/app/models/ReceivedContactObject'

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit, OnDestroy {
  clickedGroup: Group;
  userInfoObject: User;
  contactsObject: ContactsObject;
  groupMessagesObject: GroupMessagesObject;

  // LOCAL
  clickedContactToInviteToGroupChecker = {
    contact: null,
    isSent: false,
    isLoading: false
  }

  // SUBSCRIBERS 
  clickedGroupSubscriber: any;
  userInfoObjectSubscriber: any;
  contactsObjectSubscriber: any;
  groupMessagesObjectSubscriber: any;
  createGroupInvitationNotificationSubscriber: any;
  

  constructor(
    private clicksObservableService: ClicksObservableService,
    private userObservableService: UserObservableService,
    private groupChatObservableService: GroupChatObservableService,
    private groupService: GroupService,
    private chatService: ChatService,
    private downloadService: DownloadService,
    private receivedContactAddContactObservableService: ReceivedContactAddContactObservableService,
    private documentsObservableService: DocumentsObservableService
  ) { }

  ngOnInit(): void { 
    // set clicked group
    this.clickedGroupSubscriber = this.clicksObservableService.clickedGroup.subscribe((clickedGroup_)=>{
      this.clickedGroup = clickedGroup_;
    })
    // set userInfo Object
    this.userInfoObjectSubscriber = this.userObservableService.userObj.subscribe((userInfoObject_)=>{
      this.userInfoObject = userInfoObject_;
    })
    // set contacts object
    this.contactsObjectSubscriber = this.userObservableService.contactsObject.subscribe((contactsObject_)=>{
      this.contactsObject = contactsObject_;
    })
    // group  messages object
    this.groupMessagesObjectSubscriber = this.groupChatObservableService.groupMessagesObject.subscribe((groupMessagesObject_)=>{
      // console.log('HERE GROUP MESSAGES OBJ:',groupMessagesObject_)
      this.groupMessagesObject = groupMessagesObject_;
    })
  }


  // LOCAL HANDLER
  setGroupAdderInvitationsSentStatus(contact_: User, isLoading_: boolean, isSent_: boolean){
    this.clickedContactToInviteToGroupChecker = {
      contact:contact_,
      isLoading: isLoading_,
      isSent: isSent_
    }
  }
  // Handle showing contact list to add in group
  handleAddGroupParticipantButtonClick(){
    console.log('Clicked ')
    let x:any = document.querySelector('.gr-chat-frind-content')
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    } 
  }


  // handle create group invitation
  handleSendCreateGroupInvitationNotification(contact){
    // show loading
    this.setGroupAdderInvitationsSentStatus(contact,true,false)
    // send to server
    let payloadToSend = {
      from: this.userInfoObject._id,
      groupId: this.clickedGroup._id,
      receipientId: contact._id,
      currentUserFullName: this.userInfoObject.fullName,
      groupName: this.clickedGroup.groupName,
    }
    this.createGroupInvitationNotificationSubscriber = this.groupService.createGroupInvitationNotification(payloadToSend).subscribe((data:DefaultResponse)=>{
      console.log('Recieved create group notification response:',data)
      if(!data.success){
        // handle errror
        // reset loader
        this.setGroupAdderInvitationsSentStatus(null,false,false)
      }else {
        // handle success
        // emit event to the receipient to refresh
        this.chatService.send_RefreshAllUserInfo(payloadToSend.receipientId);
        // show is sent
        this.setGroupAdderInvitationsSentStatus(contact,false,true)
        // reset
        setTimeout(()=>{
          this.setGroupAdderInvitationsSentStatus(null,false,false)
        },2000)
      }
    })
  }


  //  handle group message click
  handleMessageClick(groupMessage:GMessage){
    console.log('Clicked group message:',groupMessage)
    // check whom its from rever if from current user

    // check is has attachment /contact
    if(groupMessage.hasAttachment){
      // handle has attachment
      this.handleMessageWithAttachmentClick(groupMessage)
    }else if(groupMessage.hasContact){
      // handle has contact
      this.handleMessageWithContactClick(groupMessage)
    }else {
      // has no contact or attachment
      return;
    }

  }

  // handle attachment click
  handleMessageWithAttachmentClick(message_:GMessage){
    console.log('called handleMessageWithAttachmentClick fn')
    if(message_.from==this.userInfoObject._id)return
    let attachmentUrl = message_.attachmentUrl;
    // download
    let splitUrl = attachmentUrl.split('/')
    let fileName = splitUrl[splitUrl.length-1]
    this.downloadService.downloadFile(attachmentUrl,fileName)

  }
  // handle contact click
  handleMessageWithContactClick(message_:GMessage){
    console.log('called handleMessageWithContactClick fn ')

    let parsedContactInfo:ReceivedContactObject = {
      id: null,
      email: null,
      phoneNumber: null,
      fullName: null
    };
    parsedContactInfo.id = message_.contactId;
    parsedContactInfo.email = message_.contactEmail;
    parsedContactInfo.phoneNumber = message_.contactPhoneNumber;
    parsedContactInfo.fullName = message_.contactName;

    // set the contacts info in a global state
    this.receivedContactAddContactObservableService.setContactToAddObjectInfo(parsedContactInfo)
    // show add contact modal
    let newContactModalOppenerButton:HTMLElement = document.querySelector('#newContactModalOppenerButton')
    newContactModalOppenerButton.click()
  }

  /**
   * Functions that returns the class name of the file type
   */
  whichFileIcon(document_:FileDocumentType){
    let fontCssString = this.documentsObservableService.whichFileIcon(document_)
    
    return fontCssString+' font-primary';
  }

  ngOnDestroy(): void{
    this.clickedGroupSubscriber.unsubscribe();
    this.userInfoObjectSubscriber.unsubscribe();
    this.groupMessagesObjectSubscriber.unsubscribe();
    this.contactsObjectSubscriber.unsubscribe();

    this.createGroupInvitationNotificationSubscriber.unsubscribe();
  }
}
