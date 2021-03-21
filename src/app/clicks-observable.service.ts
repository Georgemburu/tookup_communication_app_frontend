import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/User';
import { Group } from './models/Group';
import { WhichChatTab } from './models/Tabs';
import { MessagingFilesChoiceType } from './models/MessagingFilesChoice';


@Injectable({
  providedIn: 'root'
})
export class ClicksObservableService {
  private clickedContactSubject = new BehaviorSubject<User>(null);
  clickedContact = this.clickedContactSubject.asObservable();
  private clickedGroupSubject = new BehaviorSubject<Group>(null);
  clickedGroup = this.clickedGroupSubject.asObservable();
  private whichChatTabClickedSubject = new BehaviorSubject<WhichChatTab>('DIRECT');
  whichChatTabClicked = this.whichChatTabClickedSubject.asObservable();

  private whichMessagingFilesChoiceClickedSubject = new BehaviorSubject<MessagingFilesChoiceType>(null);
  whichMessagingFilesChoiceClicked = this.whichMessagingFilesChoiceClickedSubject.asObservable()

  constructor() { }

  /**
   * CONTACT
   * @param contact The contact of the current logged in user
   */
  setClickedContact(contact:User){
    console.log('Setting clicked contact')
    console.log('B4 value:',this.clickedContactSubject.value)
    this.clickedContactSubject.next(contact);
    console.log('After value:',this.clickedContactSubject.value)

  }
  unsetClickedContact(){
    this.clickedContactSubject.next(null);
  }

  /**
   * GROUP
   */
  setClickedGroup(group:Group){
    console.log('Called setClicked Group: (args)',group)
    this.clickedGroupSubject.next(group);
  }
  unsetClickedGroup(){
    this.clickedGroupSubject.next(null);
  }

  /**
   * TABS
   */
  // HANDLE CHAT TABS CLICK
  /**
   * 
   * @param whichTabClicked_ 'DIRECT'|'GROUP
   */
  setWhichChatTabClicked(whichChatTabClicked_:WhichChatTab){
    this.whichChatTabClickedSubject.next(whichChatTabClicked_);
  }
    // handleDirectChatTabClick(data_to){
    //   console.log('Clicked DIRECT tab')
    //   this.whichChatTabClicked = 'DIRECT'
    // }
    // handleGroupChatTabClick(data_to){
    //   console.log('clicked GROUP tab')
    //   this.whichChatTabClicked = 'GROUP'
  
    // }

    /**
     * MESSAGING FILES CHOICE CLICKS
     */
  setWhichMessagingFilesChoiceClicked(which_:MessagingFilesChoiceType){
    this.whichMessagingFilesChoiceClickedSubject.next(which_)
  }
  unsetWhichMessagingFilesChoiceClicked(){
    this.whichMessagingFilesChoiceClickedSubject.next(null)
  }


}
