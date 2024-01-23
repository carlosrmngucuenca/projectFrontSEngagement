import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const dashboardroleGuard: CanActivateFn = (route, state) => {
  const role: string = inject(AuthService).getUserRole();
  if (role.length > 0 && role === 'student') {
    inject(Router).navigate(['/student/home']);
    return false;
  }

  return true;
};
