import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {UserDetailsComponent} from "./user-details/user-details.component";

export const routes: Routes = [{path: "login", component: LoginComponent},
                               {path:"signup", component: SignupComponent},
                               {path:"my-info", component: UserDetailsComponent},
                               {path:"", component: LandingPageComponent}
];
