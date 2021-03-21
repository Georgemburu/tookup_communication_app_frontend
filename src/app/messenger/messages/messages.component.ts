import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
import { Message } from 'src/app/models/Message';
import { ReceivedContactAddContactObservableService } from 'src/app/received-contact-add-contact-observable.service'
import { DownloadService } from 'src/app/download.service';
import { FileDocumentType } from 'src/app/models/FileDocument';
import { DocumentsObservableService } from 'src/app/documents-observable.service';
import { ReceivedContactObject } from 'src/app/models/ReceivedContactObject';
import { OneoneoneChatObservableService } from 'src/app/oneoneone-chat-observable.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  /**
   * DISPLAYS DIRECT MESSAGES
   */
  @Input() clickedContact;
  @Input() chatMessages;
  @Input() userInfoObject;
  
  // LOCALS
  // chatMessagesObject: any;
  // chatsWithClickedContactArray = [];
  orderedMessages = null;

  // SUBSCRIBERS
  // chatMessagesObjectSubscriber: any;
  orderedMessagesSubscriber: any;

  constructor(
    private chatService: ChatService,
    private receivedContactAddContactObservableService: ReceivedContactAddContactObservableService,
    private downloadService: DownloadService,
    private documentsObservableService: DocumentsObservableService,
    private oneoneoneChatObservableService: OneoneoneChatObservableService
    ) { }


 
  ngOnInit(): void {
    // })
    // set orderedMessages
    this.orderedMessagesSubscriber = this.oneoneoneChatObservableService.orderedMessages.subscribe((orderedMessages_)=>{
      this.orderedMessages = orderedMessages_;
      // console.log('MESSENGER received orderedMessagesSubscriber:',orderedMessages_)
    })
  }



  /**
   * MESSAGE CLICKS
   * 
   */
  handleMessageClick(message_:Message){
    // console.log('Clicked MESSAGE:',message_)
    // check if message has contact/ file/
    if(message_.hasContact){
      // console.log('Message has contact')
      // handle has contact
      // handle oppening filled in contact modal to add contact
      this.handleMessageWithContactClick(message_)

    }else if(message_.hasAttachment){
      // handle has attachment
      // is file handle downloading
      this.handleMessageWithAttachmentClick(message_)

    }else {
      // is plain message
    }

  }

  // handle attachment click
  handleMessageWithAttachmentClick(message_:Message){
    // console.log('called handleMessageWithAttachmentClick fn')
    if(message_.from==this.userInfoObject._id)return
    let attachmentUrl = message_.attachmentUrl;
    // download
    let splitUrl = attachmentUrl.split('/')
    let fileName = splitUrl[splitUrl.length-1]
    this.downloadService.downloadFile(attachmentUrl,fileName)

  } 
  // handle contact click
  handleMessageWithContactClick(message_:Message){
    // console.log('called handleMessageWithContactClick fn ')
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
    let newContactModalOppenerButton:HTMLElement = document.querySelector('#newContactModalOppenerButton');
    newContactModalOppenerButton.click();
  }

  /**
   * Functions that returns the class name of the file type
   */
  whichFileIcon(document_:FileDocumentType){
    let fontCssString = this.documentsObservableService.whichFileIcon(document_);
    return fontCssString+' font-primary';
  }


  ngOnDestroy(): void {
    // this.chatMessagesObjectSubscriber.unsubscribe();
    this.orderedMessagesSubscriber.unsubscribe();
  }
}
 