import {Component} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faMoon, faPen, faPhone, faPrint} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  protected readonly faMoon = faMoon;
  protected readonly faPrint = faPrint;
  protected readonly faPen = faPen;
  protected readonly faPhone = faPhone;
}
