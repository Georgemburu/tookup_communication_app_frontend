import { Component, OnInit, OnDestroy } from '@angular/core';

import { MediaService } from '../../media.service';
import { DirectVideoCallClicksObservableService } from 'src/app/direct-video-call-clicks-observable.service';
import { MediaStreamInitiator } from 'src/app/models/MediaStreamInitiator';
import { User } from 'src/app/models/User';
import { ClicksObservableService } from 'src/app/clicks-observable.service';
import { ToastMessagesObservableService } from 'src/app/toast-messages-observable.service';
import { PlayRingtoneService } from 'src/app/play-ringtone.service';
import { WebrtcService } from 'src/app/webrtc.service';
 
@Component({
  selector: 'app-video-call-modal',
  templateUrl: './video-call-modal.component.html',
  styleUrls: ['./video-call-modal.component.css']
})
export class VideoCallModalComponent implements OnInit, OnDestroy {
  videoCall_MediaStreamConstraints = {
    audio: true,
    video: true
  }
  showVideoCallModal_clicked:boolean;
  mediaStream: MediaStream;
  clickedContactInfoObject: User;

  // LOCAL
  videoCallModalIsToggledOpen:boolean;
  currentMediaStreamInitiator: MediaStreamInitiator = '[DIRECT]:VIDEO_CALL'
  // callerVideoStream: any;
  callerVideoHTMLElement: HTMLVideoElement;

  // subscribers
  showVideoCallModal_ClickedSubscriber: any;
  instatiateMediaStreamSubscriber: any;
  clickedContactInfoObjectSubscriber: any;

  constructor(
    private mediaService:MediaService,
    private directVideoCallClicksObservableService: DirectVideoCallClicksObservableService,
    private clicksObservableService: ClicksObservableService,
    private toastMessagesObservableService: ToastMessagesObservableService,
    private playRingtoneService: PlayRingtoneService,
    private webrtcService: WebrtcService
  ) { }
 
  ngOnInit(): void {
    console.log('Video call component ngOnInit called')
    // set showVideoCall modal clicked
    this.directVideoCallClicksObservableService.showVideoCallModal_Clicked.subscribe((showVideoCallModal_clicked_)=>{
      this.showVideoCallModal_clicked = showVideoCallModal_clicked_;
      if(showVideoCallModal_clicked_==true){
        console.log('Video call modal is open')
        // prompt to use video media
        this.initiateMediaStream(this.videoCall_MediaStreamConstraints,this.currentMediaStreamInitiator);
      }else {
        // video call modal has been removed from screen
        console.log('Video call modal is closed')
      }
    })

    // video modal show
    this.showVideoCallModal_ClickedSubscriber = this.directVideoCallClicksObservableService.showVideoCallModal_Clicked.subscribe((showVideoCallModal_Clicked_)=>{
      console.log('showVideoCallModal_Clicked_1010:',showVideoCallModal_Clicked_)
      // let videoModalTogglerElement:HTMLAnchorElement = document.querySelector<HTMLAnchorElement>('#directCallVideoModalToggler')
      this.videoCallModalIsToggledOpen = showVideoCallModal_Clicked_;
      if(this.videoCallModalIsToggledOpen){
        // open modal if no media error
        if(this.mediaStream){
          this.showOneModal("videocall")
          console.log('Openned modal')
        }
        
      }else {
        // close modal
        this.closeOneModal("videocall")
        console.log('Closed modal')
      }
    })

    // clicked contact
    this.clickedContactInfoObjectSubscriber = this.clicksObservableService.clickedContact.subscribe((clicked_contact_)=>{
      this.clickedContactInfoObject = clicked_contact_;
    })  

  }

  // HANDLE INITIATING AND OPENNING MEDIA STREAM 
  initiateMediaStream(mediaStreamConstraints: MediaStreamConstraints,currentMediaStreamInitiator: MediaStreamInitiator){
    this.instatiateMediaStreamSubscriber = this.mediaService.initiateMediaDevices(mediaStreamConstraints,currentMediaStreamInitiator).subscribe((mediaStream_:MediaStream)=>{
      console.log('mediaStream:',mediaStream_)
      this.mediaStream = mediaStream_;

      // this.callercallerVideoStream = URL.createObjectURL(mediaStream_)
      // this.callerVideoStream = mediaStream_
    
      // show caller video
      this.showCallerVideStream(mediaStream_)
    });
  }
  instatiateWebRTCAsInitiatorForVideoCall(){
    this.webrtcService.instatiatePeer(true);
  }
  // shows caller video and instatiate webrtc
  showCallerVideStream(stream_:MediaStream){
    let callerVideoElement:HTMLVideoElement = document.querySelector<HTMLVideoElement>('#callerVideElement');
    this.callerVideoHTMLElement = callerVideoElement;
    callerVideoElement.muted=true;
    if('srcObject' in callerVideoElement) {
      callerVideoElement.srcObject = stream_;
      callerVideoElement.play();
      setTimeout(()=>{
        this.playRingingMusic();
      },2300)
      // instatiate webrtc
      this.instatiateWebRTCAsInitiatorForVideoCall()
    }else {
      // video not supported in browser
      this.toastMessagesObservableService.setToastMessageToShow({
        message: 'Your browser is not supported to take video call. Please try another browser',
        type: 'error',
        initiator: this.currentMediaStreamInitiator
      })
    }
  }
  stopCallerVideoStream(){
    if(this.callerVideoHTMLElement){
      this.callerVideoHTMLElement.srcObject = null;
      this.callerVideoHTMLElement.src = ''
    }
  }
  // HANGUP
  handleHangupButtonClick(){
    console.log('Clicked hangup')
    // close the media stream tracks
    if(this.mediaStream){
      this.mediaStream.getTracks().forEach((track)=>{
        track.stop()
      })
    }
    // close the modal
    this.directVideoCallClicksObservableService.setShowVideoCallModal_Clicked(false);
    
    
  }
  closeOneModal(modalId:string) {
    // get modal
    const modal = document.getElementById(modalId);

    // change state like in hidden modal
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('style', 'display: none');

     // get modal backdrop
     const modalBackdrops = document.getElementsByClassName('modal-backdrop');

     // remove opened modal backdrop
     if(!!modalBackdrops[0]){
      Array.from(modalBackdrops).forEach((bd)=>{
        document.body.removeChild(bd);
      })
     }

    //  stop ringtone is any
    this.stopRingingMusic();

    // clear the caller video src
     this.stopCallerVideoStream();
  }
  showOneModal(modalId:string) {
    // get modal
    const modal = document.getElementById(modalId);
    if(!modal.classList.contains('show')){
      // change state to show modal
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('style', 'display: block');

      // get modal backdrop
      const modalBackdrops = document.getElementsByClassName('modal-backdrop');

      //  append  modal backdrop
      if(!modalBackdrops[0]){
        let div = document.createElement('div');
        div.setAttribute('class','modal-backdrop fade show')
        document.body.appendChild(div)
      }
      console.log('VIDEO CALL MODAL SHOWN')
    }
  }
 
  // play ringing music
  playRingingMusic(){
    let ringingRingtoneSrc = '../../../assets/ringtones/ringing.mp3';
    this.playRingtoneService.playRingtone(ringingRingtoneSrc)
  }

  // stop playing music
  stopRingingMusic(){
    this.playRingtoneService.stopPlayingRingtone();
  }

  ngOnDestroy(): void {
    this.showVideoCallModal_ClickedSubscriber.unsubscribe();
    this.clickedContactInfoObjectSubscriber.unsubscribe();
    if(this.instatiateMediaStreamSubscriber){
      this.instatiateMediaStreamSubscriber.unsubscribe();
    }

  }

}
  