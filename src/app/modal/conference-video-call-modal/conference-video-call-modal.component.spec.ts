import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceVideoCallModalComponent } from './conference-video-call-modal.component';

describe('ConferenceVideoCallModalComponent', () => {
  let component: ConferenceVideoCallModalComponent;
  let fixture: ComponentFixture<ConferenceVideoCallModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenceVideoCallModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceVideoCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
