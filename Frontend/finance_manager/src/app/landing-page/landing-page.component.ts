import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
