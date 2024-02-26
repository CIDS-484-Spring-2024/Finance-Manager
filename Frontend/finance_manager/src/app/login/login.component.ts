import { Component } from '@angular/core';
import {endpoints} from "../api_urls/URL";
import {CallAPIService} from "../call-api.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  providers: [CallAPIService], //used for dependency injection
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
//Here I'm injecting the CallAPIService dependency
  constructor(private apiCall: CallAPIService) {

  }

  userEmail = "";
  userPassword = "";

  emailLogin(event: Event) {
    this.userEmail = (event.target as HTMLInputElement).value;
  }

  passwordLogin(event: Event) {
    this.userPassword = (event.target as HTMLInputElement).value;
  }

  async validateLogin(event: Event)  {
    event.preventDefault()
    let userCredentials = {"Email":this.userEmail, "Password":this.userPassword};
    this.apiCall.postUserAuthData(userCredentials, endpoints.checkLogin);
  }
}
