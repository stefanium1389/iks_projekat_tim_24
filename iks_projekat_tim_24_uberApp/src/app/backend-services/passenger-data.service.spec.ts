import { TestBed } from '@angular/core/testing';

import { PassengerDataService } from './passenger-data.service';

describe('PassengerDataService', () => {
  let service: PassengerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
