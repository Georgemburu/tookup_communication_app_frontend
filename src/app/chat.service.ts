import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ChatMessageObjectToSend } from './models/ChatMessageObjectToSend';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private API_URL = environment.API_URL;
  private WS_HOST = environment.WS_HOST;
  private WS_URL = environment.WS_URL;

  socket: any;
  constructor(private http: HttpClient ) { 
    this.socket = io({
      secure: true,
      rejectUnauthorized: false,
      path: this.WS_URL
    });
  }

  // send message
  sendMessage(data){
    this.socket.emit('sendMessage',data)
  }

  sendDirectMessage(data){
    console.log('Called Send sendDirectMessageUrl')
    let sendDirectMessageUrl = `${this.API_URL}/sendDirectMessage`;
    // get email data from the object userInfo
    let postBody = data
    // 'Content-Type':'application/json', 
    
    let headers =  new HttpHeaders({
      'Accept': 'application/json',
      'Origin':this.API_URL, 
      'Access-Cotrol-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3200'
    })
    let options = { 
      headers: headers,
      withCredentials: true
    }
    return this.http.post(sendDirectMessageUrl,postBody,options)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  // send message with file
  sendMessageWithFile(formDataPayload){
    console.log('Called Send Message With route SENDER')
    let sendMessageWithFileUrl = `${this.API_URL}/sendMessageWithFile`;
    // get email data from the object userInfo
    let postBody = formDataPayload
    // 'Content-Type':'application/json', 
    
    let headers =  new HttpHeaders({
      'Accept': 'application/json',
      'Origin':this.API_URL, 
      'Access-Cotrol-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3200'
    })
    let options = { 
      headers: headers,
      withCredentials: true
    }
    return this.http.post(sendMessageWithFileUrl,postBody,options)
      .pipe(
        catchError(this.handleError)
      );
  }
  // send contact
  sendContactToDirectChat(chatMessageObjectToSendPayload:ChatMessageObjectToSend){
    console.log('Called Send Message With route SENDER')
    let sendContactToDirectChatUrl = `${this.API_URL}/sendContactToDirectChat`;
    // get email data from the object userInfo
    let postBody = JSON.stringify(chatMessageObjectToSendPayload)
    //  
    
    let headers =  new HttpHeaders({
      'Content-Type':'application/json',
      'Accept': 'application/json',
      'Origin':this.API_URL, 
      'Access-Cotrol-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3200'
    })
    let options = { 
      headers: headers,
      withCredentials: true
    }
    return this.http.post(sendContactToDirectChatUrl,postBody,options)
      .pipe(
        catchError(this.handleError)
      );
  }


  // sendReceiveGroupMessage
  sendReceiveGroupMessage(data){
    this.socket.emit('sendReceiveGroupMessage',data)
  }

  // receive message
  receiveMessage(){
    return new Observable((observable)=>{
      this.socket.on('receiveMessage',(data)=>{
        observable.next(data)
      })
    })
  }

  // send send_ReceiveDirectMessage
  send_ReceiveDirectMessage(contactId:string){
    console.log('Sending send_ReceiveDirectMessage for contactId:',contactId)
    this.socket.emit('send_ReceiveDirectMessage',contactId)
  }
  
  getMessagesAgain(){
    return new Observable((observable)=>{
      this.socket.on('getMessagesAgain',(data)=>{
        observable.next(data)
      })
    })
  }
  // receive group message
  receiveGroupMessage(){
    return new Observable((observable)=>{
      this.socket.on('receiveGroupMessage',(data)=>{
        observable.next(data)
      })
    })
  }

  // receive_checkOneOnOneNotifications
  receive_checkOneOnOneNotifications(){
    console.log('called receive check One On One Notifications')
    return new Observable((observable)=>{
      this.socket.on('checkOneOnOneNotifications',(data)=>{
        observable.next(data)

      })
    })
  }
  // receive group notifications
  receive_checkGroupNotifications(){
    console.log('called receive check Group Notifications')
    return new Observable((observable)=>{
      this.socket.on('checkGroupNotifications',(data)=>{
        observable.next(data)

      })
    })
  }
  
  // getAllNotificationsFromDB
  getAllNotificationsFromDB(){
    console.log('reached getAllNotifications from DB')
    let getAllNotificationsUrl = `${this.API_URL}/getAllNotifications`;
    // get email data from the object userInfo
    
    let headers =  new HttpHeaders({
      'Content-Type':'application/json',
      'Origin':this.API_URL,
      'Access-Cotrol-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3200'
    })
    let options = { 
      headers: headers,
      withCredentials: true
    }
    return this.http.get(getAllNotificationsUrl,options)
    .pipe(
      catchError(this.handleError)
    );
  }
  // get oneOneNotifications 
  getOneOnOneNotificationsFromDB(){
    console.log('reached getOneOnOneNotifications from DB')
    let getOneOnOneNotificationsUrl = `${this.API_URL}/getOneOnOneNotifications`;
    // get email data from the object userInfo
    
    let headers =  new HttpHeaders({
      'Content-Type':'application/json',
      'Origin':this.API_URL,
      'Access-Cotrol-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3200'
    })
    let options = { 
      headers: headers,
      withCredentials: true
    }
    return this.http.get(getOneOnOneNotificationsUrl,options)
    .pipe(
      catchError(this.handleError)
    );
  }

  // get group notifications
 

  // ping
  sendUserIdToSocket(userId:String){
    this.socket.emit('sendConnectedUserId',userId)
  }

  // get chat messages from db
  getChatMessagesFromDB(){
    let resetUserPasswordUrl = `${this.API_URL}/getChatMessages`;
    // get email data from the object userInfo
    
    let headers =  new HttpHeaders({
      'Content-Type':'application/json',
      'Origin':this.API_URL,
      'Access-Cotrol-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3200'
    })
    let options = { 
      headers: headers,
      withCredentials: true
    }
    return this.http.get(resetUserPasswordUrl,options)
    .pipe(
      catchError(this.handleError)
    );
  }

  // sendAddContactRequest
  sendAddContactRequest(receipientId: string){
    this.socket.emit('sendAddContactRequest',{
      receipientId:receipientId
    })
  }

  // delete notification from db
  deleteOneOnOneNotificationFromDB(notificationId: string){
    let deleteOneOnOneNotificationUrl = `${this.API_URL}/deleteOneOnOneNotification`;
    // get email data from the object userInfo
    let postBody = JSON.stringify({
      notificationId: notificationId
    })
    
    let headers =  new HttpHeaders({
      'Content-Type':'application/json',
      'Origin':this.API_URL,
      'Access-Cotrol-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3200'
    })
    let options = { 
      headers: headers,
      withCredentials: true
    }
    return this.http.post(deleteOneOnOneNotificationUrl,postBody,options)
      .pipe(
        catchError(this.handleError)
      );

  }

  // accept friend Request
  addContactRequestAccepted(notificationFromId: string){
    let acceptFriendRequestUrl = `${this.API_URL}/addContactRequestAccepted`;
    // get email data from the object userInfo
    let postBody = JSON.stringify({
      notificationFromId: notificationFromId
    })
    
    let headers =  new HttpHeaders({
      'Content-Type':'application/json',
      'Origin':this.API_URL,
      'Access-Cotrol-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3200'
    })
    let options = { 
      headers: headers,
      withCredentials: true
    }
    return this.http.post(acceptFriendRequestUrl,postBody,options)
      .pipe(
        catchError(this.handleError)
      );
  }
  // receive refresh all user info
  receive_RefreshAllUserInfo(){ 
    console.log('called receive_RefreshAllUserInfo')
    return new Observable((observable)=>{
      this.socket.on('refresh_ALL_USER_INFO',(data)=>{
        observable.next(data)

      })
    })
  }

  // emit refresh all user info
  send_RefreshAllUserInfo(receipientId){
    this.socket.emit('send_refresh_ALL_USER_INFO',{
      receipientId:receipientId
    })
  }

  // http error handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
