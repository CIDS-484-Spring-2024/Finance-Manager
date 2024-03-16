import { Component } from '@angular/core';
import {endpoints} from "../api_urls/URL";
import {CallAPIService} from "../services/call-api.service";
import {SessionManagerService} from "../services/session-manager.service";
//component decorator to declare dependencies
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  providers: [CallAPIService, SessionManagerService], //used for dependency injection
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
//Injecting the CallAPIService and the session manager service.
  constructor(private apiCall: CallAPIService, public session: SessionManagerService) {

  }
//variables for use in the view when input is entered
  userEmail = "";
  userPassword = "";

  //update email on input
  emailLogin(event: Event) {
    //Since this is typescript, the event.target must be an HTMLInputElement. Otherwise,
    //its value could potentially be null.
    this.userEmail = (event.target as HTMLInputElement).value;
  }

  //update password on input
  passwordLogin(event: Event) {
    this.userPassword = (event.target as HTMLInputElement).value;
  }
//This function takes in an event, makes sure the page doesn't reload,
//and then sends the user login info and path to the api call service.
  async validateLogin(event: Event)  {
    event.preventDefault()
    let userCredentials = {"Email":this.userEmail, "Password":this.userPassword};
    this.apiCall.postUserAuthData(userCredentials, endpoints.checkLogin);
  }
}
