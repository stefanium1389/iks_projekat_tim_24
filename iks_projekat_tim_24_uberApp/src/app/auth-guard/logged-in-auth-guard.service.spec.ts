import { TestBed } from '@angular/core/testing';

import { LoggedInAuthGuardService } from './logged-in-auth-guard.service';

describe('LoggedInAuthGuardService', () => {
  let service: LoggedInAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
