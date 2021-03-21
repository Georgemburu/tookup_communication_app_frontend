import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReceivedContactObject } from './models/ReceivedContactObject';

@Injectable({
  providedIn: 'root'
})
export class ReceivedContactAddContactObservableService {
  private contactToAddObjectInfoSubject = new BehaviorSubject<ReceivedContactObject>(null);
  contactToAddObjectInfo = this.contactToAddObjectInfoSubject.asObservable();


  constructor() { } 

  setContactToAddObjectInfo(receivedContactObj:ReceivedContactObject){
    this.contactToAddObjectInfoSubject.next(receivedContactObj)
  }
  unsetContactToAddObjectInfo(){
    this.contactToAddObjectInfoSubject.next(null)
  }
}
