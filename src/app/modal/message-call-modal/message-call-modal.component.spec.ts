import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCallModalComponent } from './message-call-modal.component';

describe('MessageCallModalComponent', () => {
  let component: MessageCallModalComponent;
  let fixture: ComponentFixture<MessageCallModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCallModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
