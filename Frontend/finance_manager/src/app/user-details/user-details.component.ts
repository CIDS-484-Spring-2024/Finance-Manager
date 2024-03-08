import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import { CommonModule } from '@angular/common'
import {NgModule} from "@angular/core";
// import {BrowserModule} from "@angular/platform-browser";
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

  finForm = {
    firstname : "",
    lastname : "",
    year : 0,
    maritalstatus : "",
    state : "",
    AGI : "",
    AME : "",
    numDependants : 0,
    finGoal : 0,
  }


  checkboxSelection() {
    this.checkboxes[0].checked = !this.checkboxes[0].checked;
}

submitForm() {
    console.log("button pressed")
 console.log(this.finForm.firstname);
}


}
