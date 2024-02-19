import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  checkboxes = [
    {id:"dependants", name:"dependant", checked: false}
  ]

  checkboxSelection() {
    this.checkboxes[0].checked = !this.checkboxes[0].checked;
    console.log(this.checkboxes[0].checked)

}


}
