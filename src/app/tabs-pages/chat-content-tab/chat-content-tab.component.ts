import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/User';
import { ClicksObservableService } from 'src/app/clicks-observable.service';
import { UserObservableService } from 'src/app/user-observable.service';
import { DirectVideoCallClicksObservableService } from 'src/app/direct-video-call-clicks-observable.service';

@Component({
  selector: 'app-chat-content-tab', 
  templateUrl: './chat-content-tab.component.html',
  styleUrls: ['./chat-content-tab.component.css']
})
export class ChatContentTabComponent implements OnInit, OnDestroy {
  clickedContact:User;
  userInfoObject:User;

  // LOCALS
  videoCallModalIsToggledOpen:boolean = false;

  // SUBSCRIBERS
  clickedContactSubscriber: any;
  userInfoObjectSubscriber: any;
  showVideoCallModal_ClickedSubscriber: any;

  constructor(
    private clicksObservableService: ClicksObservableService, 
    private userObservableService: UserObservableService,
    private directVideoCallClicksObservableService: DirectVideoCallClicksObservableService
  ) { }

  ngOnInit(): void {
    this.clickedContactSubscriber = this.clicksObservableService.clickedContact.subscribe((clickedContact_)=>{
      this.clickedContact = clickedContact_
    })
    this.userInfoObjectSubscriber = this.userObservableService.userObj.subscribe((userInfoObject_:User)=>{
      this.userInfoObject = userInfoObject_
    })

    // directVideoCallClicksObservableService
    this.showVideoCallModal_ClickedSubscriber = this.directVideoCallClicksObservableService.showVideoCallModal_Clicked.subscribe((showVideoCallModal_Clicked_)=>{
      console.log('showVideoCallModal_Clicked_:',showVideoCallModal_Clicked_)
      // let videoModalTogglerElement:HTMLAnchorElement = document.querySelector<HTMLAnchorElement>('#directCallVideoModalToggler')
      if(showVideoCallModal_Clicked_==false && this.videoCallModalIsToggledOpen==true){
        console.log('Setting the videoCallModalIsToggledOpen to false')
        this.videoCallModalIsToggledOpen = false;
        // hide the modal
        // videoModalTogglerElement.click();
      }
    })


  }


  /**
   * MODAL TOGGLERS
   */ 
  handleDirectVideoCallModalToggleClick(){
    console.log('clicked video modal toggler')
    // set state of video call to opened/closed
    // this.videoCallModalIsToggledOpen = !this.videoCallModalIsToggledOpen;
    // this.directVideoCallClicksObservableService.setShowVideoCallModal_Clicked(this.videoCallModalIsToggledOpen);
    // console.log('Video modal is open:',this.videoCallModalIsToggledOpen)
    this.directVideoCallClicksObservableService.setShowVideoCallModal_Clicked(true)
  }


  ngOnDestroy(){
    this.clickedContactSubscriber.unsubscribe();
  }
}
