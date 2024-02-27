import { CanActivateFn } from '@angular/router';

export const userinfoGuard: CanActivateFn = (route, state) => {


 // alert("Invalid credentials. Create an account to access.")
  return localStorage.getItem('isLoggedIn') === "true";
};
