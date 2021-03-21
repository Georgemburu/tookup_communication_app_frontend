import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectVideoCallClicksObservableService {
  // show/hide video call modal listener
  private showVideoCallModalClickedSubject = new BehaviorSubject<boolean>(false);
  showVideoCallModal_Clicked = this.showVideoCallModalClickedSubject.asObservable();

  constructor() { }

  // 1. Show/hide video call handlers
  setShowVideoCallModal_Clicked(showModal: boolean){
    this.showVideoCallModalClickedSubject.next(showModal);
  }
  

}
