import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  constructor(private auth: AuthService, private router: Router) { }
  loginError = ""
  loginorouttext = ""
  /*AGI
    AME
    Dependents
    Email
    FinGoal
    FirstName
    LastName
    Maritalstatus
    NumDependents
    State
    Year
*/
  //Variables used to display the users finance information
  AGI = 0;
  monthlyExpenses = 0;
  taxYear = 0;
  UsState = "";
  filingStatus = "";
  goal = 0;
  fullname = "";
  EERatio = "" //(((this.monthlyExpenses * 12)/this.AGI)*100).toFixed(2) + "%";
  ratioLevel = ""//this.getRatioLevel(this.monthlyExpenses*12, this.AGI);

  public populateUserInfo(formData: object) {
   // @ts-ignore
    this.AGI = formData.AGI;
   // @ts-ignore
    this.monthlyExpenses = formData.AME;
    // @ts-ignore
   this.taxYear = formData.Year;
    // @ts-ignore
   this.UsState = formData.State;
    // @ts-ignore
    this.filingStatus = formData.Maritalstatus;
    // @ts-ignore
    this.goal = formData.FinGoal;
    // @ts-ignore
    this.fullname = "Welcome, " + formData.FirstName + " " + formData.LastName;
    this.router.navigate(['/graph'])
  }
}
