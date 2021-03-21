import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavDrawersComponent } from './main-nav-drawers.component';

describe('MainNavDrawersComponent', () => {
  let component: MainNavDrawersComponent;
  let fixture: ComponentFixture<MainNavDrawersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNavDrawersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavDrawersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
