import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactContentTabComponent } from './contact-content-tab.component';

describe('ContactContentTabComponent', () => {
  let component: ContactContentTabComponent;
  let fixture: ComponentFixture<ContactContentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactContentTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactContentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
