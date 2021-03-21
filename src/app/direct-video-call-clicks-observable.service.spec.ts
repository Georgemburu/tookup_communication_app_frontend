import { TestBed } from '@angular/core/testing';

import { DirectVideoCallClicksObservableService } from './direct-video-call-clicks-observable.service';

describe('DirectVideoCallClicksObservableService', () => {
  let service: DirectVideoCallClicksObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectVideoCallClicksObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
