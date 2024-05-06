import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {SessionManagerService} from "./session-manager.service";
import {endpoints} from "../api_urls/URL";

@Injectable({
  providedIn: 'root'
})
export class CallAPIService {

  constructor(private auth: AuthService, private router: Router, private session: SessionManagerService) {}
  errorCodes = [400, 401, 500];

  async postFormData(formObj: any, path: string ) {
    formObj.email = localStorage.getItem('email'); //add the users email
   // localStorage.removeItem('email');
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
      if (res.ok) {
        console.log("posted form successfully")
        localStorage.setItem('auth', 'true');
        this.auth.isFormComplete = true;
        this.getUserGraphInformation();
      }
    })
  }

  async getUserGraphInformation() {
    //get the email
    let userEmail = localStorage.getItem('email');
    //get the information from the backend
    await fetch(endpoints.getUserDetails + userEmail, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      }
    }).then( async res => {
      res = await res.json();
      // @ts-ignore
      const {data} = res; //getting the block of user info from the backend
      this.session.populateUserInfo(data)
    })
  }

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
         //log user in on frontend
         this.auth.login(userCredentials.Email).subscribe(
           async data => {
             console.log("login status: " + data);
             //if correctly logged in
             if (data) {
               res = await res.json();
               // @ts-ignore
               const {data} = res; //getting the block of user info from the backend
               //navigate to correct page and switch text to logout
               this.session.loginorouttext = " Logout"
               console.log(data.HasCompletedForm, " and ", typeof(data.HasCompletedForm))
               if(data.HasCompletedForm === 1) {
                await this.getUserGraphInformation()
               }
               else {
                 this.session.loginorouttext = " Logout"
                 this.router.navigate(['/my-info'])
               }
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
