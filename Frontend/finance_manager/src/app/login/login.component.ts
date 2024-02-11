import { Component } from '@angular/core';
import {endpoints} from "../api_urls/URL";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
    let userCredentials = {"email":this.userEmail, "password":this.userPassword};
    fetch(endpoints.checkLogin, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      body: JSON.stringify(userCredentials), // body data type must match "Content-Type" header
    }).then(()=>{console.log("success")})
      .catch(error => console.log(error))
  }
}
