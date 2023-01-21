import { TestBed } from '@angular/core/testing';

import { DriverDataService } from './driver-data-service.service';

describe('DriverDataServiceService', () => {
  let service: DriverDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
