import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ONotification } from './models/ONotification';
import { GNotification } from './models/GNotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsObservableService {
  private notificationsArraySubject = new BehaviorSubject([]);
  notificationsArray = this.notificationsArraySubject.asObservable();

  constructor() { }

  setNotificationsArray(notification_:ONotification[]|GNotification[]){
    this.notificationsArraySubject.next(notification_)
  }
  unsetNotificationsArray(){
    this.notificationsArraySubject.next(null)
  }
  
  removeNotificationFromNotificationsArray(notification_:ONotification|GNotification){
    let newNotificationsArray = this.notificationsArraySubject.value.filter((notif)=> notif._id!=notification_._id)
    this.notificationsArraySubject.next(newNotificationsArray)
  }

}
