import { Component, OnInit, OnDestroy } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


// auth service
import { AuthServiceService } from '../../auth-service.service';
import { DefaultResponse } from 'src/app/models/requests';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  @Output() notify_ClickedGoToLogin = new EventEmitter();
  @Output() notify_ClickedGoToCreateAccount = new EventEmitter();
  @Output() notifyEmailSent = new EventEmitter();

  // forgot Password FormGroup 
  forgotPasswordFormGroup: FormGroup;

  sendLinkBtnIsClicked: boolean = false;

  // auth requests error
  requestsErrorMessage: string = null;



  // SUBSCRIBERS
  forgotPasswordSubscriber: any;

  constructor(private authService:AuthServiceService) { }

  ngOnInit(): void {
    // setup the forgot password form group
    this.forgotPasswordFormGroup = new FormGroup({
      email: new FormControl('',[Validators.required])
    })

  }

  // handle send link button click
  handleSendLinkBtnClick(){
    // show loader
    this.sendLinkBtnIsClicked = true
  }

  // submit form
  submitForgotPasswordForm(){
    console.log('clicked send')
    // show loader
    this.sendLinkBtnIsClicked = true
    // validate form
    if(this.forgotPasswordFormGroup.status=='INVALID'){
      console.log('form Validation error')
      // display errors
      this.forgotPasswordFormGroup.markAllAsTouched();
      // show sendlink button
      this.sendLinkBtnIsClicked = false;

    }else {
      console.log('Form valid')
      // show loading
      this.sendLinkBtnIsClicked = true;
      // send data to server
      let userObj = this.forgotPasswordFormGroup.value;
      this.forgotPasswordSubscriber = this.authService.forgotPassword(userObj).subscribe((res:DefaultResponse)=>{
        console.log(res)
        if(res.success==false){
          // displays the error message to user
          this.requestsErrorMessage = res.message;
          setTimeout(()=>{
            this.requestsErrorMessage = null;

          },3500)
          // reactivates the signup button
          this.sendLinkBtnIsClicked = false; 
        }else {
          // show loading
          this.sendLinkBtnIsClicked = true;

          // show email sent page
          this.notifyEmailSent.emit()
        }
      })
    }

  }


  ngOnDestroy() :void {
    if(this.forgotPasswordSubscriber){
      this.forgotPasswordSubscriber.unsubscribe();
    }
    
  }
}
