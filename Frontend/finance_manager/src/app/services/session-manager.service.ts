import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

//Injectable decorator for use in injected components
@Injectable({
  providedIn: 'root'
})

/** The purpose of this class is to store variables
 * that are shared across components. For example, if I receive an
 * error from the server when trying to authenticate the user, I can
 * display that error on the page so the user knows what's going on.
 * I plan on extending this with other useful functions and variables
 * that enhance the flow and management of data.*/
export class SessionManagerService {
  constructor(private auth: AuthService) { }
  loginError = ""
  loginorouttext = ""
  //I will likely store form data form the user in an object here:

}
