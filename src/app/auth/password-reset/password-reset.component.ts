import { Component, OnInit, OnDestroy } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// service
import  { AuthServiceService } from '../../auth-service.service';
import { DefaultResponse } from 'src/app/models/requests';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  @Output() notify_ClickedGoToLogin = new EventEmitter();
  @Output() notify_ClickedGoToCreateAccount = new EventEmitter();
  // @Output() notify_PasswordResetSuccessfull = new EventEmitter();

  // password reset success full alert display
  passwordResetSuccessful: boolean = false;

  // reset password form group
  resetPasswordFormGroup: FormGroup;

  savePasswordBtnIsClicked: boolean = false;
  // requests errors
  requestsErrorMessage: any = null;
  // status for passwords matching
  passwordsNotMatching: boolean = false;
  // request token
  userRequestToken: string;

  // SUBSCRIBERS
  resetUserPasswordSubscriber: any;

  constructor(private authService: AuthServiceService,private route: ActivatedRoute, private _router: Router ) { }

  ngOnInit(): void {
    this.userRequestToken = this.route.snapshot.paramMap.get('token');
    // setup reset password form group
    this.resetPasswordFormGroup = new FormGroup({
      newPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required])
    },{validators: this.checkPasswords});
    


  }

  // checks if password and confirm password values are equal
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }     
  }
  

  // handle send link button click
  // handleSendLinkBtnClick(){
  //   // show loader
  //   this.savePasswordBtnIsClicked = true
  // }

  // form submit handler
  handleResetPasswordFormSubmit(){
    // show loading
    this.savePasswordBtnIsClicked = true

    if(this.resetPasswordFormGroup.status=='INVALID'){
      // hide loading
      this.savePasswordBtnIsClicked = false;
      if(this.resetPasswordFormGroup.errors && this.resetPasswordFormGroup.errors.notSame == true){
        
        // this.signUpForm.controls.confirmPassword.set
        this.passwordsNotMatching = true;
      }
      this.resetPasswordFormGroup.markAllAsTouched();
    }else {
      this.passwordsNotMatching = false;
      // form is valid
      // disable  button and display loader
      this.savePasswordBtnIsClicked = true;


      // send user info to server
      let userInfoObject = this.resetPasswordFormGroup.value;
      // get the token from the route
      userInfoObject.token = this.userRequestToken;
      this.resetUserPasswordSubscriber = this.authService.resetUserPassword(userInfoObject).subscribe((res:DefaultResponse)=>{
        console.log(res)
        if(res.success == false){
          // displays the error message to user
          this.requestsErrorMessage = res.message;
          setTimeout(()=>{
            this.requestsErrorMessage = null;

          },3500)
          // reactivates the  button
          this.savePasswordBtnIsClicked = false;
        }else {
          // user has been created
          // notify password reset successful
          this.passwordResetSuccessful = true;
          setTimeout(()=>{
            this.passwordResetSuccessful = false;
            this._router.navigateByUrl('/login')
          },3000)
        }
      })


    }

  }


  ngOnDestroy() :void {
    if(this.resetUserPasswordSubscriber){
      this.resetUserPasswordSubscriber.unsubscribe();
    }
    
  }
}
