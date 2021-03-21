import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  // send user data from signup page
  createUserAccount(userInfoPayload){
    let signUpUrl = `${this.API_URL}/createAccount`;
    let postBody = JSON.stringify(userInfoPayload)
    
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
    return this.http.post(signUpUrl,postBody,options)
    .pipe(
      catchError(this.handleError)
    );
  }

  // sends user data from login page
  loginUser(userInfoPayload){
    let signInUrl = `${this.API_URL}/loginUser`;
    let postBody = JSON.stringify(userInfoPayload)
    
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
    return this.http.post(signInUrl,postBody,options)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Forgot password email 
  forgotPassword(userInfoPayload){
    let forgotPasswordUrl = `${this.API_URL}/forgotUserPassword`;
    // get email data from the object userInfo
    let postBody = JSON.stringify(userInfoPayload)
    
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
    return this.http.post(forgotPasswordUrl,postBody,options)
    .pipe(
      catchError(this.handleError)
    );
  }

  // reset user password
  resetUserPassword(userInfoPayload){
    let resetUserPasswordUrl = `${this.API_URL}/resetUserPassword`;
    // get email data from the object userInfo
    let postBody = JSON.stringify(userInfoPayload)
    
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
    return this.http.post(resetUserPasswordUrl,postBody,options)
    .pipe(
      catchError(this.handleError)
    );
  }


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
