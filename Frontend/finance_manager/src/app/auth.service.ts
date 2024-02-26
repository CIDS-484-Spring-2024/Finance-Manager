import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {tap, delay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn: boolean = false;

  login(email: string): Observable<boolean> {
    //check to see if user is logged in
    this.isLoggedIn = !(email === null || email === "");
    //enter the status
    localStorage.setItem('isLoggedIn', this.isLoggedIn? "true": "false" );

    //return a boolean observable, piping the delay function and
    //log together. Observables are used to handle async operations
    //and streams of data.
    return of(this.isLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Authentication status: ", val);
      })
    )
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem("isLoggedIn");
  }


}
