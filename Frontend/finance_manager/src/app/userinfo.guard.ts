import { CanActivateFn } from '@angular/router';

//This guard ensures the user can only access a page when they're logged in
export const userinfoGuard: CanActivateFn = (route, state) => {
  return localStorage.getItem('isLoggedIn') === "true";
};
