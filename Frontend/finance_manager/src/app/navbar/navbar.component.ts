import { Component } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {LandingPageComponent} from "../landing-page/landing-page.component"
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    RouterModule
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
