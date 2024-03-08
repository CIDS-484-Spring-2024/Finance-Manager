import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {SessionManagerService} from "./session-manager.service";

@Injectable({
  providedIn: 'root'
})
export class CallAPIService {

  constructor(private auth: AuthService, private router: Router, private session: SessionManagerService) {}
  errorCodes = [400, 401, 500];
  email: string = ""

  async postFormData(formObj: any, path: string ) {
    formObj.email = this.email; //add the users email

  }

  async postUserAuthData(dataObj: any, path: string) {
    let userCredentials = {"Email":dataObj.Email, "Password":dataObj.Password};
    this.email = userCredentials.Email
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
               //localStorage.setItem("email", userCredentials.Email)
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
