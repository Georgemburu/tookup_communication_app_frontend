import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightNavigationAndDrawersComponent } from './right-navigation-and-drawers.component';

describe('RightNavigationAndDrawersComponent', () => {
  let component: RightNavigationAndDrawersComponent;
  let fixture: ComponentFixture<RightNavigationAndDrawersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightNavigationAndDrawersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightNavigationAndDrawersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
