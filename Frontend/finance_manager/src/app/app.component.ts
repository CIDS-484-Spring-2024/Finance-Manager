import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "./navbar/navbar.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {UserDetailsComponent} from "./userFinanceForm/user-details.component";
import {FooterComponent} from "./footer/footer.component";

/* This is where it all comes together. I'm importing all my components into this
* component.*/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, SignupComponent, FormsModule, NavbarComponent, LandingPageComponent, UserDetailsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'finance_manager';
}
