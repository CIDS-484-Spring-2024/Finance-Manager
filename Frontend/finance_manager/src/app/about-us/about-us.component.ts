import { Component } from '@angular/core';
//component decorator that connects the style and the view together.
//Any dependencies will go here as well.
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
//If I had logic to implement, that would go here
export class AboutUsComponent {

}
