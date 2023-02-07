import { TestBed } from '@angular/core/testing';

import { UserAuthGuardService } from './user-auth-guard.service';

describe('UserAuthGuardService', () => {
  let service: UserAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
