import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './models/User';
import { GetUserResponse } from './models/requests';

import { environment } from '../environments/environment';

// import chat service to send contact request notif
// import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private userInfoSubject = new BehaviorSubject<User>(null);
  // $userInfoObject = this.userInfoSubject.asObservable();
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient ) { 
    // this.getLoggedInUserInfo()
  }

  getLoggedInUserInfo(){
    console.log('Called get Logged InUser Info')
    let headers =  new HttpHeaders({
      'Content-Type':'application/json',
      'Origin':this.API_URL,
      'Access-Cotrol-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': this.API_URL
    })
    let options = { 
      headers: headers,
      withCredentials: true
    }
    let getLoggedInUserURL = `${this.API_URL}/getLoggedInUserInfo`
    return this.http.get(getLoggedInUserURL,options).pipe(
      catchError(this.handleError)
    );


  }

  /**
   * add contact
   * @param  
   */
  addContact(newContactObjPayload){
        let addContactUrl = `${this.API_URL}/addContact`
        let postBody = JSON.stringify(newContactObjPayload)
        
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
        return this.http.post(addContactUrl,postBody,options)
        .pipe(
          catchError(this.handleError)
        );
  }

  // /**
  //  * 
  //  * @param userObj
  //  * @returns specified field eg 'contacts'
  //  */
  // get_userDataObject(){
  //     return this.userDataObject;
  // }
  // set_userDataObject(obj:any){
  //   this.userDataObject = obj;
  // }

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
