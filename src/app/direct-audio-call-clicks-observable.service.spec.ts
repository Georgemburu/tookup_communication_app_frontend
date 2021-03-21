import { TestBed } from '@angular/core/testing';

import { DirectAudioCallClicksObservableService } from './direct-audio-call-clicks-observable.service';

describe('DirectAudioCallClicksObservableService', () => {
  let service: DirectAudioCallClicksObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectAudioCallClicksObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
