import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ToastMessagesObservableService } from './toast-messages-observable.service';
import { ToastObject } from './models/ToastObject';
import { BehaviorSubject } from 'rxjs';
import { MediaStreamInitiator } from './models/MediaStreamInitiator';
import { DirectVideoCallClicksObservableService } from './direct-video-call-clicks-observable.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  /**
   * Handles clients camera and microphone
   * Handles media sream errors: shows toast hides modal of the initiator
   */
  constraints:MediaStreamConstraints;
  
  currentMediaStreamInitiator: MediaStreamInitiator;

  constructor(
    private toastMessagesObservableService: ToastMessagesObservableService,
    private directVideoCallClicksObservableService: DirectVideoCallClicksObservableService
  ) { }

  initiateMediaDevices(mediaConstraints_:MediaStreamConstraints,currentMediaStreamInitiator_: MediaStreamInitiator){
    this.currentMediaStreamInitiator = currentMediaStreamInitiator_;
    if(mediaConstraints_){
      this.setMediaConstraints(mediaConstraints_)
    }
    if(!this.constraints){
      console.log('Media constraints must not be undefined')
      return throwError('Media constraints must not be undefined')
    }
    return new Observable((observable)=>{
      navigator.mediaDevices.getUserMedia(this.constraints).then((mediaStream:MediaStream)=>{
        mediaStream.onremovetrack = this.mediaStreamOnRemoveTrackHandler
        observable.next(mediaStream)
      }).catch((mediaStreamError:MediaStreamError)=>{
        console.log('mediaStreamError:',mediaStreamError)
        this.handleMediaStreamError(mediaStreamError,currentMediaStreamInitiator_)
      })
     
    })
  }
  setMediaConstraints(mediaConstraints:MediaStreamConstraints){
    this.constraints = {
      ...mediaConstraints
    }
  }

  private handleMediaStreamError(mediaStreamError:MediaStreamError,currentMediaStreamInitiator: MediaStreamInitiator){
    // show toas message
    this.setAToastMessage({
      message: 'Please allow use of cammera and microphone to use video call service',
      type: "error",
      initiator: currentMediaStreamInitiator
    })

    // close modal if open
    switch(currentMediaStreamInitiator){
      case '[DIRECT]:VIDEO_CALL':
        setTimeout(()=>{
          this.directVideoCallClicksObservableService.setShowVideoCallModal_Clicked(false);
        },1000)
    }
    

}

  /**
   * HANDLER FUNCTIONS
   * 
   */
  mediaStreamOnRemoveTrackHandler(e){
    console.log('Media track removed:',e)
  }

  setAToastMessage(toastMessageObject:ToastObject){
    this.toastMessagesObservableService.setToastMessageToShow(toastMessageObject)
  }

}
