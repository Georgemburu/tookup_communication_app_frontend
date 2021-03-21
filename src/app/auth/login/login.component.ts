import { Component, OnInit, OnDestroy} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// auth service
import { AuthServiceService } from '../../auth-service.service';
import { DefaultResponse } from 'src/app/models/requests';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() notifyCreateAccountBtnClicked = new EventEmitter();
  @Output() notifyForgotPasswordBtnClicked = new EventEmitter();

  // from sbject observable
  // createAccountButtonClicked:boolean;
  // forgorPasswordButtonClicked: boolean;
  
  loginBtnIsClicked: boolean = false;
  signupBtnIsClicked: boolean = false;

  // http request error message
  requestsErrorMessage: any = null;

  // login form group
  loginFormGroup: FormGroup;

  // SUBSCRIBERS
  loginUserSubscriber: any;

  constructor(private authService: AuthServiceService, private _router: Router) { }

  ngOnInit(): void {
    // setup login form group
    this.loginFormGroup = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })


  }

  // // login user
  handleLoginBtnClick(){
    this.loginBtnIsClicked = true

  }


  // // create account
  handleSignupBtnClick(){
    this.signupBtnIsClicked = true
  }

  handleCreateAccountClick(){

  }

  // checks for errors and submits user info to server
  handleSubmitLoginForm(){
    if(this.loginFormGroup.status=='INVALID'){
      // handle displaying errors to client
      this.loginFormGroup.markAllAsTouched()

    }else {
      // display the spinner
      this.loginBtnIsClicked = true

      // send data to server
      let userInfo = this.loginFormGroup.value;
      this.loginUserSubscriber = this.authService.loginUser(userInfo).subscribe((res:DefaultResponse)=>{
        console.log(res)
        if(res.success == false){
          // displays the error message to user
          this.requestsErrorMessage = res.message;
          setTimeout(()=>{
            this.requestsErrorMessage = null;

          },3500)
          // reactivates the signup button
          this.loginBtnIsClicked = false;
        }else {
          // user has been logged in
          // go to messengers page/ route
          this._router.navigateByUrl('/messenger')
        }
        //end
      })


    }
  }


  ngOnDestroy() :void {
    if(this.loginUserSubscriber){
      this.loginUserSubscriber.unsubscribe();
    }
    
  }


}
