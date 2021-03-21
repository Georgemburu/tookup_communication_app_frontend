import { TestBed } from '@angular/core/testing';

import { DocumentsObservableService } from './documents-observable.service';

describe('DocumentsObservableService', () => {
  let service: DocumentsObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentsObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
