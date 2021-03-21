import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessagesObject } from './models/ChatMessagesObject';

// 
import { UserObservableService } from './user-observable.service';
import { ContactsObject } from './models/ContactsObject';
import { NewOrderedChatMessagesForDisplay, Message } from './models/Message';
import { ClicksObservableService } from './clicks-observable.service';
import { DocumentsObservableService } from './documents-observable.service';

@Injectable({
  providedIn: 'root'
})
export class OneoneoneChatObservableService {
  private chatMessagesObjectSubject = new BehaviorSubject<ChatMessagesObject>(null);
  chatMessagesObject = this.chatMessagesObjectSubject.asObservable();

  private orderedChatsArrSubject = new BehaviorSubject(null);
  orderedChatsArr = this.orderedChatsArrSubject.asObservable();

  private newOrderedchatMessagesForDisplaySubject = new BehaviorSubject<NewOrderedChatMessagesForDisplay>(null);
  newOrderedchatMessagesForDisplay = this.newOrderedchatMessagesForDisplaySubject.asObservable();

  private orderedMessagesSubject = new BehaviorSubject<any>(null);
  orderedMessages = this.orderedMessagesSubject.asObservable();

  constructor(
    private clicksObservableService:ClicksObservableService,
    private documentsObservableService: DocumentsObservableService,
    private userObservableService: UserObservableService
    ) { }

  setChatMessagesObject(chatMessagesObj:ChatMessagesObject,contactsObject){
    console.log('setChatMessagesObject CALLED WITH ChatMessagesObject(:',chatMessagesObj,')')
    if(!chatMessagesObj || !contactsObject)return
    this.chatMessagesObjectSubject.next(chatMessagesObj);
    let chatMessagesObjKey = Object.keys(chatMessagesObj);

    this.setChatMessagesKeys(chatMessagesObjKey,contactsObject);

    // append chatMessage if msg has attachment
    let idsArray = Object.keys(chatMessagesObj);
    idsArray.forEach((id__)=>{
      console.log('LOOPING ids (key):',id__)
      chatMessagesObj[id__].forEach((msg)=>{
        if(msg.hasAttachment){
          // append to all documents array
          console.log('Msg has attachment:',msg)
          this.documentsObservableService.appendFileDocumentToExistingFileDocumentsArray(msg);
        }
      })
    })
  }

  unsetChatMessagesObject(){
    this.chatMessagesObjectSubject.next(null);
  }
  
  setChatMessagesKeys(chatMessagesKeys:string[],contactsObject:ContactsObject){
    let _orderedChatsArr = [];
    chatMessagesKeys.forEach((idKy)=>{
      
      let contactInfo = contactsObject[idKy];
      let messagesWithContact = this.chatMessagesObject[idKy]
      _orderedChatsArr.push({
        contactInfo: contactInfo,
        messages: messagesWithContact
      })
    })
    // observe ordered chats array
    this.orderedChatsArrSubject.next(_orderedChatsArr)

  } 


  appendSentMessageToChatMessagesObject(sentMessage: Message,chattingWithId: string,contactsObject){
    console.log('CALLED: appendSentMessageToChatMessagesObject')
    if(!sentMessage || !contactsObject)return  new Error('arguments not passed')
    let chatMessageObj = {
      [chattingWithId]:[sentMessage]
    }
    if(!this.chatMessagesObjectSubject.value){
      this.setChatMessagesObject(chatMessageObj,contactsObject)
      console.log('In the append chat Message: SET instead cause no previous value')
    }else {
      // append 
      if(this.chatMessagesObjectSubject.value[chattingWithId] && this.chatMessagesObjectSubject.value[chattingWithId].length >0){
        this.chatMessagesObjectSubject.next({
          ...this.chatMessagesObjectSubject.value,
          [chattingWithId]:[...this.chatMessagesObjectSubject.value[chattingWithId],sentMessage]
        });
        console.log('Append chat message')
      }else {
        this.chatMessagesObjectSubject.next({
          ...this.chatMessagesObjectSubject.value,
          [chattingWithId]:[sentMessage]
        });
        console.log('Append chat message')
      }
      
      
      let chatMessagesObjKey = Object.keys(this.chatMessagesObjectSubject.value);

      this.setChatMessagesKeys(chatMessagesObjKey,contactsObject);

      // append chatMessage if msg has attachment
      let idsArray = Object.keys(this.chatMessagesObjectSubject.value);
      idsArray.forEach((id__)=>{
        console.log('LOOPING ids (key):',id__)
        this.chatMessagesObjectSubject.value[id__].forEach((msg)=>{
          if(msg.hasAttachment){
            // append to all documents array
            console.log('Msg has attachment:',msg)
            this.documentsObservableService.appendFileDocumentToExistingFileDocumentsArray(msg);
          }
        })
      })
    }
  }


  appendRecievedMessageToChatMessagesObject(receivedMessage: Message,contactsObject:ContactsObject){
    console.log('CALLED appendRecievedMessageToChatMessagesObject')
    if(!receivedMessage) return

    if(this.chatMessagesObjectSubject.value && this.chatMessagesObjectSubject.value[receivedMessage.from] && this.chatMessagesObjectSubject.value[receivedMessage.from].includes(receivedMessage)){
      return
    }
    let recievedMessageObj = {
      [receivedMessage.from]:[receivedMessage]
    }


    if(!this.chatMessagesObjectSubject.value){
      this.setChatMessagesObject(recievedMessageObj,contactsObject)
    }else {
      // append 
      if(this.chatMessagesObjectSubject.value && this.chatMessagesObjectSubject.value[receivedMessage.from] && this.chatMessagesObjectSubject.value[receivedMessage.from].length > 0){
        this.chatMessagesObjectSubject.next({
          ...this.chatMessagesObjectSubject.value,
          [receivedMessage.from]:[...this.chatMessagesObjectSubject.value[receivedMessage.from],receivedMessage]
        });
      }else {
        this.chatMessagesObjectSubject.next({
          ...this.chatMessagesObjectSubject.value,
          [receivedMessage.from]:[receivedMessage]
        });
      }
      
      
      let chatMessagesObjKey = Object.keys(this.chatMessagesObjectSubject.value);

      this.setChatMessagesKeys(chatMessagesObjKey,contactsObject);

      // append chatMessage if msg has attachment
      let idsArray = Object.keys(this.chatMessagesObjectSubject.value);
      idsArray.forEach((id__)=>{
        console.log('LOOPING ids (key):',id__)
        this.chatMessagesObjectSubject.value[id__].forEach((msg)=>{
          if(msg.hasAttachment){
            // append to all documents array
            console.log('Msg has attachment:',msg)
            this.documentsObservableService.appendFileDocumentToExistingFileDocumentsArray(msg);
          }
        })
      })
    }

  }


  /***
   * setOrderedMessagesObject
   */
  setOrderedMessagesObject(orderedMessages_){
    console.log('called setOrderedMessagesObject with:: ',orderedMessages_)
    if(!orderedMessages_) return

    this.orderedMessagesSubject.next(orderedMessages_)
  }
  

  appendSentMessageToOrderedMessagesObject(msg){
    if(!msg) return
    let obj = {
      from: msg.from,
      to: msg.to,
      messages: [msg]
    }
    console.log('BEFORE Appended to OrderedMessagesObject:',this.orderedMessagesSubject.value)
    if(this.orderedMessagesSubject.value && this.orderedMessagesSubject.value[msg.to] && this.orderedMessagesSubject.value[msg.to].length>0){
      this.orderedMessagesSubject.next({
      ...this.orderedMessagesSubject.value,
        [msg.to]: [...this.orderedMessagesSubject.value[msg.to],obj]
      })
    }else {
      this.orderedMessagesSubject.next({
        ...this.orderedMessagesSubject.value,
          [msg.to]: [obj]
        })
    }
    console.log('AFTER Appended to OrderedMessagesObject:',this.orderedMessagesSubject.value)
  }

  appendReceivedMessageToOrderedMessagesObject(msg){
    if(!msg) return
    let obj = {
      from: msg.from,
      to: msg.to,
      messages: [msg]
    }
    console.log('BEFORE Appended to OrderedMessagesObject:',this.orderedMessagesSubject.value)
    if(this.orderedMessagesSubject.value && this.orderedMessagesSubject.value[msg.from] && this.orderedMessagesSubject.value[msg.from].length>0){
      this.orderedMessagesSubject.next({
      ...this.orderedMessagesSubject.value,
        [msg.from]: [...this.orderedMessagesSubject.value[msg.from],obj]
      })
    }else {
      this.orderedMessagesSubject.next({
        ...this.orderedMessagesSubject.value,
          [msg.from]: [obj]
        })
    }
    
    console.log('AFTER Appended to OrderedMessagesObject:',this.orderedMessagesSubject.value)
  }
  


}
