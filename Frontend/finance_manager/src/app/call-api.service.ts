import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CallAPIService {

  constructor(private auth: AuthService, private router: Router) { }

  async postUserAuthData(dataObj: any, path: string) {
    let userCredentials = {"Email":dataObj.Email, "Password":dataObj.Password};
    fetch(path, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      body: JSON.stringify(userCredentials), // body data type must match "Content-Type" header
    }).catch(error =>  {
      console.log("an error occurred: ", error);
      userCredentials.Email = "";
    })
      //check to see if user is authenticated, and if so, navigate to correct page
      .then(() => {
          this.auth.login(userCredentials.Email).subscribe(
            data => {
              console.log("login status: " + data);
              if(data) {
                //navigate to correct page
                this.router.navigate(['/my-info'])
              }
            });
      });
  }
}
