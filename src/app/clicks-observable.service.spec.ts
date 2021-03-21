import { TestBed } from '@angular/core/testing';

import { ClicksObservableService } from './clicks-observable.service';

describe('ClicksObservableService', () => {
  let service: ClicksObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClicksObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
