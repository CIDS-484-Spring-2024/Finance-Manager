import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";


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

  postData() {
    if(this.checkPswdMatch()) {
      this.pswdMatch = ""
      console.log("PasswordsMatch")
    }
    else {
      this.pswdMatch = "Error: passwords don't match"
    }
  }

  checkPswdMatch() {
    return this.pswd === this.spswd;
  }

}
