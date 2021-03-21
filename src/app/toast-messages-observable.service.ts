import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastObject } from './models/ToastObject';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagesObservableService {
  private toastMessageToShowSubject = new BehaviorSubject<ToastObject>(null);
  toastMessageToShowObject = this.toastMessageToShowSubject.asObservable();

  constructor() { }

  setToastMessageToShow(toastObject:ToastObject,milliseconds=10000){
    if(!toastObject.message)return;
    this.toastMessageToShowSubject.next(toastObject);
    // reset toas message to null after specified milliseconds
    setTimeout(()=>{
      this.unsetToastMessageToShow();
    },milliseconds)
  }

  unsetToastMessageToShow(){
    this.toastMessageToShowSubject.next(null);
  }
}
