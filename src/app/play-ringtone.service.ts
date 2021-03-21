import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayRingtoneService {
  private ringtoneBeingPlayed: any;
  constructor() { }

  // the music plays in repeat untill an event to stop it is sent
  playRingtone(src){
    let ringingAudio = new Audio();
    ringingAudio.src = '../../../assets/ringtones/ringing.mp3';
    ringingAudio.load();
    ringingAudio.play();
    this.ringtoneBeingPlayed = ringingAudio;

    ringingAudio.addEventListener("ended", function(){

      ringingAudio.currentTime = 0;
      console.log("Music ended");
      ringingAudio.play();
    });
  }

  stopPlayingRingtone(){
    if(this.ringtoneBeingPlayed){
      this.ringtoneBeingPlayed.pause()
      this.ringtoneBeingPlayed.currentTime = 0;
    } 
  }


}
