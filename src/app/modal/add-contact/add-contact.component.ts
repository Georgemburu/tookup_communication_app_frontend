import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ChatService } from 'src/app/chat.service';
import { UserObservableService } from 'src/app/user-observable.service';
import { GetUserResponse, AddContactResponse } from 'src/app/models/requests';
import { ReceivedContactAddContactObservableService } from 'src/app/received-contact-add-contact-observable.service';
import { ReceivedContactObject } from 'src/app/models/ReceivedContactObject';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit, OnDestroy {
  addContactButtonHasBeenClicked:boolean = false;

  // MESSAGES
  addContactFormErrorMessage:string = '';
  addContactFormSuccessMessage:string = '';

  // FORM TYPINGS
  addContactEmailTyped:string = '';
  addContactPhoneNumberTyped: string = '';

  // PASSED RECEIVED CONTACT OBJ
  receivedContactToAddObj:ReceivedContactObject;

  // SUBSCRIBERS
  getLoggedInUserInfoSubscriber:any;
  receivedContactToAddObjSubscriber: any;
  addContactSubscriber: any;

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private userObservableService: UserObservableService,
    private receivedContactAddContactObservableService: ReceivedContactAddContactObservableService
  ) { }

  ngOnInit(): void {
    // set receivedContactToAddObj
    this.receivedContactToAddObjSubscriber = this.receivedContactAddContactObservableService.contactToAddObjectInfo.subscribe((receivedContactToAddObj_)=>{
      // set the email an phoneNumber input values
      if(receivedContactToAddObj_ && receivedContactToAddObj_.email ){
        this.addContactEmailTyped = receivedContactToAddObj_.email;
        this.addContactPhoneNumberTyped = receivedContactToAddObj_.phoneNumber;
      }else {
        // if receivedContactToAddObj_ is null reset the typed data to empty
        this.resetAllLocalData();
      }
      this.resetAllErrorMessages()
      this.receivedContactToAddObj = receivedContactToAddObj_;

    })
  }

  // handles add contact form submittion
  handleAddContactSubmition(){
    // reset errors and success
    this.addContactFormErrorMessage = null;
    this.addContactFormSuccessMessage = null;

    // set addContactButtonHasBeenClicked as clicked
    this.addContactButtonHasBeenClicked = true;
    console.log('form submitted')
    let addContactTypedObject = {
      emailORusername: this.addContactEmailTyped,
      phoneNumber: this.addContactPhoneNumberTyped
    }
    console.log(addContactTypedObject)
    // check if empty
    if(addContactTypedObject.emailORusername.trim() == ''|| addContactTypedObject.phoneNumber.trim()=='' ){
      // field is empty, show error to user
      console.log('Found error on the new contact fields')
      this.addContactFormErrorMessage = '* Both fields must not be empty'
      // reset addContactButtonHasBeenClicked 
      this. addContactButtonHasBeenClicked = false;
    }else {
      // show loading
      this.addContactButtonHasBeenClicked = true
      // clear errors
      this.addContactFormErrorMessage = null;
      // fields are good to submit to server
      console.log('submitting new contacts to server')
      this.addContactSubscriber =  this.userService.addContact(addContactTypedObject).subscribe((data:AddContactResponse)=>{
        // check for error
        console.log(data)
        if(data.success==false){
          console.log('Response with ERROR')
          // handle error
          // hide loading
          this.addContactButtonHasBeenClicked = false;
          // show error message
          this.addContactFormErrorMessage = data.message;
        }else {
          // handle success
          console.log('response SUCCESSFUL');
          // hide error message
          this.addContactFormErrorMessage = null;

          // hide loading
          this.addContactButtonHasBeenClicked = false;
          // show success message
          this.addContactFormSuccessMessage = data.message;

          // send notification to add contact to other user
          this.chatService.sendAddContactRequest(data.contactToBeAdded_Id)

          // refresh current user info
          this.getCurrentLoggedInUserObjectInfo()
          // add the new contact to the existing contacts list

          // get the messages
          // this.getChatMessagesFromDB()

        }
      })
    }

  }

    // getCUrrentUserObject
    getCurrentLoggedInUserObjectInfo(){
      console.log('Getting current user obj info')
      this.getLoggedInUserInfoSubscriber = this.userService.getLoggedInUserInfo().subscribe((data:GetUserResponse)=>{
        console.log('GET USER INFO DATA:',data)
        if(data.success==false){
          // handle error 
          console.log('Response success === False')
          this.userObservableService.unsetUser()
        }else {
          // handle success
          this.userObservableService.setUser(data.userObj)
          console.log('Response success === True')
          
          // ping the socket io by sending userId to save the socket id on server
          this.chatService.sendUserIdToSocket(data.userObj._id)
         
        }
      })
    }
    resetAllLocalData(){
      this.addContactEmailTyped = '';
      this.addContactPhoneNumberTyped = '';
      this.resetAllErrorMessages()
      
    }
    resetAllErrorMessages(){
      this.addContactFormErrorMessage = '';
      this.addContactFormSuccessMessage = '';
    }

    handleCancelButtonClick(){
      console.log('Clicked CANCEL button for add contact modal')
      // unset the receivedContactToAddObj
      this.receivedContactAddContactObservableService.unsetContactToAddObjectInfo()
      // clear the typed data and the error and success message
      this.resetAllLocalData();
      
    }


    ngOnDestroy():void{
      this.getLoggedInUserInfoSubscriber.unsubscribe();
      this.receivedContactToAddObjSubscriber.unsubscribe();
      this.addContactSubscriber .unsubscribe();
    }

}
