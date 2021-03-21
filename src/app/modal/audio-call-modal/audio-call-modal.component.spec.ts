import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioCallModalComponent } from './audio-call-modal.component';

describe('AudioCallModalComponent', () => {
  let component: AudioCallModalComponent;
  let fixture: ComponentFixture<AudioCallModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioCallModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
