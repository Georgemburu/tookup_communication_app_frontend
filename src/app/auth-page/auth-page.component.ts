import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPagesType } from 'src/app/models/AuthPages'
import { AuthClicksAndNavigationObservableService } from '../auth-clicks-and-navigation-observable.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit, OnDestroy {
  // showSignupForm: boolean = false; 
  // showingLoginForm: boolean = true;
  // showForgotPasswordForm: boolean = false;
  // showMailSentPage: boolean = false;
  // showMailSentFromForgotPassword: boolean = false;

  whichAuthPageToShow:AuthPagesType = 'LOGIN_PAGE';


  // SUBSCRIBER
  whichAuthPageToShowSubscriber:any;

  constructor(
    private _router: Router,
    private authClicksAndNavigationObservableService: AuthClicksAndNavigationObservableService
    ) { }

  ngOnInit(): void {
    this.whichAuthPageToShowSubscriber = this.authClicksAndNavigationObservableService.whichAuthPageToShow.subscribe((whichAuthPageToShow_)=>{
      console.log('Clicked page is set to:',whichAuthPageToShow_)
      this.whichAuthPageToShow = whichAuthPageToShow_;
    })
  }

  // show signup form on click
  on_notifyCreateAccountBtnClicked(){
    console.log('Emitter recieved')
    // this.showSignupForm = true
    // // hide login form
    // this.showingLoginForm = false
    this.authClicksAndNavigationObservableService.setWhichAuthPageToShow('SIGNUP_PAGE');
  }

  // show back the login form
  on_notifyLoginBtnClicked(){
    console.log('Emitter recieved')
    // this.showingLoginForm = true
    // // hide signup form
    // this.showSignupForm = false
    this.authClicksAndNavigationObservableService.setWhichAuthPageToShow('LOGIN_PAGE');

  }

  // show forgot passord form
  on_notifyForgotPasswordBtnClicked(){
    console.log('Emitter recieved')
    // this.showForgotPasswordForm = true
    // // hide signup form
    // this.showingLoginForm = false
    this.authClicksAndNavigationObservableService.setWhichAuthPageToShow('FORGOT_PASSWORD_PAGE');

  }
  // show showMailSentFromForgotPassword
  on_notifyEmailSent(){
    console.log('Emmittrt received')
    // this.showMailSentFromForgotPassword = true
    // // hide forgot password page
    // this.showForgotPasswordForm = false
    
    this.authClicksAndNavigationObservableService.setWhichAuthPageToShow('MAIL_SENT_FROM_FORGOT_PASSWORD_PAGE');

  }

  // go to create account show signup page
  on_notify_ClickedGoToCreateAccount(){
    console.log('Emitter recieved')
    // this.showSignupForm = true
    // // hide signup form
    // this.showForgotPasswordForm = false
    this.authClicksAndNavigationObservableService.setWhichAuthPageToShow('SIGNUP_PAGE');

  }

  // go to login
  on_notify_ClickedGoToLogin(){
    console.log('Emitter recieved')
    // this.showingLoginForm = true
    // // hide signup form
    // this.showForgotPasswordForm = false
    this.authClicksAndNavigationObservableService.setWhichAuthPageToShow('LOGIN_PAGE');

  }

  // go to mail sent /Show mail sent page
  on_notifyUserCreatedShowMailSentPage(){
    console.log('Emitter received')
    // this.showMailSentPage = true;
    // // hide signup form
    // this.showSignupForm = false;
    this.authClicksAndNavigationObservableService.setWhichAuthPageToShow('MAIL_SENT_PAGE');

  }
  

  ngOnDestroy():void {
    this.whichAuthPageToShowSubscriber.unsubscribe();
  }
}
