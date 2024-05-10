import { TestBed } from '@angular/core/testing';

import { ManagerCustomerAccountService } from './manager-customer-account.service';

describe('ManagerCustomerAccountService', () => {
  let service: ManagerCustomerAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerCustomerAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
