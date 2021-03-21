import { TestBed } from '@angular/core/testing';

import { ChoosenFilesObservableService } from './choosen-files-observable.service';

describe('ChoosenFilesObservableService', () => {
  let service: ChoosenFilesObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoosenFilesObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
