import { TestBed } from '@angular/core/testing';

import { LinkUsersService } from './link-users.service';

describe('LinkUsersService', () => {
  let service: LinkUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
