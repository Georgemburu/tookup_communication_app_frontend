import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChatMessageObjectToSend } from './models/ChatMessageObjectToSend';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private API_URL = environment.API_URL;

  constructor(private http:HttpClient) { };

  createGroup(payload){
    let createGroupUrl = `${this.API_URL}/createGroup`
    let postBody = JSON.stringify(payload)
    
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
    return this.http.post(createGroupUrl,postBody,options)
    .pipe(
      catchError(this.handleError)
    );

  }

  getCurrentUserGroups(){
    let getCurrentUserGroupsUrl = `${this.API_URL}/getCurrentUserGroups`
    // let postBody = JSON.stringify(payload)
    
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
    return this.http.get(getCurrentUserGroupsUrl,options)
    .pipe(
      catchError(this.handleError)
    );
  }


  createGroupInvitationNotification(payload){
    let createGroupInvitationNotificationUrl = `${this.API_URL}/createGroupInvitationNotification`;
    let postBody = JSON.stringify(payload)
    
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
    return this.http.post(createGroupInvitationNotificationUrl,postBody,options)
    .pipe(
      catchError(this.handleError)
    );

  }

  handleAcceptGroupInvitationRequest(notification){
    let acceptGroupInvitationRequestUrl = `${this.API_URL}/acceptGroupInvitationRequest`
    let postBody = JSON.stringify(notification)
    
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
    return this.http.post(acceptGroupInvitationRequestUrl,postBody,options)
    .pipe(
      catchError(this.handleError)
    );
  }


  getGroupNotificationsFromDB(){
    console.log('reached getGroupNotificationFromDB from DB')
    let getGroupNotificationsUrl = `${this.API_URL}/getGroupNotifications`
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
    return this.http.get(getGroupNotificationsUrl,options)
    .pipe(
      catchError(this.handleError)
    );
  }


  deleteGroupNotificationFromDB(notificationId){
    console.log('reached deleteGroupNotification from DB')
    let deleteGroupNotificationUrl = `${this.API_URL}/deleteGroupNotification`
    // get email data from the object userInfo
    let postData = {
      notificationId: notificationId
    }
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
    return this.http.post(deleteGroupNotificationUrl,postData, options)
    .pipe(
      catchError(this.handleError)
    );
  }


  sendGroupMessage(payload){
    let sendGroupMessageUrl = `${this.API_URL}/sendGroupMessage`
    let postBody = JSON.stringify(payload)
    
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
    return this.http.post(sendGroupMessageUrl,postBody,options)
    .pipe(
      catchError(this.handleError) 
    );
  }

  sendGroupMessageWithFile(fileDataPayload){
    let sendGroupMessageWithFileUrl = `${this.API_URL}/sendGroupMessageWithFile`
    // let postBody = JSON.stringify(payload)
    
    let headers =  new HttpHeaders({
      'Accept':'application/json',
      'Origin':this.API_URL,
      'Access-Cotrol-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3200'
    })
    let options = { 
      headers: headers,
      withCredentials: true
    }
    return this.http.post(sendGroupMessageWithFileUrl,fileDataPayload,options)
    .pipe(
      catchError(this.handleError)
    );
  }


  sendContactToGroupChat(chatMessagePayload:ChatMessageObjectToSend ){
    let sendContactToGroupChatUrl = `${this.API_URL}/sendContactToGroupChat`;
    let postBody = JSON.stringify(chatMessagePayload)
    
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
    return this.http.post(sendContactToGroupChatUrl,postBody,options)
    .pipe(
      catchError(this.handleError)
    );
  }

  // gets all messages in all groups of tthat the user is a participant
  getAllUserGroupsMessagesFromBD(){
    console.log('reached getAllUserGroupsMessagesFromBD from DB')
    let getAllUserGroupsMessagesUrl = `${this.API_URL}/getAllUserGroupMessages`
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
    return this.http.get(getAllUserGroupsMessagesUrl,options)
    .pipe(
      catchError(this.handleError)
    );
  }


  // error handler
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
