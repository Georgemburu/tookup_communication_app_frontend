import { TestBed } from '@angular/core/testing';

import { PlayRingtoneService } from './play-ringtone.service';

describe('PlayRingtoneService', () => {
  let service: PlayRingtoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayRingtoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
