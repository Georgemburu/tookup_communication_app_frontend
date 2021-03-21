import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallModalComponent } from './video-call-modal.component';

describe('VideoCallModalComponent', () => {
  let component: VideoCallModalComponent;
  let fixture: ComponentFixture<VideoCallModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCallModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
