import { Injectable } from '@angular/core';
import  { BehaviorSubject } from 'rxjs';
import { AuthPagesType } from './models/AuthPages';
 
@Injectable({
  providedIn: 'root'
})
export class AuthClicksAndNavigationObservableService {
  // private createAccountButtonClickedSubject = new BehaviorSubject<boolean>(false);
  // createAccountButtonClicked = this.createAccountButtonClickedSubject.asObservable();

  // private forgotPasswordButtonClickedSubject = new BehaviorSubject<boolean>(false);
  // forgotPasswordButtonClicked = this.forgotPasswordButtonClickedSubject.asObservable();

  private whichAuthPageToShowSubscriber = new BehaviorSubject<AuthPagesType>('LOGIN_PAGE')
  whichAuthPageToShow = this.whichAuthPageToShowSubscriber.asObservable();


  constructor() { }


  setWhichAuthPageToShow(whichAuthPage_:AuthPagesType){
    console.log('Setting authpage to:',whichAuthPage_)
    this.whichAuthPageToShowSubscriber.next(whichAuthPage_)
  }

  unsetWhichAuthPageToShow(){
    this.whichAuthPageToShowSubscriber.next('LOGIN_PAGE');
  }
}
