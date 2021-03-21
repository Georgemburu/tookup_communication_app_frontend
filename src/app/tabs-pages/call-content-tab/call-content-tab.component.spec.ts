import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallContentTabComponent } from './call-content-tab.component';

describe('CallContentTabComponent', () => {
  let component: CallContentTabComponent;
  let fixture: ComponentFixture<CallContentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallContentTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallContentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
