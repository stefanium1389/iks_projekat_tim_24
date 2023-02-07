import { TestBed } from '@angular/core/testing';

import { DriverAuthGuardService } from './driver-auth-guard.service';

describe('DriverAuthGuardService', () => {
  let service: DriverAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
