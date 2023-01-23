import { TestBed } from '@angular/core/testing';

import { ChartAdminService } from './chart-admin.service';

describe('ChartAdminService', () => {
  let service: ChartAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
