import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TookupLoaderComponent } from './tookup-loader.component';

describe('TookupLoaderComponent', () => {
  let component: TookupLoaderComponent;
  let fixture: ComponentFixture<TookupLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TookupLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TookupLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
