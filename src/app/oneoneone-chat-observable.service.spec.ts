import { TestBed } from '@angular/core/testing';

import { OneoneoneChatObservableService } from './oneoneone-chat-observable.service';

describe('OneoneoneChatObservableService', () => {
  let service: OneoneoneChatObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneoneoneChatObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
