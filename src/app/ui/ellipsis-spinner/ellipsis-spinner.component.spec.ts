import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipsisSpinnerComponent } from './ellipsis-spinner.component';

describe('EllipsisSpinnerComponent', () => {
  let component: EllipsisSpinnerComponent;
  let fixture: ComponentFixture<EllipsisSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EllipsisSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipsisSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
