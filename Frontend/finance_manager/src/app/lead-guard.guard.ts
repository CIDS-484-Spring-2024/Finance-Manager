import { CanActivateFn } from '@angular/router';

export const leadGuardGuard: CanActivateFn = (route, state) => {
  return localStorage.getItem('isLoggedIn') !== "true";
};
