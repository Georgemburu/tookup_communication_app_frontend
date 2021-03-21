import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingTypingInputComponent } from './messaging-typing-input.component';

describe('MessagingTypingInputComponent', () => {
  let component: MessagingTypingInputComponent;
  let fixture: ComponentFixture<MessagingTypingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagingTypingInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingTypingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
