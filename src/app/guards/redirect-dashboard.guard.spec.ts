import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redirectDashboardGuard } from './redirect-dashboard.guard';

describe('redirectDashboardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectDashboardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
