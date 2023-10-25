import { CanActivateFn } from '@angular/router';

export const redirectGuard: CanActivateFn = (route, state) => {
  // const token: string | unknown = inject(TokenService).getToken();
  // if (token) {
  //   inject(Router).navigate(['/app']);
  // }
  return true;
};
