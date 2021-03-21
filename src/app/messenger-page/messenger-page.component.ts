import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { ChatService } from '../chat.service';
import { GroupService } from '../group.service';


// INTERFACE IMPORTS
import { User } from '../models/User';
import { Group } from '../models/Group';
import { NewOrderedChatMessagesForDisplay, ReceiveMessagePayload, Message } from '../models/Message';
// import { GMessages } from '../models/GMessage';
import { GNotification } from '../models/GNotification';
import { ONotification } from '../models/ONotification';
import  { GetUserResponse, GetChatMessagesResponse, GetCurentUserGroupsResponse, AddContactResponse, DefaultResponse, DefaultGetNotificationsFromDBResponse, GetAllUserGroupsMessagesFromBDResponse } from 'src/app/models/requests';
import { ContactsObject }  from 'src/app/models/ContactsObject';
import { Observable } from 'rxjs';
import { UserObservableService } from '../user-observable.service';
import { ChatMessagesObject } from '../models/ChatMessagesObject';
import { OneoneoneChatObservableService } from '../oneoneone-chat-observable.service';
import { ClicksObservableService } from '../clicks-observable.service';
import { NotificationsObservableService } from '../notifications-observable.service';
import { GroupChatObservableService } from '../group-chat-observable.service';
 
@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.css']
})
export class MessengerPageComponent implements OnInit, OnDestroy {
  /**
   * ENTRY FOR MESSENGER PAGE
   * -> Gets all user info
   */
  newOrderedchatMessagesForDisplay: NewOrderedChatMessagesForDisplay[];
  userInfoObject: User;
  contactsObject: ContactsObject;
  orderedChatsArr: any = [];


  clickedContact: User;
  clickedGroup: Group;
  chatMessagesObject: ChatMessagesObject;
  chatMessagesKeys:string[];
  messsageTyped:any = '';
  addContactFormGroup: any;
  addContactEmailTyped: string = '';
  addContactPhoneNumberTyped:string = '';
  addContactFormErrorMessage: any = null;
  addContactFormSuccessMessage: any = null;
  addContactButtonHasBeenClicked = false;

  // notification
  notificationsArray: any = []

  // groups
  groupNameToCreate: string = '';
  getCurrentUserGroupsArray: Group[] = [];
  groupCreationRequestErrorMessage: any = null;
  groupCreationRequestSuccessMessage: any = null;
  groupMessagesObject:any = {};

  // WHICH CHAT TAB CLICKED
  whichChatTabClicked: string = 'DIRECT';

  // CACHE
  _cachedChatMessages: any;

  // SUBSRIBERS
  userInfoObjectSubscriber: any;
  contactsObjectSubscriber: any;
  clickedContactSubscriber: any;
  getAllUserGroupsMessagesFromBDSubscriber: any;
  receiveGroupMessageSubscriber: any;
  getCurrentLoggedInUserObjectInfoSubscriber: any;
  getChatMessagesFromDBSubscriber: any;
  getAllNotificationsFromDBSubscriber: any;
  getGroupNotificationFromDBSubscriber: any;
  receive_CheckOneOnOneNotificationSubsriber: any; 
  receive_checkGroupNotificationsSubscriber: any;
  receiveMessageSubscriber: any;
  receive_RefreshAllUserInfoSubscriber: any;



  constructor(
    private userService: UserService, 
    private chatService: ChatService,
    private groupService: GroupService,
    private userObservableService: UserObservableService,
    private oneoneoneChatObservableService: OneoneoneChatObservableService,
    private clicksObservableService: ClicksObservableService,
    private notificationsObservableService: NotificationsObservableService,
    private groupChatObservableService: GroupChatObservableService
    ) { };

  ngOnInit(): void {
    // set user info object
    this.userInfoObjectSubscriber =  this.userObservableService.userObj.subscribe((userObj_)=>{
      this.userInfoObject = userObj_
      // console.log('Observer User Object:',this.userInfoObject)
      setTimeout(()=>{
        // console.log('Setting up chatMessages,',this.contactsObject)
        // set chat messages
        this.oneoneoneChatObservableService.setChatMessagesObject(this._cachedChatMessages,this.contactsObject)
      },2200)
    })

    // set contacts object
    this.contactsObjectSubscriber =  this.userObservableService.contactsObject.subscribe((_contactsObject:ContactsObject)=>{
      this.contactsObject = _contactsObject

    })
    // set clicked contact
    this.clickedContactSubscriber =  this.clicksObservableService.clickedContact.subscribe((contact_)=>{
      this.clickedContact = contact_
    })

    // this.chatService.getMessagesAgain().subscribe((data)=>{
    //   this.getChatMessagesFromDB()
    // })

    
    // add the js scripts to the body of html
    this.makeScript()
    // get loggged in user info
    this.getCurrentLoggedInUserObjectInfo()

   
    this.getAllNotificationsFromDB()
    this.getChatMessagesFromDB()

    this.getAllUserGroupsMessagesFromBD()
     
    // initialize form group
    this.initializeAddContactFormGroup()
    // get groups
    // this.getCurrentUserGroups()
    // chat services
    this.receiveMessage()
    // group chat service
    this.receiveGroupMessage()

    // get One on one notifications
    this.receive_CheckOneOnOneNotification()
    this.receive_checkGroupNotifications()

    this.receive_RefreshAllUserInfo()

   

  }

  refreshAllUserInfo(){
    this.getCurrentLoggedInUserObjectInfo()
    this.getChatMessagesFromDB()
    // this.getOneOnOneNotificationFromDB()
    this.getAllNotificationsFromDB()
    this.getAllUserGroupsMessagesFromBD()
    // this.getCurrentUserGroups()
  }

  makeScript(){
    // appends after dom loads
    


    let scriptsArr = [
      "assets/js/socket.js",
        "../assets/js/tippy-bundle.iife.min.js",
        "/assets/js/script.js",
        "assets/js/feather-icon/feather.min.js",
        "assets/js/feather-icon/feather-icon.js",
        "assets/js/wholeapp.js"
    ]

    scriptsArr.forEach((scriptUrl)=>{
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = scriptUrl;
      script.onload = () => {
        // this.scripts[name].loaded = true;
        // console.log(`${scriptUrl} Loaded.`);
      };
      document.getElementsByTagName('body')[0].appendChild(script);
    })
    

    // 2

  }

  // receiveGroupMessage
  receiveGroupMessage(){
    this.receiveGroupMessageSubscriber =  this.chatService.receiveGroupMessage().subscribe((data)=>{
      // console.log('Recieved group message:',data)
      this.refreshAllUserInfo()
    })
  }
  getAllUserGroupsMessagesFromBD(){
    this.getAllUserGroupsMessagesFromBDSubscriber =  this.groupService.getAllUserGroupsMessagesFromBD().subscribe((data:GetAllUserGroupsMessagesFromBDResponse)=>{
      // console.log('GetAllUserGroupsMessagesFromBDResponse res==',data)
      if(!data.success){
        // console.log('Error getting GetAllUserGroupsMessagesFromBDResponse')
        // handle error
      }else {
        // handle success
        // console.log('Success finding GetAllUserGroupsMessagesFromBDResponse')
        this.groupChatObservableService.setGroupMessagesObject(data.groupMessagesObject)
      }
    })
  }


  // GOOD
  // getCUrrentUserObject
  getCurrentLoggedInUserObjectInfo(){
    // console.log('Getting current user obj info')
    this.getCurrentLoggedInUserObjectInfoSubscriber =  this.userService.getLoggedInUserInfo().subscribe((data:GetUserResponse)=>{
      // console.log('GET USER INFO DATA:',data)
      if(data.success==false){
        // handle error 
        // console.log('Response success === False')
        this.userObservableService.unsetUser()
      }else {
        // handle success
        this.userObservableService.setUser(data.userObj)
        // console.log('Response success === True')
        
        // ping the socket io by sending userId to save the socket id on server
        this.chatService.sendUserIdToSocket(data.userObj._id)
       
      }
    })
  }
  // END GOOD

  // get chat messaages
  getChatMessagesFromDB(){ 
    // console.log('Called getChatMessagesFromDB')
    this.getChatMessagesFromDBSubscriber =  this.chatService.getChatMessagesFromDB().subscribe((_chatMessages:GetChatMessagesResponse)=>{
      if(_chatMessages.success==false){
        // handle false
        // console.log('Error getChatMessagesFromDB:',_chatMessages)
      }else {
        if(!_chatMessages.chatMessages){
        // console.log('No chat messages found')
      }else {
        // console.log('Chat messages Recived:',_chatMessages)
        // this.chatMessagesObject = _chatMessages.chatMessages;
        // set Chat messages Object 
        this._cachedChatMessages = _chatMessages.chatMessages
        this.oneoneoneChatObservableService.setChatMessagesObject(_chatMessages.chatMessages,this.contactsObject)
        this.oneoneoneChatObservableService.setOrderedMessagesObject(_chatMessages.orderedObj)
          // console.log('ORDERED CHATS ARR:',this.orderedChatsArr)
          // this.getSortedMessages();
        }
      }
      
    })
  }
 
  // initializes form group
  initializeAddContactFormGroup(){
    this.addContactFormGroup = new FormGroup({
      usernameORemail: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required])
    })
  }
  
 


  /**
   * NOTIFICATION
   */

  getAllNotificationsFromDB(){
    this.getAllNotificationsFromDBSubscriber = this.chatService.getAllNotificationsFromDB().subscribe((data:DefaultGetNotificationsFromDBResponse)=>{
      // console.log('getAllNotificationsFromDB res Obj:::',data)
      if(!data.success){
        // handle error
      }else {
        // handle success
        // set to notifications array
        
        this.notificationsObservableService.setNotificationsArray(data.notifications);
      }
    })
  }

  // getGroupNotificationFromDB(){
  //   this.getGroupNotificationFromDBSubscriber =   this.groupService.getGroupNotificationsFromDB().subscribe((data:DefaultGetNotificationsFromDBResponse)=>{
  //     console.log('Group Notifications res obj:::',data)
  //     if(!data.success){
  //       // handle error
  //     }else {
  //       // handle success
  //       // set to notifications array
  //       this.notificationsArray = data.notifications;


  //     }
  //   })
  // }


  receive_CheckOneOnOneNotification(){
    this.receive_CheckOneOnOneNotificationSubsriber = this.chatService.receive_checkOneOnOneNotifications().subscribe((data)=>{
      // console.log('checkOneOnOneNotifications recieved',data)
      // send request to db
      // this.getOneOnOneNotificationFromDB()
      this.getAllNotificationsFromDB()
    })
  }
  
  receive_checkGroupNotifications(){
    this.receive_checkGroupNotificationsSubscriber = this.chatService.receive_checkOneOnOneNotifications().subscribe((data)=>{
      // console.log('checkGroupNotifications recieved',data)
      // send request to db
      // this.getGroupNotificationFromDB()
      this.getAllNotificationsFromDB()

    })
  }
   
  // receive message
  receiveMessage(){
    this.receiveMessageSubscriber = this.chatService.receiveMessage().subscribe((data:Message)=>{
      // console.log('Message received',data)
      // refresh data
      // this.getChatMessagesFromDB()
      this.typingMessage(true,data)  
      setTimeout(()=>{ 
        if(document.querySelector('.typing-m')){
          document.querySelector('.typing-m').remove()
        }
        // this.typingMessage(false,data)
        // append to messages 
        this.oneoneoneChatObservableService.appendRecievedMessageToChatMessagesObject(data,this.contactsObject)
        this.oneoneoneChatObservableService.appendReceivedMessageToOrderedMessagesObject(data)
        // Show on the side
        if(document.querySelector('.chat-main .active  h6') && Object.keys(this.clickedContact).length>0){
          // console.log('There is active elem in chats')
          document.querySelector<HTMLHeadingElement>('.chat-main .active  h6').innerText = data.messageText;
        }else {
          // console.log('No active elem in chats')
          let a = String(data.from)
          // console.log('ELEM LOOKING FOr:',document.querySelector('.chat-main #key_'+a+' h6'))
          document.querySelector<HTMLHeadingElement>('.chat-main #key_'+a+' h6').innerText = data.messageText;
          // document.querySelector("#key_5eaaebb12447cd0fd7a419d7 h6").innerText = 'Hello'
          // document.querySelector(`.chat-main #${data.from} h6`).innerText = data.messageText;
          // this.getChatMessagesFromDB()
          // this.refreshAllUserInfo()
          // getChatMessagesFromDB()
        } 
        // this.getChatMessagesFromDB()
       },2000) 
    })
  }

   typingMessage(isTyping,data) {

     function createMsgBox(){
       let liOuter = document.createElement('li')
       if(isTyping){
         liOuter.setAttribute('class','sent last typing-m')
       }else {
         liOuter.setAttribute('class','sent')
       }
       let divMedia = document.createElement('div')
       divMedia.setAttribute('class','media');
       let divProfile  = document.createElement('div')
       divProfile.setAttribute('class','profile mr-4 bg-size')
       divProfile.setAttribute('style',"background-image: url(&quot;../assets/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;")
       let img = document.createElement('img')
       img.setAttribute('class','bg-img')
       img.setAttribute('src','/images/contact/2.jpg')
       img.setAttribute('alt','Avatar')
       img.setAttribute('style','display:none;')
       let divMediaBody = document.createElement('div')
        divMediaBody.setAttribute('class','media-body')
        let divContactname = document.createElement('div')
        divContactname.setAttribute('class','contact-name')
        let h5 = document.createElement('h5')
        h5.innerText = data.userFromObj.fullName;
        let h6 = document.createElement('h6')
        h6.innerText = new Date().toTimeString().split(' ')[0];

        let ul1 = document.createElement('ul')
      ul1.setAttribute('class','msg-box')
      let li_Last = document.createElement('li')
      let h5_Last = document.createElement('h5')
      let typediv = document.createElement('div')
      typediv.setAttribute('class','type')
      let typingLoaderDiv = document.createElement('div');
      typingLoaderDiv.setAttribute('class','typing-loader');

      let divBadge = document.createElement('div')
      divBadge.setAttribute('class','badge badge-success sm ml-2')
      divBadge.innerText = 'R'

      // attach
      if(isTyping){
        typediv.appendChild(typingLoaderDiv);
        h5_Last.appendChild(typediv);
        li_Last.appendChild(h5_Last)
      }else {
        h5_Last.innerText = data.messageText;
        li_Last.appendChild(h5_Last)
        li_Last.appendChild(divBadge)
      }
      
       ul1.appendChild(li_Last)

       divContactname.appendChild(h5)
       divContactname.appendChild(h6)
       divContactname.appendChild(ul1)

       divMediaBody.appendChild(divContactname)
       if(isTyping){
        divProfile.appendChild(img)
       }
       divMedia.appendChild(divProfile)
       divMedia.appendChild(divMediaBody)
       liOuter.appendChild(divMedia)


      //  append to dom
      if(document.querySelector('.messages .chatappend')){
        document.querySelector('.messages .chatappend').appendChild(liOuter)
      

        //  scroll
        document.querySelector('.messages').scroll({
          top: document.querySelector('.messages .chatappend').scrollHeight,
          });
        }else {
          
        }


     }
     createMsgBox()
    //  this.refreshAllUserInfo()

  }






  // }
  
  // handle receiving refresh all user info
  receive_RefreshAllUserInfo(){ 
    this.receive_RefreshAllUserInfoSubscriber = this.chatService.receive_RefreshAllUserInfo().subscribe((data)=>{
      this.refreshAllUserInfo()
    })
  }




  ngOnDestroy(): void {
    this.userInfoObjectSubscriber.unsubscribe();
    this.contactsObjectSubscriber.unsubscribe();
    this.clickedContactSubscriber.unsubscribe();
    this.getAllUserGroupsMessagesFromBDSubscriber.unsubscribe();
    this.receiveGroupMessageSubscriber.unsubscribe();
    this.getCurrentLoggedInUserObjectInfoSubscriber.unsubscribe();
    this.getChatMessagesFromDBSubscriber.unsubscribe();
    this.getAllNotificationsFromDBSubscriber.unsubscribe();
    this.getGroupNotificationFromDBSubscriber.unsubscribe();
    this.receive_CheckOneOnOneNotificationSubsriber.unsubscribe(); 
    this.receive_checkGroupNotificationsSubscriber.unsubscribe();
    this.receiveMessageSubscriber.unsubscribe();
    this.receive_RefreshAllUserInfoSubscriber.unsubscribe();
  }
  // end

}
