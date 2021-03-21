import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCallModalComponent } from './add-call-modal.component';

describe('AddCallModalComponent', () => {
  let component: AddCallModalComponent;
  let fixture: ComponentFixture<AddCallModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCallModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
