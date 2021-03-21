import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GroupMessagesObject } from './models/GroupMessagesObject';
import { GMessage } from './models/GMessage';
import { DocumentsObservableService } from './documents-observable.service';

@Injectable({
  providedIn: 'root'
})
export class GroupChatObservableService {
  private groupMessagesObjectSubject = new BehaviorSubject<GroupMessagesObject>(null);
  groupMessagesObject = this.groupMessagesObjectSubject.asObservable();

  constructor(
    private documentsObservableService: DocumentsObservableService
  ) { } 

  setGroupMessagesObject(groupMessagesObject_:GroupMessagesObject){
    this.groupMessagesObjectSubject.next(groupMessagesObject_);
    // get the messages with documents ie. hasAttachment==true
    let groupIdKeysArray = Object.keys(groupMessagesObject_);
    groupIdKeysArray.forEach((Gid)=>{
      groupMessagesObject_[Gid].forEach((Gmsg)=>{
        if(Gmsg.hasAttachment){
          // has attachment append to filedocuments array
          this.documentsObservableService.appendFileDocumentToExistingFileDocumentsArray(Gmsg);
        }
      })
    })

  }

  unsetGroupMessagesObject(){
    this.groupMessagesObjectSubject.next(null);
  }


  appendMessageToGroups_GroupMessageObject(groupId:string,groupMessage:GMessage){
    console.log('Appending G Message ')
    console.log('B4 APPEND: ',this.groupMessagesObjectSubject.value)
    if(!this.groupMessagesObjectSubject.value || !this.groupMessagesObjectSubject.value[groupId]){
      this.groupMessagesObjectSubject.next({
        [groupId]: [groupMessage]
      }) 
    }else {
      this.groupMessagesObjectSubject.next({
        ...this.groupMessagesObjectSubject.value,
        [groupId]: [...this.groupMessagesObjectSubject.value[groupId],groupMessage]
      })
    } 
     
    console.log('AFTER APPEND: ',this.groupMessagesObjectSubject.value)

    // append to allDocumentsArray if GMessage has attachment
    if(groupMessage.hasAttachment){
      this.documentsObservableService.appendFileDocumentToExistingFileDocumentsArray(groupMessage)
    }
  }
}
