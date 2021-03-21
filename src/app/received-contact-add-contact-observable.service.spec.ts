import { TestBed } from '@angular/core/testing';

import { ReceivedContactAddContactObservableService } from './received-contact-add-contact-observable.service';

describe('ReceivedContactAddContactObservableService', () => {
  let service: ReceivedContactAddContactObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivedContactAddContactObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
