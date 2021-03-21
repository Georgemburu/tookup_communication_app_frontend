import { TestBed } from '@angular/core/testing';

import { AuthClicksAndNavigationObservableService } from './auth-clicks-and-navigation-observable.service';

describe('AuthClicksAndNavigationObservableService', () => {
  let service: AuthClicksAndNavigationObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthClicksAndNavigationObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
