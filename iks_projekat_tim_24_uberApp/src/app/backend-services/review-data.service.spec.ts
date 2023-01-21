import { TestBed } from '@angular/core/testing';

import { ReviewDataService } from './review-data.service';

describe('ReviewDataService', () => {
  let service: ReviewDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
