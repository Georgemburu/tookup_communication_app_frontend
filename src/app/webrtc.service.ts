import { Injectable } from '@angular/core';
// import  { SimplePeer } from 'simple-peer';
// import * as SimplePeer from 'simple-peer';
import { Instance } from 'simple-peer';
import * as SimplePeer from 'simple-peer';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  private MainPeer: Instance;
  private SecondaryPeer: Instance;
  private CurrentUserPeer: Instance;
  constructor() { }
  
  instatiatePeer(isTheInitiator:boolean = false){
    // check is webrtc support in browser7
    if(!SimplePeer.WEBRTC_SUPPORT){
      // handle no webrtc support for the browser
      console.log('Browser does not support webrtc')
      return;
    }
    if(isTheInitiator==true){
      this.MainPeer = new SimplePeer({
        initiator: true,
      })
      this.CurrentUserPeer = this.MainPeer;
    }else {
      this.SecondaryPeer = new SimplePeer();
      this.CurrentUserPeer = this.SecondaryPeer;
    }

    // this.handlePeerOnData()
    console.log('CurrentUserPeer:',this.CurrentUserPeer)

    // this.handlePeerOnData()
    this.CurrentUserPeer.on('signal',(data)=>{
      console.log('DATA:',data)
    })

    this.CurrentUserPeer.on('data',(data)=>{
      console.log('data2:',data)
    })
  }
  
  handlePeerOnData(){
    this.CurrentUserPeer.on('signal',(data)=>{
      console.log('WEBRTC current User Peer data:',data)
    })
  }




}
