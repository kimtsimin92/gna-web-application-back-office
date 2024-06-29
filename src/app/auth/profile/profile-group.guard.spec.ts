import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profileGroupGuard } from './profile-group.guard';

describe('profileGroupGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profileGroupGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
