import { Component, OnInit, OnDestroy } from '@angular/core';
import { WhichChatTab } from 'src/app/models/Tabs';
import { ClicksObservableService } from 'src/app/clicks-observable.service';
import { Observable } from 'rxjs';
import { UserObservableService } from 'src/app/user-observable.service';
import { User } from 'src/app/models/User';
import { ChatService } from 'src/app/chat.service';
import { Group } from 'src/app/models/Group';
import { sendMessageWithFileRequestResponse, sendGroupMessageWithFileRequestResponse, sendGroupMessageWithNoFileRequestResponse, SendContactToDirectChatRequestResponse, SendContactToGroupChatRequestResponse, SendDirectMessageWithNoFileRequestResponse } from 'src/app/models/requests';
import { GroupService } from 'src/app/group.service';
import { ChoosenFilesObservableService } from 'src/app/choosen-files-observable.service';
import { MessagingFilesChoiceType, MessagingFileChoice } from 'src/app/models/MessagingFilesChoice';
import { ChoosenContactsForSendObservableService } from 'src/app/choosen-contacts-for-send-observable.service';
import { ChatMessageObjectToSend } from 'src/app/models/ChatMessageObjectToSend';
import { GroupChatObservableService } from 'src/app/group-chat-observable.service';
import { DocumentsObservableService } from 'src/app/documents-observable.service';
import { OneoneoneChatObservableService } from 'src/app/oneoneone-chat-observable.service';
import { ContactsObject } from 'src/app/models/ContactsObject';

@Component({
  selector: 'app-messaging-typing-input',
  templateUrl: './messaging-typing-input.component.html',
  styleUrls: ['./messaging-typing-input.component.css']
})
export class MessagingTypingInputComponent implements OnInit, OnDestroy {
  messsageTyped:string = '';
  whichChatTabClicked:WhichChatTab;
  userInfoObject: User;
  clickedContact: User;
  clickedGroup: Group;
  whichMessagingFileChoiceClicked:MessagingFilesChoiceType;
  messagingFileChoiceObject:MessagingFileChoice;
  choosenContactsForSendArray:User[];
  contactsObject: ContactsObject;

  // SUBSCRIBERS
  whichChatTabClickedSubscriber:any;
  userInfoObjectSubscriber: any;
  clickedContactSubscriber: any;
  clickedGroupSubscriber: any;
  whichMessagingFileChoiceClickedSubscriber:any;
  messagingFileChoiceObjectSubscriber: any;
  choosenContactsForSendArraySubscriber: any;
  contactsObjectSubscriber: any;
  sendMessageWithFileSubscriber:any;
  sendDirectMessageSubscriber:any;
  sendGroupMessageWithFileSubscriber:any;
  sendGroupMessageSubscriber:any;
  sendContactToDirectChatSubscriber:any;
  sendContactToGroupChatSubscriber:any;
 
  constructor(
    private clicksObservableService: ClicksObservableService,
    private userObservableService: UserObservableService,
    private chatService: ChatService,
    private groupService: GroupService,
    private choosenFilesObservableService: ChoosenFilesObservableService,
    private choosenContactsForSendObservableService: ChoosenContactsForSendObservableService,
    private groupChatObservableService: GroupChatObservableService,
    private documentsObservableService: DocumentsObservableService,
    private oneoneoneChatObservableService: OneoneoneChatObservableService
  ) { }

  ngOnInit(): void {
    // which tab clicked
    this.whichChatTabClickedSubscriber = this.clicksObservableService.whichChatTabClicked.subscribe((whichChatTabClicked_)=>{
      this.whichChatTabClicked = whichChatTabClicked_;
    })
    // user info object
    this.userInfoObjectSubscriber = this.userObservableService.userObj.subscribe((userInfoObject_)=>{
      this.userInfoObject = userInfoObject_;
    })
    // clicked contact
    this.clickedContactSubscriber = this.clicksObservableService.clickedContact.subscribe((clickedContact_)=>{
      this.clickedContact = clickedContact_;
    })
    // clicked group
    this.clickedGroupSubscriber = this.clicksObservableService.clickedGroup.subscribe((clickedGroup_)=>{
      this.clickedGroup = clickedGroup_;
    })

    // set which mesaging file choice clicked
    this.whichMessagingFileChoiceClickedSubscriber = this.clicksObservableService.whichMessagingFilesChoiceClicked.subscribe((whichMessagingFilesChoiceClicked_)=>{
      this.whichMessagingFileChoiceClicked = whichMessagingFilesChoiceClicked_;
      // console.log('SET:whichMessagingFileChoiceClicked',whichMessagingFilesChoiceClicked_)
    })
    // set selectedFileObject
    this.messagingFileChoiceObjectSubscriber = this.choosenFilesObservableService.messagingFileChoice.subscribe((messagingFileChoice_)=>{
      this.messagingFileChoiceObject = messagingFileChoice_;
      // console.log('SET:messagigFileChoiceObject',messagingFileChoice_)
    })
    // set choosenContactsForSendArray
    this.choosenContactsForSendArraySubscriber = this.choosenContactsForSendObservableService.choosenContactsForSendArray.subscribe((choosenContactsForSendArray_)=>{
      this.choosenContactsForSendArray = choosenContactsForSendArray_

      // perfom send action to server if choosenContactsForSendArray is populated
      // means the send button on the choose contacts for send contacts list modal has 
      // been clicked
      if(choosenContactsForSendArray_ && choosenContactsForSendArray_.length>0){
        this.sendContact();
      }

    })
    // set contacts object
    this.contactsObjectSubscriber =  this.userObservableService.contactsObject.subscribe((contactsObject_)=>{
      this.contactsObject = contactsObject_
    })

  }

 generateFormData(object_){
  let formData = new FormData();
  Object.keys(object_).forEach((k)=>{
    formData.append(k,object_[k])
  })
  return formData
 }
   // send message
  sendMessage(){
    // handle pastes
    if(document.querySelector<HTMLInputElement>('#setemoj').value.trim()){
      if(this.messsageTyped==''||!this.messsageTyped){
        this.messsageTyped = document.querySelector<HTMLInputElement>('#setemoj').value;
      }
    } 

    // check which tab is clicked
    if(this.whichChatTabClicked=='DIRECT'){
      // handle direct chats
      // console.log('messsageTyped::',this.messsageTyped)
      let messageObjectToSend = {
        from: this.userInfoObject._id,
        to: this.clickedContact._id,
        messageText:this.messsageTyped,
        hasAttachment: this.messagingFileChoiceObject&&this.messagingFileChoiceObject.name?true:false, 
        attachmentUrl: null,
        file: this.messagingFileChoiceObject && this.messagingFileChoiceObject.file?this.messagingFileChoiceObject.file:null,
        hasContact: false,
        contactId: null, 
        contactName: null,
        contactPhoneNumber: null,
        contactEmail: null,
        
      }

      let directFormData = this.generateFormData(messageObjectToSend)

      // add file if any in the form data


      if(!this.clickedContact || !this.clickedContact._id ){
        // cannot send if clicked contact is null or empty object
      }else{
        // console.log('Sending:',messageObjectToSend)
        // good send to db
        if(this.messagingFileChoiceObject && this.messagingFileChoiceObject.file){
          this.sendMessageWithFileSubscriber =  this.chatService.sendMessageWithFile(directFormData).subscribe((data:sendMessageWithFileRequestResponse)=>{ 
            // console.log('Send Message with File Response:',data)
            if(!data.success){
              // handle error 
            }else {
              // handle success
              // append to chatMessages Object
              // the appends function also appends files to existing files document.
              this.oneoneoneChatObservableService.appendSentMessageToChatMessagesObject(data.sentMessage,messageObjectToSend.to,this.contactsObject) ;
              this.oneoneoneChatObservableService.appendSentMessageToOrderedMessagesObject(data.sentMessage);
              // this.documentsObservableService.appendFileDocumentToExistingFileDocumentsArray(data.sentMessage)

              // clear input
              // clear the input element
              this.messsageTyped = ''
              // clear the file Object
              this.messagingFileChoiceObject = null;
            }
          })
          // console.log('Sending message with file') 
        }else {
          // this.chatService.sendMessage(messageObjectToSend)
          // console.log('Sending message with no  file:',messageObjectToSend.file)

          // append to DOM by running the messages query
        // this.handleDirectMessage_MessageDisplayOn_DOM_AfterSend()
        
        this.sendDirectMessageSubscriber =  this.chatService.sendDirectMessage(messageObjectToSend).subscribe((data:SendDirectMessageWithNoFileRequestResponse)=>{
          // console.log('Response from send DIrect Messahge:',data)
          if(!data.success){
            // handle failure 
          }else {
            // handle success
            // the appends function also appends files to existing files document.
            this.oneoneoneChatObservableService.appendSentMessageToChatMessagesObject(data.sentMessage,messageObjectToSend.to,this.contactsObject) ;
            this.oneoneoneChatObservableService.appendSentMessageToOrderedMessagesObject(data.sentMessage)
            // send 
            this.chatService.send_ReceiveDirectMessage(data.sentMessage.to)
            // this.chatService.receiveMessage
            // clear input
            // clear the input element
            this.messsageTyped = ''
          }
        })
        }
        
        
      }


    // end if
    }else if(this.whichChatTabClicked=='GROUP'){
      // handle 'GROUP-CHATS'
      // console.log('handle group chat')
      // console.log('messsageTyped::',this.messsageTyped)
      let groupMessageObjectToSend = { 
        from: this.userInfoObject._id,
        to: this.clickedGroup._id,
        messageText:this.messsageTyped,
        hasAttachment: this.messagingFileChoiceObject&&this.messagingFileChoiceObject.name?true:false,
        attachmentUrl: null,
        file: this.messagingFileChoiceObject && this.messagingFileChoiceObject.file?this.messagingFileChoiceObject.file:null,
        hasContact: false,
        contactId: null, 
        contactName: null,
        contactPhoneNumber: null,
        contactEmail: null,
      }
      let groupFormData = this.generateFormData(groupMessageObjectToSend)
      // save the data
      if(!this.clickedGroup && !this.clickedGroup._id){
        // dont send
      }else { 
        // send
        // handle message with file
        // console.log('GROUP: Sending message with file');
        if(this.messagingFileChoiceObject && this.messagingFileChoiceObject.file){
          
          this.sendGroupMessageWithFileSubscriber = this.groupService.sendGroupMessageWithFile(groupFormData).subscribe((data:sendGroupMessageWithFileRequestResponse)=>{ 
            // console.log('Send GROUP Message with File Response:',data)
            if(!data.success){
              // handle error
            }else {
              // handle success
              // emit event for receipient to receive message
              // console.log('Sending receive group message event to receipients')
              let receipientIdsArr = this.clickedGroup.participants.filter((id_)=>id_!=this.userInfoObject._id)
              this.chatService.sendReceiveGroupMessage({receipientsIdArr: receipientIdsArr})

              // add the message to group messages Objects
              this.groupChatObservableService.appendMessageToGroups_GroupMessageObject(this.clickedGroup._id,data.sentMessage)

              // clear the input element
              this.messsageTyped = ''
              // clear the file Object
              this.messagingFileChoiceObject = null;
              // START DOM APPEND

              // append to DOM by running the messages query
              // this.handleGroupMessage_MessageDisplayOn_DOM_AfterSend()
              // END DOM APPEND

            }
          })
          // console.log('Sending message with file')
        }else {
          // handle message with no file
          // console.log('GROUP: Sending message with no file')
          
            this.sendGroupMessageSubscriber =  this.groupService.sendGroupMessage(groupMessageObjectToSend).subscribe((data:sendGroupMessageWithNoFileRequestResponse)=>{
            // console.log('Send Group Message Response:',data)
            if(!data.success){
              // handle error
            }else {
              // handle success
              // emit event for receipient to receive message
              // console.log('Sending receive group message event to receipients')
              let receipientIdsArr = this.clickedGroup.participants.filter((id_)=>id_!=this.userInfoObject._id)
              this.chatService.sendReceiveGroupMessage({receipientsIdArr: receipientIdsArr})
              // refresh current user
              
              // add the message to group messages Objects 
              this.groupChatObservableService.appendMessageToGroups_GroupMessageObject(this.clickedGroup._id,data.sentMessage)

              // clear the input element
              this.messsageTyped = ''
              // START DOM APPEND

              // append to DOM by running the messages query
              // this.handleGroupMessage_MessageDisplayOn_DOM_AfterSend()
              // END DOM APPEND
              
            }

          })
        }
        
      }

    } else {
      // console.log('No Chat tab clicked')
    }
    
    document.querySelector('.messages').scroll({
      top: document.querySelector('.messages .chatappend').scrollHeight,
      });
  }


  handleAttachmentClick(){
    let fileInput:HTMLInputElement = document.createElement('input');
    // <input type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*">
    // uploads document files
    fileInput.type = 'file'
    fileInput.accept = '.xls,.txt,.xl,.pdf';
    fileInput.click();
    fileInput.onchange = (e)=>{
      // console.log('File Input change detected');
      // console.log('e->',e)
      // console.log('files->',fileInput.files)
      // display the file in the input typing area and allow the user to click send to 
      // send
      let choosenFile = fileInput.files[0];
      let choosenFileName = choosenFile.name;
      let choosenFileType = choosenFile.type;
      let choosenFileSize = choosenFile.size;
      // console.log('choosenFileName',choosenFileName)

      if(this.messsageTyped.trim().length>0){
        let alreadyTypedMessage = this.messsageTyped;
        this.messsageTyped = `[ATTACHMENT] type:${choosenFileType.toString()} name:${choosenFileName.toString()} \n ${alreadyTypedMessage}`
      }else {
        this.messsageTyped = `[ATTACHMENT] type:${choosenFileType.toString()} name:${choosenFileName.toString()} \n`
      }

      // set to data management services
      this.choosenFilesObservableService.setMessagigFileChoice({
        name: choosenFileName,
        type: choosenFileType,
        size: choosenFileSize.toString(),
        file: choosenFile
      })

      this.clicksObservableService.setWhichMessagingFilesChoiceClicked('ATTACHMENT');

      // triggerModal
    //   <!-- Button trigger modal -->
    // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    //   Launch demo modal
    // </button>
    // triggers messagigFileChoiceModal
    // let triggerModalButton = document.createElement('button');
    // triggerModalButton.type = 'button';
    // triggerModalButton.setAttribute('data-toggle','modal')
    // triggerModalButton.setAttribute('data-target','#messagigFileChoiceModal')

    // triggerModalButton.click()
    }


  }


  handleDocumentClick(){
    let fileInput:HTMLInputElement = document.createElement('input');
    // <input type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*">
    // uploads document files
    fileInput.type = 'file'
    fileInput.accept = '.xls,.txt,.xl,.pdf';
    fileInput.click();
    fileInput.onchange = (e)=>{
      // console.log('File Input change detected');
      // console.log('e->',e)
      // console.log('files->',fileInput.files)
      // display the file in the input typing area and allow the user to click send to 
      // send
      let choosenFile = fileInput.files[0];
      let choosenFileName = choosenFile.name;
      let choosenFileType = choosenFile.type;
      let choosenFileSize = choosenFile.size;
      // console.log('choosenFileName',choosenFileName)

      if(this.messsageTyped.trim().length>0){
        let alreadyTypedMessage = this.messsageTyped;
        this.messsageTyped = `[DOCUMENT] type:${choosenFileType.toString()} name:${choosenFileName.toString()} \n ${alreadyTypedMessage}`
      }else {
        this.messsageTyped = `[DOCUMENT] type:${choosenFileType.toString()} name:${choosenFileName.toString()} \n`
      }

      // set to data management services
      this.choosenFilesObservableService.setMessagigFileChoice({
        name: choosenFileName,
        type: choosenFileType,
        size: choosenFileSize.toString(),
        file: choosenFile
      })

      this.clicksObservableService.setWhichMessagingFilesChoiceClicked('DOCUMENT');

      // triggerModal
    //   <!-- Button trigger modal -->
    // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    //   Launch demo modal
    // </button>
    // triggers messagigFileChoiceModal
    // let triggerModalButton = document.createElement('button');
    // triggerModalButton.type = 'button';
    // triggerModalButton.setAttribute('data-toggle','modal')
    // triggerModalButton.setAttribute('data-target','#messagigFileChoiceModal')

    // triggerModalButton.click()
    }

  } 

  handleContactClick(){
    // console.log('clicked contact')
    // show modal to select contact
    this.clicksObservableService.setWhichMessagingFilesChoiceClicked('CONTACT');
  }

  sendContact(){
    // console.log('Send Contact called')

    if(!this.choosenContactsForSendArray || this.choosenContactsForSendArray.length==0){
      // cant send if contacts array is null
      return
    }
    let choosenContactForSendObj = this.choosenContactsForSendArray[0];
    // let messageObjToSend = {
    //   from: this.userInfoObject._id,
    //   to: this.clickedContact._id,
    //   messageText:this.messsageTyped,
    //   hasAttachment: this.messagingFileChoiceObject&&this.messagingFileChoiceObject.name?true:false, 
    //   attachmentUrl: null,
    //   file: this.messagingFileChoiceObject && this.messagingFileChoiceObject.file?this.messagingFileChoiceObject.file:null,
    //   hasContacts: false,
    //   contantsArray: this.choosenContactsForSendArray  && this.choosenContactsForSendArray.length>0? this.choosenContactsForSendArray : null
    // }

     // check which tab is clicked
     let contactsDisplayObj = [];
     this.choosenContactsForSendArray.forEach((contact__)=>{
       contactsDisplayObj.push({
         Name: contact__.fullName,
         Email: contact__.email,
         PhoneNumber: contact__.phoneNumber
       })
     })
     let customMessageText = `[CONTACT] (${this.choosenContactsForSendArray.length}) : ${JSON.stringify(contactsDisplayObj).replace('"','').replace("'",'').replace('"','')}`
     if(this.whichChatTabClicked=='DIRECT'){
      // handle direct chats
      // console.log('messsageTyped::',this.messsageTyped)
      let messageObjectToSend:ChatMessageObjectToSend = {
        fromId: this.userInfoObject._id,
        toId: this.clickedContact._id,
        // messageText:customMessageText,
        messageText:null, 
        hasAttachment: false, 
        attachmentUrl: null,
        file: null,
        hasContact: true,
        contactId: choosenContactForSendObj._id,
        contactName: choosenContactForSendObj.fullName,
        contactEmail: choosenContactForSendObj.email,
        contactPhoneNumber: choosenContactForSendObj.phoneNumber
      }

      // let directFormData = this.generateFormData(messageObjectToSend)

      // add file if any in the form data


      if(!this.clickedContact || !this.clickedContact._id ){
        // cannot send if clicked contact is null or empty object
      }else{
        // console.log('Sending:',messageObjectToSend)
        // good send to 
        
        this.sendContactToDirectChatSubscriber = this.chatService.sendContactToDirectChat(messageObjectToSend).subscribe((data:SendContactToDirectChatRequestResponse)=>{
          // console.log('send contact request response:',data)
          if(!data.success){
            // handle error
          }else {
            // add the message to group messages Objects
            
            this.oneoneoneChatObservableService.appendSentMessageToChatMessagesObject(data.sentMessage,messageObjectToSend.toId,this.contactsObject) ;
            this.oneoneoneChatObservableService.appendSentMessageToOrderedMessagesObject(data.sentMessage);
          }
        })
        // Display message on DOM
        // this.handleDirectMessage_MessageDisplayOn_DOM_AfterSend(customMessageText)
        // hide modal and reset
        this.choosenContactsForSendObservableService.unsetChoosenContactForSendArray();
        this.clicksObservableService.unsetWhichMessagingFilesChoiceClicked();
      }


    // end if
      }else if(this.whichChatTabClicked=='GROUP'){
        // handle 'GROUP-CHATS'
        // console.log('handle group chat')
        // console.log('messsageTyped::',this.messsageTyped)
        // let groupMessageObjectToSend = {
        //   from: this.userInfoObject._id,
        //   to: this.clickedGroup._id,
        //   messageText:this.messsageTyped,
        //   hasAttachment: this.messagingFileChoiceObject&&this.messagingFileChoiceObject.name?true:false,
        //   attachmentUrl: null,

        // }
        let messageObjectToSend:ChatMessageObjectToSend = {
          fromId: this.userInfoObject._id,
          toId: this.clickedGroup._id,
          messageText:customMessageText,
          hasAttachment: false, 
          attachmentUrl: null,
          file: null,
          hasContact: true,
          contactId: choosenContactForSendObj._id,
          contactName: choosenContactForSendObj.fullName,
          contactEmail: choosenContactForSendObj.email,
          contactPhoneNumber: choosenContactForSendObj.phoneNumber
        }

        // save the data
        if(!this.clickedGroup && !this.clickedGroup._id){
          // dont send 
        }else { 
          // send
          // this.groupService.sendGroupMessage(groupMessageObjectToSend).subscribe((data:DefaultResponse)=>{
          //   console.log('Send Group Message Response:',data)
          //   if(!data.success){
          //     // handle error
          //   }else {
          //     // handle success
          //     // emit event for receipient to receive message
          //     console.log('Sending receive group message event to receipients')
          //     let receipientIdsArr = this.clickedGroup.participants.filter((id_)=>id_!=this.userInfoObject._id)
          //     this.chatService.sendReceiveGroupMessage({receipientsIdArr: receipientIdsArr})
          //     // refresh current user
              

          //     // START DOM APPEND
          //     this.handleGroupMessage_MessageDisplayOn_DOM_AfterSend(customMessageText)
          //     // END DOM APPEND
              
          // }
          
          this.sendContactToGroupChatSubscriber = this.groupService.sendContactToGroupChat(messageObjectToSend).subscribe((data:SendContactToGroupChatRequestResponse)=>{
            // console.log('sendContactToGroupChat RESPONSE:',data)
            if(!data.success){
              // handle error
            }else {
              // handle success
              // this.handleGroupMessage_MessageDisplayOn_DOM_AfterSend(customMessageText)
              // append message to grop messages
              this.groupChatObservableService.appendMessageToGroups_GroupMessageObject(this.clickedGroup._id,data.sentMessage)
              // emit event for receipient to receive message
              // console.log('Sending receive group message event to receipients')
              let receipientIdsArr = this.clickedGroup.participants.filter((id_)=>id_!=this.userInfoObject._id)
              this.chatService.sendReceiveGroupMessage({receipientsIdArr: receipientIdsArr})
              // refresh current user
              // hide modal and reset
              this.choosenContactsForSendObservableService.unsetChoosenContactForSendArray()
              this.clicksObservableService.unsetWhichMessagingFilesChoiceClicked()
            }
          })

          }
      }else {
      // console.log('No Chat tab clicked')
      }
    
    document.querySelector('.messages').scroll({
      top: document.querySelector('.messages .chatappend').scrollHeight,
    });

      // END

  }

  handleDirectMessage_MessageDisplayOn_DOM_AfterSend(customMessageText:string=null){
    let elemToAppendto = document.querySelector('.messages .chatappend');
    let li = document.createElement('li')
    li.setAttribute('class','replies')
    let divMedia = document.createElement('div')
    divMedia.setAttribute('class','media')
    let divProfile = document.createElement('div')
    divProfile.setAttribute('class','profile mr-4 bg-size')
    divProfile.setAttribute('style',"background-image: url(&quot;../assets/images/contact/1.jpg&quot;); background-size: cover; background-position: center center;")
    let divMediaBody = document.createElement('div')
    divMediaBody.setAttribute('class','media-body')
    let divContactname = document.createElement('div')
    divContactname.setAttribute('class','contact-name')
    let h5 = document.createElement('h5')
    h5.innerText = this.userInfoObject.fullName;
    let h6 = document.createElement('h6')
    h6.innerText = new Date().toTimeString().split(' ')[0];
    let ul1 = document.createElement('ul')
    ul1.setAttribute('class','msg-box')
    let li_Last = document.createElement('li')
    let h5_last = document.createElement('h5')
    h5_last.innerText = customMessageText || this.messsageTyped;

    li_Last.appendChild(h5_last)
    ul1.appendChild(li_Last)

    divContactname.appendChild(h5)
    divContactname.appendChild(h6)
    divContactname.appendChild(ul1)

    divMediaBody.appendChild(divContactname)

    divMedia.appendChild(divProfile)
    divMedia.appendChild(divMediaBody)

    li.appendChild(divMedia)
    // append to dom
    elemToAppendto.appendChild(li)

    if(customMessageText!==null){
      document.querySelector('.chat-main .active  h6').innerHTML = '<span>You : </span>' + customMessageText;

    }else {
      document.querySelector('.chat-main .active  h6').innerHTML = '<span>You : </span>' + this.messsageTyped;
    }

    if(!customMessageText){
      // clear input
      this.messsageTyped = ''
    }

    // status elem
    // let statusDiv = document.createElement('div');
    // statusDiv.setAttribute('class','badge badge-success sm ml-2')
    // statusDiv.setAttribute('id','ss')
    // statusDiv.innerText = 'sent'
    // end status elem
    
  }

  handleGroupMessage_MessageDisplayOn_DOM_AfterSend(customMessageText:string=null){
    // append to DOM by running the messages query
    // this.getChatMessagesFromDB()
    // let elemToAppendto = document.querySelector('.messages .active .chatappend');
    let elemToAppendto = document.querySelector('.group_chat_span_append');
    let li = document.createElement('li')
    // li.setAttribute('class','replies')
    li.setAttribute('class','sent')

    let divMedia = document.createElement('div')
    divMedia.setAttribute('class','media')
    let divProfile = document.createElement('div')
    divProfile.setAttribute('class','profile mr-4 bg-size')
    divProfile.setAttribute('style',"background-image: url(&quot;../assets/images/contact/1.jpg&quot;); background-size: cover; background-position: center center;")
    let divMediaBody = document.createElement('div')
    divMediaBody.setAttribute('class','media-body')
    let divContactname = document.createElement('div')
    divContactname.setAttribute('class','contact-name')
    let h5 = document.createElement('h5')
    h5.innerText = this.userInfoObject.fullName;
    let h6 = document.createElement('h6')
    h6.innerText = new Date().toTimeString().split(' ')[0];
    let ul1 = document.createElement('ul')
    ul1.setAttribute('class','msg-box')
    let li_Last = document.createElement('li')
    let h5_last = document.createElement('h5')
    h5_last.innerText = customMessageText || this.messsageTyped;

    li_Last.appendChild(h5_last)
    ul1.appendChild(li_Last)

    divContactname.appendChild(h5)
    divContactname.appendChild(h6)
    divContactname.appendChild(ul1)

    divMediaBody.appendChild(divContactname)

    divMedia.appendChild(divProfile)
    divMedia.appendChild(divMediaBody)

    li.appendChild(divMedia)
    // append to dom
    elemToAppendto.appendChild(li)

    // document.querySelector('.chat-main .active  h6').innerHTML = '<span>You : </span>' + this.messsageTyped;

    if(!customMessageText){
      // clear input
      this.messsageTyped = ''
    }
 
  }

  ngOnDestroy(){
    this.whichChatTabClickedSubscriber.unsubscribe();
    this.userInfoObjectSubscriber.unsubscribe();
    this.clickedContactSubscriber.unsubscribe();
    this.clickedGroupSubscriber.unsubscribe();
    this.whichMessagingFileChoiceClickedSubscriber.unsubscribe();
    this.messagingFileChoiceObjectSubscriber.unsubscribe();
    this.choosenContactsForSendArraySubscriber.unsubscribe();
    this.contactsObjectSubscriber.unsubscribe();
    this.sendMessageWithFileSubscriber.unsubscribe();
    this.sendDirectMessageSubscriber.unsubscribe();
    this.sendGroupMessageWithFileSubscriber.unsubscribe();
    this.sendGroupMessageSubscriber.unsubscribe();
    this.sendContactToDirectChatSubscriber.unsubscribe();
    this.sendContactToGroupChatSubscriber.unsubscribe();
  }

}
