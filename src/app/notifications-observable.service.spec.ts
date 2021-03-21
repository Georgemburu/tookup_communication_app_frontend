import { TestBed } from '@angular/core/testing';

import { NotificationsObservableService } from './notifications-observable.service';

describe('NotificationsObservableService', () => {
  let service: NotificationsObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
