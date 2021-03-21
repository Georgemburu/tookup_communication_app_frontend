import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/User';
import { ChoosenContactsForSendObservableService } from 'src/app/choosen-contacts-for-send-observable.service';
import { UserObservableService } from 'src/app/user-observable.service';
import { ClicksObservableService } from 'src/app/clicks-observable.service';
import { MessagingFilesChoiceType } from 'src/app/models/MessagingFilesChoice';

@Component({
  selector: 'app-choose-contacts-for-send-contacts-list-modal',
  templateUrl: './choose-contacts-for-send-contacts-list-modal.component.html',
  styleUrls: ['./choose-contacts-for-send-contacts-list-modal.component.css']
})
export class ChooseContactsForSendContactsListModalComponent implements OnInit, OnDestroy {
  // LOCALS
  selectedContactsFromModalArray = [];
  CONTACT_messagingFileChoice:MessagingFilesChoiceType = 'CONTACT';
  checkedCheckboxArray = [];
  // from observers
  showChooseContactsForSendContactsListModal:boolean;
  choosenContactsForSendArray:User[];
  contactsArray: User[];
  whichMessagingFileChoiceClicked: MessagingFilesChoiceType;

  // SUBSCRIBERS
  choosenContactsForSendArraySubscriber: any;
  contactsArraySubscriber: any;
  whichMessagingFileChoiceClickedSubscriber: any;


  constructor(
    private choosenContactsForSendObservableService: ChoosenContactsForSendObservableService,
    private userObservableService: UserObservableService,
    private clicksObservableService: ClicksObservableService
  ) { }

  ngOnInit(): void {
    // set choosenContactsForSendArray
    this.choosenContactsForSendArraySubscriber = this.choosenContactsForSendObservableService.choosenContactsForSendArray.subscribe((choosenContactsForSendArray_)=>{
      this.choosenContactsForSendArray = choosenContactsForSendArray_;
      if(!choosenContactsForSendArray_ ){
        // clear the selectedContactsFromModalArray
        this.selectedContactsFromModalArray = [];
        // check if any elements are checked the de check
        this.unCheckAllCheckedCheckboxFromArray()
        // clear checked elems array
        this.checkedCheckboxArray = [];
      }
    })
    // set contactlist array
    this.contactsArraySubscriber = this.userObservableService.contactsArray.subscribe((contactsArray_)=>{
      console.log('SETTING contacts array:',contactsArray_)
      this.contactsArray = contactsArray_;
    })
    // set which messaging file choice clicked
    this.whichMessagingFileChoiceClickedSubscriber = this.clicksObservableService.whichMessagingFilesChoiceClicked.subscribe((whichMessagingFIleChoiceClicked_)=>{
      this.whichMessagingFileChoiceClicked = whichMessagingFIleChoiceClicked_;
    })
  }


  // handle select box change event
  handleContactSelectCheckboxChangeEvent($event:any,contact:User){
    console.log('clicked',$event,contact)
    let isChecked = $event.target.checked;
    if(!isChecked){
      // not checked 
      // check if unselected contact was in the array the remove from array
      let index = this.selectedContactsFromModalArray.indexOf(contact);
      if(index!=-1){
        this.selectedContactsFromModalArray.splice(index,1)
      }
      let indexOfCheckedElem = this.checkedCheckboxArray.indexOf($event.target);
      if(indexOfCheckedElem!=-1){
        this.checkedCheckboxArray.splice(indexOfCheckedElem,1)
      }
    }else {
      // handle checked
      // 1. add to selected contacts array
      // check if contact is already in list
      if(this.selectedContactsFromModalArray.indexOf(contact)==-1){
        // this contact is not in the array: push it
        this.selectedContactsFromModalArray.push(contact)
        // add to checkedElementsArray
        this.checkedCheckboxArray.push($event.target)
      }
    }
  }

  unCheckAllCheckedCheckboxFromArray(){
    this.checkedCheckboxArray.forEach((ele)=>{
      if(ele.checked){
        ele.checked = false
      }
    })
  }
  // cancel button click
  handleCancelButtonClick(){
    // clear the selectedContactsFromModalArray
    this.selectedContactsFromModalArray = [];
    // check if any elements are checked the de check
    this.unCheckAllCheckedCheckboxFromArray()
    // clear checked elems array
    this.checkedCheckboxArray = [];
    // hide the modal
    this.clicksObservableService.unsetWhichMessagingFilesChoiceClicked();
  }
  // OK button click
  handleOkButtonClick(){
    // set the selected contacts from Modal Array to store
    this.choosenContactsForSendObservableService.setChoosenContactForSendArray(this.selectedContactsFromModalArray);
    // the closing of the modal here is carried out in the
    //  choosenContacts for send array subscriber

  }
  ngOnDestroy(): void {
    this.choosenContactsForSendArraySubscriber.unsubscribe();
    this.contactsArraySubscriber.unsubscribe();
    this.whichMessagingFileChoiceClickedSubscriber.unsubscribe();
  }
}
