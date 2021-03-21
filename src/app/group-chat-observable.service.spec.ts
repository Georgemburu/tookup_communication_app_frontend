import { TestBed } from '@angular/core/testing';

import { GroupChatObservableService } from './group-chat-observable.service';

describe('GroupChatObservableService', () => {
  let service: GroupChatObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupChatObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
