import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import { CommonModule } from '@angular/common'
import {NgModule} from "@angular/core";
import {CallAPIService} from "../services/call-api.service";
import {endpoints} from "../api_urls/URL";
// import {BrowserModule} from "@angular/platform-browser";
@Component({
  selector: 'app-userFinanceForm',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  constructor(private callAPI: CallAPIService) {
  }

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
    dependants: false,
    email: ""
  }
 currentDate = new Date()
  currentYear = this.currentDate.getFullYear() + 1
  minYear = this.currentDate.getFullYear() - 40



  checkboxSelection() {
    this.checkboxes[0].checked = !this.checkboxes[0].checked;
    this.finForm.dependants = this.checkboxes[0].checked;
}

submitForm() {
   this.callAPI.postFormData(this.finForm, endpoints.postForm)
}




}
