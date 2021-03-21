import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseContactsForSendContactsListModalComponent } from './choose-contacts-for-send-contacts-list-modal.component';

describe('ChooseContactsForSendContactsListModalComponent', () => {
  let component: ChooseContactsForSendContactsListModalComponent;
  let fixture: ComponentFixture<ChooseContactsForSendContactsListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseContactsForSendContactsListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseContactsForSendContactsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
