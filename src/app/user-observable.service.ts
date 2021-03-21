import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/User';
import { ContactsObject } from './models/ContactsObject';
import { Group } from './models/Group';
import { ClicksObservableService } from './clicks-observable.service';

@Injectable({
  providedIn: 'root'
})
export class UserObservableService {
  private userInfoObjectSubject = new BehaviorSubject<User>(null);
  userObj = this.userInfoObjectSubject.asObservable();
  
  private contactsObjectSubject = new BehaviorSubject<ContactsObject>(null);
  contactsObject = this.contactsObjectSubject.asObservable();

  private contactsArraySubject = new BehaviorSubject<User[]>(null);
  contactsArray = this.contactsArraySubject.asObservable();


  private currentUserGroupsArraySubject = new BehaviorSubject<Group[]>(null);
  currentUserGroupsArray = this.currentUserGroupsArraySubject.asObservable();

  // private 

   

  constructor(private clicksObservableService: ClicksObservableService) { }

  setUser(user:User){
    this.userInfoObjectSubject.next(user)
    console.log('SET USER: LOOK::',this.userInfoObjectSubject.value)
    // set contacts
    this.setContactsArray(user.contacts);
    this.setContactsObject(user.contacts);
    this.setCurrentUserGroupsArray(user.groups)
  }
  // sets the contacts of the user into an object with contacts id as the key
  setContactsObject(contactsArr:User[]){
    console.log('SEETTING CONTACTS OBJECT:(arg)',contactsArr)
    let obj:any = {};
    contactsArr.forEach((cnct)=>{
      let cnctId = cnct._id;
      obj[cnctId]=cnct;
    })
    // set to observer
    this.contactsObjectSubject.next(obj)
    // set clicked contact
    this.clicksObservableService.setClickedContact(contactsArr[0])
  }
  // set contactsArray
  setContactsArray(contactsArray:User[]){
    this.contactsArraySubject.next(contactsArray)
  }
  // 
  // set current users groups and instatiates clicked group
  setCurrentUserGroupsArray(groups_:Group[]){
    this.currentUserGroupsArraySubject.next(groups_)
    if(groups_.length>0){
      // set clicked group
      console.log('User groups length is greater than 0')
      console.log('Setting current clicked group to :',groups_[0])
      this.clicksObservableService.setClickedGroup(groups_[0]); 
    }else {
      console.log('User groups length is  0 or less')
      console.log('Not setting current clicked group')
    }
  }

  appendGroupToCurrentUserGroupsArray(group_:Group){
    console.log('B4 Appended User groups to Array:',this.currentUserGroupsArraySubject.value)
    this.currentUserGroupsArraySubject.next([...this.currentUserGroupsArraySubject.value,group_])
    if(this.currentUserGroupsArraySubject.value.length==1){
      // probably new group created 
      // set clicked group 
      this.clicksObservableService.setClickedGroup(group_); 

    }
  } 

  //  append a contact to the existing contacts object
  appendContactToContactsObj(contact_:User){
    let obj:any = {};
    let cnctId = contact_._id;
    obj[cnctId]=contact_;
    
    // set to observer
    this.contactsObjectSubject.next({...this.contactsObjectSubject.value,obj})
    // set to contacts array append
    this.appendContactToContactsArray(contact_)
  }

  // append a contact to existing contacts array
  appendContactToContactsArray(contact_:User){
    this.contactsArraySubject.next([...this.contactsArraySubject.value,contact_])
  }

  

  unsetUser(){
    this.userInfoObjectSubject.next(null)
    this.contactsObjectSubject.next(null)
  }
}
