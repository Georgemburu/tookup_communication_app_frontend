import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetReminderModalComponent } from './set-reminder-modal.component';

describe('SetReminderModalComponent', () => {
  let component: SetReminderModalComponent;
  let fixture: ComponentFixture<SetReminderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetReminderModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetReminderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
