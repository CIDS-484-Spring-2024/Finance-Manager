import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {tap, delay} from 'rxjs/operators';

/* This is an injectable decorator. It's meant for use
* in components by injecting it into their constructor. The class contains
* variable and functions accessible to the component it's injected into. */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //variable to check login status
  isLoggedIn: boolean = localStorage.getItem('isLoggedIn') === "true" || false;
  isFormComplete = false;


/*This function is used to check if the user is logged in. It then stores the status
* in local storage and returns a boolean Observable*/
  login(email: string): Observable<boolean> {
    //check to see if user is logged in
    this.isLoggedIn = !(email === null || email === "");
    //enter the status
    localStorage.setItem('isLoggedIn', this.isLoggedIn? "true": "false" );
    //return a boolean observable, piping the delay function and
    //tap operator together. Observables are used to handle async operations
    //and streams of data.
    return of(this.isLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Authentication status: ", val);
      })
    )
  }

  //This function simply logs the user out by changing the status
  //and deleting the item from local storage.
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem("isLoggedIn");
  }


}
