import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContentTabComponent } from './chat-content-tab.component';

describe('ChatContentTabComponent', () => {
  let component: ChatContentTabComponent;
  let fixture: ComponentFixture<ChatContentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatContentTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
