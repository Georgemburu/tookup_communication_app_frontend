import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { UserService } from '../../user.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input() userInfoObject;
  @Input() chatMessagesObject;
  @Output() onclickedContact = new EventEmitter()

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  // handle contact click
  handleContactClick(clickedContactDataObj){
    console.log('Clicked:',clickedContactDataObj)
    // take the contact object to the chat
    this.onclickedContact.emit(clickedContactDataObj)
  }

}
