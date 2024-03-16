import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {SessionManagerService} from "./session-manager.service";

//Injectable decorator injected into components that need its functionality
@Injectable({
  providedIn: 'root'
})
export class CallAPIService {
 //add dependencies to constructor
  constructor(private auth: AuthService, private router: Router, private session: SessionManagerService) {}
  //array of HTTP status error codes
  errorCodes = [400, 401, 500];

  /*This function takes in a form object and a path, and calls the backend
  * api to store the object in the database. The path tells the API call
  * where to send the data to. On success, the user will be routed to a page showing their
  * financial details. As of right now, it only logs the status.*/

  async postFormData(formObj: any, path: string ) {
    formObj.email = localStorage.getItem('email'); //add the users email
    localStorage.removeItem('email'); //delete from memory as it's not needed
    //post to backend
    await fetch(path,{
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      body: JSON.stringify(formObj), // body data type must match "Content-Type" header )
  }).then(res => {
    console.log("status:" + res.status);
    })
  }

  /**
   * This function takes in an object that stores a password and email. it also
   * accepts a path. These are then sent to the backend API. Whether the user is
   * logging in or signing up, we want to make sure they are correctly authorized by
   * calling the auth service. This then returns a boolean observable where that result
   * will indicate whether or not they have access to the my-info page. If the server doesn't
   * even send a successful response, the user will be alerted that they couldn't be authenticated.
   * Otherwise, the user will be successfully routed to the my-info page.*/

  async postUserAuthData(dataObj: any, path: string) {
    let userCredentials = {"Email":dataObj.Email, "Password":dataObj.Password};
    localStorage.setItem('email', userCredentials.Email);
     await fetch(path, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      body: JSON.stringify(userCredentials), // body data type must match "Content-Type" header
    }).then(res => {
       if(res.status === 200) {
         this.auth.login(userCredentials.Email).subscribe(
           data => {
             console.log("login status: " + data);
             if (data) {
               //navigate to correct page and switch text to logout
               this.session.loginorouttext = " Logout"
               this.router.navigate(['/my-info'])
             }

           });}

       else if (this.errorCodes.includes(res.status)) {
         console.log("Uh oh, you ain't verified!")
         this.session.loginError = "Unable to sign in. Please enter correct credentials.";
       }
     }).catch(error =>  {
      console.log("an error occurred: ", error);
    })

  }
}
