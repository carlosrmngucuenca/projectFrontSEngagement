import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authDashboardGuard } from './auth-dashboard.guard';

describe('authDashboardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authDashboardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
