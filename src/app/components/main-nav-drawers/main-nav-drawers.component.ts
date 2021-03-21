import { Component, OnInit, OnDestroy } from '@angular/core';

/**
 * SERVICES
 */
import { UserService } from 'src/app/user.service';
import { ChatService } from 'src/app/chat.service';
import { Observable } from 'rxjs';
import { GroupService } from 'src/app/group.service';
import { UserObservableService } from 'src/app/user-observable.service';

/**
 * MODELS
 */
import  { GetUserResponse, DefaultResponse, CreateGroupResponse, AcceptGroupInvitationRequestResponse } from 'src/app/models/requests';
import { User } from 'src/app/models/User';
import { ContactsObject }  from 'src/app/models/ContactsObject';
import { ClicksObservableService } from 'src/app/clicks-observable.service';
import { Group } from 'src/app/models/Group';
import { WhichChatTab } from 'src/app/models/Tabs';
import { ChatMessagesObject } from 'src/app/models/ChatMessagesObject';
import { OneoneoneChatObservableService } from 'src/app/oneoneone-chat-observable.service';
import { NotificationsObservableService } from 'src/app/notifications-observable.service';
import { GNotification } from 'src/app/models/GNotification';
import { ONotification } from 'src/app/models/ONotification'
import { NotificationClickedButtonCheckerObject } from 'src/app/models/Locals';


@Component({
  selector: 'app-main-nav-drawers',
  templateUrl: './main-nav-drawers.component.html',
  styleUrls: ['./main-nav-drawers.component.css']
})

/**::HANDLES THE  MAIN RIGHT SIDE NAVIGATION ::
 * 1. Get current user Info
 * 2. Create group
 * 3. List groups and participants count
 * 4. Chats and group lists clicks
 * 5. Direct and Group Chat Tabs clicks
 */

export class MainNavDrawersComponent implements OnInit, OnDestroy {
  
  userInfoObject: User;
  clickedContact: User;
  clickedGroup: Group;
  orderedChatsArr: any = [];
  contactsObject: ContactsObject;
  whichChatTabClicked: Observable<WhichChatTab>;
  chatMessagesObject: ChatMessagesObject;
  notificationsArray:any[];
  
  // GROUP
  getCurrentUserGroupsArray: Group[];

  // MESSAGES
  groupCreationRequestSuccessMessage: any = null;
  groupCreationRequestErrorMessage:any = null;

  // LOCAL
  loadingCreatingGroup:boolean = false;
  notificationClickedButtonCheckerObject:NotificationClickedButtonCheckerObject = {
    notification: null,
    declineIsClicked: false,
    acceptIsClicked: false
  }
  // SUBSCRIBERS
  groupsSubscriber:any;
  userInfoObjSubscriber:any;
  chatMessagesObjectSubscriber:any;
  clickedContactSubscriber:any;
  clickedGroupSubscriber: any;
  notificationsArraySubscriber: any;
  getLoggedInUserInfoSubscriber: any;
  contactsObjectSubscriber: any;
  createGroupSubscriber: any;
  deleteGroupNotificationFromDBSubscriber:any;
  deleteOneOnOneNotificationFromDBSubscriber:any;
  addContactRequestAcceptedSubscriber:any;
  handleAcceptGroupInvitationRequestSubscriber:any;

  // orderedChatsArrSubscriber: any;

  constructor(
    private userService:UserService,
    private chatService:ChatService,
    private groupService: GroupService,
    private clicksObservableService: ClicksObservableService,
    private userObservableService: UserObservableService,
    private oneoneoneChatObservableService: OneoneoneChatObservableService,
    private notificationsObservableService: NotificationsObservableService
    ) { }

  ngOnInit(): void {
    // get current Logged In User Info
    // this.getCurrentLoggedInUserObjectInfo()
    // set grt current user groups array
    this.groupsSubscriber = this.userObservableService.currentUserGroupsArray.subscribe((g)=>{
      this.getCurrentUserGroupsArray = g
    })
    // set user info object
    this.userInfoObjSubscriber = this.userObservableService.userObj.subscribe((userObj_)=>{
      this.userInfoObject = userObj_
    })
    // set chat messages object
    this.chatMessagesObjectSubscriber = this.oneoneoneChatObservableService.chatMessagesObject.subscribe((chatMessagesObject_)=>{
      this.chatMessagesObject = chatMessagesObject_
    })
    // set clicked contact
    this.clickedContactSubscriber = this.clicksObservableService.clickedContact.subscribe((clickedContact_)=>{
      this.clickedContact = clickedContact_
    })
    // set clicked group
    this.clickedGroupSubscriber = this.clicksObservableService.clickedGroup.subscribe((clickedGroup_)=>{
      this.clickedGroup = clickedGroup_;
    })
    // set notifications
    this.notificationsArraySubscriber = this.notificationsObservableService.notificationsArray.subscribe((notificationsArray_)=>{
      this.notificationsArray = notificationsArray_;
    })
    // set contacts object
    this.contactsObjectSubscriber = this.userObservableService.contactsObject.subscribe((contactsObject_)=>{
      this.contactsObject = contactsObject_
    })
    // set ordered chats arr
    // this.orderedChatsArrSubscriber = this.oneoneoneChatObservableService.orderedChatsArr.subscribe((orderedChatsArr_)=>{
    //   this.orderedChatsArr = orderedChatsArr_;
    // })

  }



  handleChatsListClick(contact_:User){
    console.log('clicked contact DATA:',contact_)
    // this.clickedContact = data;
    // set the clicked contact
    this.clicksObservableService.setClickedContact(contact_)
    // this.getSortedMessages()
  }
  handleClickedContact($contact:User){
    this.clicksObservableService.setClickedContact($contact)
  }

  handleGroupListItemClick(group_:Group){
    // set the clicked group
    this.clicksObservableService.setClickedGroup(group_)
    document.querySelector('.chitchat-container').classList.toggle("mobile-menu")
  }

   // HANDLE CHAT TABS CLICK
   handleDirectChatTabClick(data_to:WhichChatTab){
    console.log('Clicked DIRECT tab')
    // set clicked tab
    this.clicksObservableService.setWhichChatTabClicked('DIRECT')
  }
  handleGroupChatTabClick(data_to){
    console.log('clicked GROUP tab')
    // set clicked tab
    this.clicksObservableService.setWhichChatTabClicked('GROUP')

  }

  // create group
  handleCreateGroupClick(groupNameInputValue:string){
    console.log(groupNameInputValue)
    this.groupCreationRequestSuccessMessage = null;
    this.groupCreationRequestErrorMessage = null;

    // show loading
    this.loadingCreatingGroup = true;
    // check if empty
    if(!groupNameInputValue.trim()){
      // hide loading
      this.loadingCreatingGroup = false;
      return;
    }else {
      let groupPayload = {
        groupName: groupNameInputValue
      }
      // perfom send request to server
      this.createGroupSubscriber = this.groupService.createGroup(groupPayload).subscribe((data:CreateGroupResponse)=>{
        console.log('Req Create Group Res:',data) 
        if(data.success==false){
          // handle error  
          this.groupCreationRequestSuccessMessage = null;
          this.groupCreationRequestErrorMessage = null;
          console.log('Error creating group')
          this.groupCreationRequestErrorMessage = data.message
          // hide loading
          this.loadingCreatingGroup = false;
          setTimeout(()=>{
            this.groupCreationRequestErrorMessage = null;
          },2500)
        }else {
          this.groupCreationRequestErrorMessage = null;
          this.groupCreationRequestErrorMessage = null;
          // handle success
          console.log('Success creating group')
          // show message
          this.groupCreationRequestSuccessMessage = data.message
          setTimeout(()=>{
            this.groupCreationRequestSuccessMessage = null;
          },2500)

          //  append the created group the the list of already existing user groups
          if(data.createdGroup){ 
            this.userObservableService.appendGroupToCurrentUserGroupsArray(data.createdGroup)

          }
      
          // refresh all user data 
          // this.refreshAllUserInfo()
          // hide loading
          this.loadingCreatingGroup = false;
        }
      })
    }
    // clear the input box
    document.querySelector<HTMLInputElement>('#groupCreatorInputBox').value='';
    // this.groupNameToCreate = ''
  }


  // handle decline group invite
  handleDeclineGroupInviteRequestButtonClick(notificationObj: GNotification|ONotification){
    console.log('Called handleDeclineGroupInviteRequestButtonClick')
    let notificationId = notificationObj._id;
    // handle showing loading
    this.handle_notificationClickedButtonCheckerObject(notificationObj,true,false)
    // deletes the notification from the collection
    // update the notifications array after successfull deletion
    this.deleteGroupNotificationFromDB(notificationId,notificationObj)
    // // remove notification from notifications list 
    // this.notificationsObservableService.removeNotificationFromNotificationsArray(notificationObj)

   
  }
  handle_notificationClickedButtonCheckerObject(notification:GNotification|ONotification,decline_:boolean,accept_:boolean){
    this.notificationClickedButtonCheckerObject = {
      notification: notification,
      declineIsClicked: decline_,
      acceptIsClicked: accept_
    }

    // setTimeout(()=>{
    //   this.notificationClickedButtonCheckerObject = {
    //     notification: null,
    //     declineIsClicked: false,
    //     acceptIsClicked: false
    //   }
    // },2000)
  }
  
  deleteGroupNotificationFromDB(notificationId:string,notificationObj:GNotification|ONotification){
    this.deleteGroupNotificationFromDBSubscriber = this.groupService.deleteGroupNotificationFromDB(notificationId).subscribe((data:DefaultResponse)=>{
      console.log('Delete group notification res obj:::',data)
      if(!data.success){
        // handle failure
        // handle revert showing loading by reset
      this.handle_notificationClickedButtonCheckerObject(null,false,false)
      }else {
        // handle success
        // refresh the notifications
        // this.getOneOnOneNotificationFromDB()
        // this.getGroupNotificationFromDB()
        // this.getAllNotificationsFromDB()
        //remove the notification from notification array
        this.notificationsObservableService.removeNotificationFromNotificationsArray(notificationObj)
        // reset notificationClickedButtonCheckerObject 
        this.handle_notificationClickedButtonCheckerObject(null,false,false)

      }
    })
  }


  deleteOneOnOneNotification(notificationId:string,notificationObj: GNotification| ONotification){
    
    this.deleteOneOnOneNotificationFromDBSubscriber = this.chatService.deleteOneOnOneNotificationFromDB(notificationId).subscribe((data:DefaultResponse)=>{
      console.log('deleteOneOnOneNotification response:',data)
      if(!data.success){
        // handle error
         // reset show loading
         this.handle_notificationClickedButtonCheckerObject(null,false,false)
      }else {
        // handle success
        // refresh the notifications array by making a call to server
        // this.getOneOnOneNotificationFromDB()
        // this.getGroupNotificationFromDB()
        // this.getAllNotificationsFromDB()
        // reset show loading
        this.handle_notificationClickedButtonCheckerObject(null,false,false)
        //remove the notification from notification array
        this.notificationsObservableService.removeNotificationFromNotificationsArray(notificationObj)

      }
    })

  }

  // accept
  handleAcceptFriendRequestButtonClick(notificationObj){
    let notificationId = notificationObj._id;
    let friendRequestNotificationFromId = notificationObj.from._id;

    // show loading
    this.handle_notificationClickedButtonCheckerObject(notificationObj,false,true)
    // adds the contacts to both parties
    this.addContactRequestAcceptedSubscriber =  this.chatService.addContactRequestAccepted(friendRequestNotificationFromId).subscribe((data:DefaultResponse)=>{
      console.log('handleAcceptFriendRequestButtonClick response:',data)
      if(!data.success){
        // handle failure
        // reset show loading
        this.handle_notificationClickedButtonCheckerObject(null,false,false)
      }else {
        // handle success
        // refresh the current users info object to reflect the added contact
        // delete the notification
        this.deleteOneOnOneNotification(notificationId,notificationObj)

        //remove the notification from notification array
        // this.notificationsObservableService.removeNotificationFromNotificationsArray(notificationObj)
        // delete notification

        // this.refreshAllUserInfo()
        this.getCurrentLoggedInUserObjectInfo()
        // emit an event to the other contact to refresh to
        this.chatService.send_RefreshAllUserInfo(friendRequestNotificationFromId)

        // reset show loading
        this.handle_notificationClickedButtonCheckerObject(null,false,false)
      }
    })

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
  
    // handle accept grop invitation
    handleAcceptGroupInvitationRequestButtonClick(notificationObj:GNotification|ONotification){
      // show loading
      this.handle_notificationClickedButtonCheckerObject(notificationObj,false,true)
      this.handleAcceptGroupInvitationRequestSubscriber =  this.groupService.handleAcceptGroupInvitationRequest(notificationObj).subscribe((data:AcceptGroupInvitationRequestResponse)=>{
        console.log('handleAcceptGroupInvitationRequestButtonClick res data:',data)
        if(!data.success){ 
          // handle error
          // reset show loading
          this.handle_notificationClickedButtonCheckerObject(null,false,false)
        }else {
          // handle success
          // this.getOneOnOneNotificationFromDB()
          // this.getGroupNotificationFromDB()
          // this.getAllNotificationsFromDB()
          // this.getCurrentLoggedInUserObjectInfo()

          // append group
          if(data.group){
            this.userObservableService.appendGroupToCurrentUserGroupsArray(data.group)

            // send event to the other users to refresh group info
            data.group.participants.forEach(groupParticipantId_ =>{
              this.chatService.send_RefreshAllUserInfo(groupParticipantId_)
            })
            
          }

          // delete GroupNotificatopn
          this.deleteGroupNotificationFromDB(notificationObj._id,notificationObj)
          // reset show loading
          this.handle_notificationClickedButtonCheckerObject(null,false,false)
        }
      })
    }

     // decline
  handleDeclineFriendRequestButtonClick(notificationObj){
    console.log('Called handleDeclineFriendRequestButtonClick')
    // show loading
    this.handle_notificationClickedButtonCheckerObject(notificationObj,true,false)
    let notificationId = notificationObj._id;
    // deletes the notification from the collection
    // update the notifications array after successfull deletion
    this.deleteOneOnOneNotification(notificationId,notificationObj)

    // // remove from notification array
    // this.notificationsObservableService.removeNotificationFromNotificationsArray(notificationObj)

  }



      


  ngOnDestroy(){
    this.groupsSubscriber.unsubscribe();
    this.userInfoObjSubscriber.unsubscribe();
    this.chatMessagesObjectSubscriber.unsubscribe();
    this.clickedContactSubscriber.unsubscribe();
    this.clickedGroupSubscriber.unsubscribe();
    this.getLoggedInUserInfoSubscriber.unsubscribe();
    this.contactsObjectSubscriber.unsubscribe(); 
    this.createGroupSubscriber.unsubscribe()
    this.deleteGroupNotificationFromDBSubscriber.unsubscribe()
    this.deleteOneOnOneNotificationFromDBSubscriber.unsubscribe()
    this.addContactRequestAcceptedSubscriber.unsubscribe()
    this.handleAcceptGroupInvitationRequestSubscriber.unsubscribe()
  }


}
