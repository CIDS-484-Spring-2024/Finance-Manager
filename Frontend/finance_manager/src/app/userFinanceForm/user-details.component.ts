import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import { CommonModule } from '@angular/common'
import {CallAPIService} from "../services/call-api.service";
import {endpoints} from "../api_urls/URL";

//Component decorator with proper dependencies
@Component({
  selector: 'app-userFinanceForm',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
//dependency injection so the API can be called through a service
  constructor(private callAPI: CallAPIService) {
  }
//Array to store checkbox value in.
  checkboxes = [
    {id:"dependants", name:"dependant", checked: false}
  ]

  //Object to store finance details in, this makes it more organized when posting to the backend
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
    dependants: false,
    email: ""
  }
  //Obtaining the date so the tax year is recent and restricted
 currentDate = new Date()
  currentYear = this.currentDate.getFullYear() + 1
  minYear = this.currentDate.getFullYear() - 40


  //This function updates the value of the dependants. It's called every time the checkbox is clicked.
  checkboxSelection() {
    this.checkboxes[0].checked = !this.checkboxes[0].checked;
    this.finForm.dependants = this.checkboxes[0].checked;
}

//This function is called when the form is submitted. It sends the data
// to the backend and attempts to save it. Eventually, I'll have it navigate
// to a graph showing the users financials.
submitForm() {
   this.callAPI.postFormData(this.finForm, endpoints.postForm)
}




}
