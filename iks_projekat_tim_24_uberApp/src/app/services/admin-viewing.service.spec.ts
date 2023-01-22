import { TestBed } from '@angular/core/testing';

import { AdminViewingService } from './admin-viewing.service';

describe('AdminViewingService', () => {
  let service: AdminViewingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminViewingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
