import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSentFromForgotpasswordComponent } from './mail-sent-from-forgotpassword.component';

describe('MailSentFromForgotpasswordComponent', () => {
  let component: MailSentFromForgotpasswordComponent;
  let fixture: ComponentFixture<MailSentFromForgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailSentFromForgotpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSentFromForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
