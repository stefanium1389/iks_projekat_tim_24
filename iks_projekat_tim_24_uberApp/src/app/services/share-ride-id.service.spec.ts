import { TestBed } from '@angular/core/testing';

import { ShareRideIdService } from './share-ride-id.service';

describe('ShareRideIdService', () => {
  let service: ShareRideIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareRideIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
