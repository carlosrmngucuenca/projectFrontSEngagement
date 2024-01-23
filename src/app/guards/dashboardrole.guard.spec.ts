import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dashboardroleGuard } from './dashboardrole.guard';

describe('dashboardroleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dashboardroleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
