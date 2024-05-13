import { TestBed } from '@angular/core/testing';

import { CoinsuranceService } from './coinsurance.service';

describe('CoinsuranceService', () => {
  let service: CoinsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
