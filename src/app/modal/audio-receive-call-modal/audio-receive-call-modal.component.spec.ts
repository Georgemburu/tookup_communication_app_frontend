import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioReceiveCallModalComponent } from './audio-receive-call-modal.component';

describe('AudioReceiveCallModalComponent', () => {
  let component: AudioReceiveCallModalComponent;
  let fixture: ComponentFixture<AudioReceiveCallModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioReceiveCallModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioReceiveCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
