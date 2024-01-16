import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const redirectDashboardGuard: CanActivateFn = (route, state) => {
  const token: string | unknown = inject(TokenService).getToken();
  if (token) {
    inject(Router).navigate(['/dashboard/home']);
  }
  return true;
};
