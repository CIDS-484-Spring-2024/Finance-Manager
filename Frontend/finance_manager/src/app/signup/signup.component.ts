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

  displayContents(){
  console.log(this.email, this.pswd, this.spswd)
  }
}
