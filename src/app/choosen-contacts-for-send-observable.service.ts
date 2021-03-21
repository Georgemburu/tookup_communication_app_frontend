import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class ChoosenContactsForSendObservableService {
  private choosenContactsForSendArraySubject = new BehaviorSubject<User[]>(null)
  choosenContactsForSendArray = this.choosenContactsForSendArraySubject.asObservable();

  constructor() { }

  setChoosenContactForSendArray(contactsChoosen:User[]){
    this.choosenContactsForSendArraySubject.next(contactsChoosen)
  }
  unsetChoosenContactForSendArray(){
    this.choosenContactsForSendArraySubject.next(null)
  }
  
}
