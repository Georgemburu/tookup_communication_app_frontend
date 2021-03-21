import { TestBed } from '@angular/core/testing';

import { UserObservableService } from './user-observable.service';

describe('UserObservableService', () => {
  let service: UserObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
