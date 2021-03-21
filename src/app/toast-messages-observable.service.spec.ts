import { TestBed } from '@angular/core/testing';

import { ToastMessagesObservableService } from './toast-messages-observable.service';

describe('ToastMessagesObservableService', () => {
  let service: ToastMessagesObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastMessagesObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
