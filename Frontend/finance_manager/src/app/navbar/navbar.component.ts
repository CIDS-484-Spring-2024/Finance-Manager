import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {LandingPageComponent} from "../landing-page/landing-page.component"
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../services/auth.service";
import {SessionManagerService} from "../services/session-manager.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [AuthService]
})

export class NavbarComponent implements OnInit{
  constructor(public auth: AuthService, private router: Router, public session: SessionManagerService) {
  }

  ngOnInit() {
    this.session.loginorouttext =  this.auth.isLoggedIn? " Logout": " Login";
  }

  LogUserOut() {
    if(this.auth.isLoggedIn) {
      this.session.loginorouttext = " Login";
      this.auth.logout()
      this.router.navigate(['/']);
    }
  }

}
