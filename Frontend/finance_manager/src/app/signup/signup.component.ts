import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {endpoints} from "../api_urls/URL";


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email = ""
  pswd = ""
  spswd = ""
  pswdMatch = ""

  setEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value
  }

  setNewPswd(event: Event) {
    this.pswd = (event.target as HTMLInputElement).value
  }

  setDuplicatePswd(event: Event) {
    this.spswd = (event.target as HTMLInputElement).value
  }

  async validateSignup(event: Event)  {
    event.preventDefault()
    //Only proceed if the passwords match.
    if(this.passwordMatch()) {
      let userCredentials = {"email": this.email, "password": this.pswd};
      fetch(endpoints.signup, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        body: JSON.stringify(userCredentials), // body data type must match "Content-Type" header
      }).catch(error => console.log("an error occurred: ", error))
        .then(response => console.log(response));

    }
  }

  passwordMatch() {
    let match: boolean = true;
    if(this.checkPswdMatch()) {
      this.pswdMatch = ""
    }
    else {
      this.pswdMatch = "Error: passwords don't match"
      match = false;
    }
    return match;
  }

  checkPswdMatch() {
    return this.pswd === this.spswd;
  }

}
