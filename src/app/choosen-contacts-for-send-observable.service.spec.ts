import { TestBed } from '@angular/core/testing';

import { ChoosenContactsForSendObservableService } from './choosen-contacts-for-send-observable.service';

describe('ChoosenContactsForSendObservableService', () => {
  let service: ChoosenContactsForSendObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoosenContactsForSendObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
