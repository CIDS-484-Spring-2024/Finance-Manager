import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {UserDetailsComponent} from "./userFinanceForm/user-details.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {userinfoGuard} from "./userinfo.guard";
import {leadGuardGuard} from "./lead-guard.guard";
import {FinGraphComponent} from "./fin-graph/fin-graph.component";

/**
 * This is the routes array. Each path corresponds to a component.
 * Additionally, There's guards so the user can't access routes if
 * they aren't authorized.*/

export const routes: Routes = [{path: "login", component: LoginComponent},
                               {path:"signup", component: SignupComponent, canActivate: [leadGuardGuard]},
                               {path:"my-info", component: UserDetailsComponent, canActivate: [userinfoGuard]},
                               {path:"AboutUs", component: AboutUsComponent},
                               {path: "graph", component: FinGraphComponent},
                               {path:"", component: LandingPageComponent}
];
