import { TestBed } from '@angular/core/testing';

import { JwtService } from './jwt-service.service';

describe('JwtServiceService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
