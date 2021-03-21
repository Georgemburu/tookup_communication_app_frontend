import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessagingFileChoice } from './models/MessagingFilesChoice';

@Injectable({
  providedIn: 'root'
})
export class ChoosenFilesObservableService {
  private messagingFileChoiceSubject = new BehaviorSubject<MessagingFileChoice>(null);
  messagingFileChoice = this.messagingFileChoiceSubject.asObservable()

  constructor() { }

  setMessagigFileChoice(messagingFileChoice_:MessagingFileChoice){
    this.messagingFileChoiceSubject.next(messagingFileChoice_)
  }
  unsetMessagingFileChoice(){
    this.messagingFileChoiceSubject.next(null)
  }
}
