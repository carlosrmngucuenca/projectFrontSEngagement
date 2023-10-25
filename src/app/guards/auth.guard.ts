import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // const token: string | unknown = inject(TokenService).getToken();
  // if (!token) {
  //   inject(Router).navigate(['/login']);
  //   return false;
  // }
  return true;
};
