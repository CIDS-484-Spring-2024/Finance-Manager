import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {endpoints} from "../api_urls/URL";
import {CallAPIService} from "../call-api.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  providers: [CallAPIService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private apiCall: CallAPIService) {
  }
  email = ""
  pswd = ""
  spswd = ""
  err = ""
  emptyFields = ""

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
    if(this.passwordMatch() && !this.areFieldsEmpty()) {
      let userCredentials = {"Email": this.email, "Password": this.pswd};
      this.apiCall.postUserAuthData(userCredentials, endpoints.signup)
    }
  }

  passwordMatch() {
    let match: boolean = true;
    if(this.checkPswdMatch()) {
      this.err= ""
    }
    else {
      this.err = "Error: passwords don't match"
      match = false;
    }
    return match;
  }

  checkPswdMatch() {
    return this.pswd === this.spswd;
  }
  areFieldsEmpty() {
   if ( this.email === "" || this.pswd === "" || this.spswd === "") {
     this.err = "Field(s) cannot be empty";
     return true;
   }
   return false;
  }

}
