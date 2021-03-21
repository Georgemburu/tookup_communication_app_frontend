import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/User';
import { ClicksObservableService } from 'src/app/clicks-observable.service';

@Component({
  selector: 'app-profile-personal-information',
  templateUrl: './profile-personal-information.component.html',
  styleUrls: ['./profile-personal-information.component.css']
})
export class ProfilePersonalInformationComponent implements OnInit, OnDestroy {
  clickedContact:User;


  // SUBSCRIBERS
  clickedContactSubscriber:any;
  constructor(
    private clicksObservableService: ClicksObservableService
  ) { }

  ngOnInit(): void {
    this.clickedContactSubscriber = this.clicksObservableService.clickedContact.subscribe((clickedContact_:User)=>{
      this.clickedContact = clickedContact_;
    })
  }

  ngOnDestroy(): void{
    this.clickedContactSubscriber.unsubscribe()
  }

}
