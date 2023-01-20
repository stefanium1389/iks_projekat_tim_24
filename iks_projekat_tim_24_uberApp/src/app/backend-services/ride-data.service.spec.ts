import { TestBed } from '@angular/core/testing';

import { RideDataService } from './ride-data.service';

describe('RideDataService', () => {
  let service: RideDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
