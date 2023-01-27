import { TestBed } from '@angular/core/testing';

import { WorkingHourService } from './working-hour.service';

describe('WorkingHourService', () => {
  let service: WorkingHourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingHourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
