import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsObservableService } from 'src/app/notifications-observable.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {
  notificationsArray:any = [];
  
  // SUBSCRIBERS
  notificationsArraySubscriber:any;

  constructor(
    private notificationsObservableService: NotificationsObservableService
  ) { }

  ngOnInit(): void {
    // notifications array
    this.notificationsArraySubscriber =  this.notificationsObservableService.notificationsArray.subscribe((notifications_)=>{
      this.notificationsArray = notifications_
    })
  }


  ngOnDestroy() :void {
    this.notificationsArraySubscriber.unsubscribe();
  }

}
