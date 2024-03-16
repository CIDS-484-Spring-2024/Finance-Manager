import { CanActivateFn } from '@angular/router';

//This guard ensures the user can't access a provided page unless they aren't logged in
export const leadGuardGuard: CanActivateFn = (route, state) => {
  return localStorage.getItem('isLoggedIn') !== "true";
};
