import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const role: string = inject(AuthService).getUserRole();
  if (role.length > 0 && role === 'teacher') {
    inject(Router).navigate(['/dashboard/home']);
    return false;
  }

  return true;
};
