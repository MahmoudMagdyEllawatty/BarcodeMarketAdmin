import { TestBed } from '@angular/core/testing';

import { TraderServiceService } from './trader-service.service';

describe('TraderServiceService', () => {
  let service: TraderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
