import { Component, OnInit, OnDestroy } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { DefaultResponse, SignUpResponse } from 'src/app/models/requests';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  // emits when user clicks login to show login page
  @Output() notifyLoginBtnClicked = new EventEmitter();
  @Output() notifyUserCreatedShowMailSentPage = new EventEmitter();

  // handles show text or spinner animation 
  loginBtnIsClicked: boolean = false;
  signupBtnIsClicked: boolean = false;

  // status for passwords matching
  passwordsNotMatching: boolean = false;

  // error message got from http requests
  requestsErrorMessage: any = null;


  // form group
  signUpForm: FormGroup;
  
  // SUBSCRIBERS
  createUserAccountSubscriber: any;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      fullName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required])
    },{validators: this.checkPasswords});
    


  }

  // checks if password and confirm password values are equal
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  // getters
  get fullName() { 
    console.log(this.signUpForm.get('name'))
    return this.signUpForm.get('name');
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

  // submit signup form
  submitSignupForm() {
    console.log(this.signUpForm);

    if(this.signUpForm.status=='INVALID'){
      if(this.signUpForm.errors && this.signUpForm.errors.notSame == true){
        // this.signUpForm.controls.confirmPassword.set
        this.passwordsNotMatching = true;
      }
      this.signUpForm.markAllAsTouched();
    }else {
      this.passwordsNotMatching = false;
      // form is valid
      // disable signup button and display loader
      this.signupBtnIsClicked = true;


      // send user info to server
      let userInfoObject = this.signUpForm.value;
      this.createUserAccountSubscriber = this.authService.createUserAccount(userInfoObject).subscribe((res:SignUpResponse)=>{
        console.log(res) 
        if(res.success == false){
          // displays the error message to user
          this.requestsErrorMessage = typeof res.message == 'object'?res.message.message : res.message || res.message1;
          setTimeout(()=>{
            this.requestsErrorMessage = null;

          },3500)
          // reactivates the signup button
          this.signupBtnIsClicked = false;
        }else {
          // user has been created
          // emit an event to open the mail sent page
          this.notifyUserCreatedShowMailSentPage.emit()
        }
      })


    }
  }


  ngOnDestroy(): void {
    if(this.createUserAccountSubscriber){
      this.createUserAccountSubscriber.unsubscribe();
    }
    
  }
}
