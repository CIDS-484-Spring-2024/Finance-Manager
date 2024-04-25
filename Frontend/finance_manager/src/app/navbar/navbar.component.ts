import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import {ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {SessionManagerService} from "../services/session-manager.service";

//Providing dependencies for routing and angular directives
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
// OnInit is an interface that this class implements whenever it is loaded/initialized
export class NavbarComponent implements OnInit{
  //injecting dependencies
  constructor(public auth: AuthService, private router: Router, public session: SessionManagerService) {
  }

  //making sure the text is being displayed correctly
  ngOnInit() {
    this.session.loginorouttext =  this.auth.isLoggedIn? " Logout": " Login";
    localStorage.removeItem('isLoggedIn');
  }

  //This function checks if the user is logged in. If so, it logs them out
  //and redirects them to the landing page.
  LogUserOut() {
    if(this.auth.isLoggedIn) {
      this.session.loginorouttext = " Login";
      this.auth.logout()
      this.router.navigate(['/']);
    }
  }

}
