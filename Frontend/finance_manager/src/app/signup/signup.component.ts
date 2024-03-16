import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {endpoints} from "../api_urls/URL";
import {CallAPIService} from "../services/call-api.service";
import {SessionManagerService} from "../services/session-manager.service";
//Component decorator with necessary dependencies and services
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  providers: [CallAPIService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
//dependency injection
  constructor(private apiCall: CallAPIService, public session: SessionManagerService) {
  }
  //email and two passwords entered for integrity
  email = ""
  pswd = ""
  spswd = ""

//these 3 methods set the above variables to the inputted values
  setEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value
  }

  setNewPswd(event: Event) {
    this.pswd = (event.target as HTMLInputElement).value
  }

  setDuplicatePswd(event: Event) {
    this.spswd = (event.target as HTMLInputElement).value
  }

  //This function makes sure the user inputted data in the correct format.
  //If so, the data they entered is sent to the backend and stored in the DB.

  async validateSignup(event: Event)  {
    event.preventDefault()
    //Only proceed if the passwords match.
    if(this.passwordMatch() && !this.areFieldsEmpty()) {
      let userCredentials = {"Email": this.email, "Password": this.pswd};
      this.apiCall.postUserAuthData(userCredentials, endpoints.signup)
    }
  }

  //This function checks if the passwords match and displays a message if applicable
  passwordMatch() {
    let match: boolean = true;
    if(this.checkPswdMatch()) {
      this.session.loginError= ""
    }
    else {
      this.session.loginError = "Error: passwords don't match"
      match = false;
    }
    return match;
  }

  checkPswdMatch() {
    return this.pswd === this.spswd;
  }

  //This function asserts that the form data isn't empty
  areFieldsEmpty() {
   if ( this.email === "" || this.pswd === "" || this.spswd === "") {
     this.session.loginError = "Field(s) cannot be empty";
     return true;
   }
   return false;
  }

}
