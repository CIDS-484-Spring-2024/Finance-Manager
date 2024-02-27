import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {userinfoGuard} from "./userinfo.guard";

export const routes: Routes = [{path: "login", component: LoginComponent},
                               {path:"signup", component: SignupComponent},
                               {path:"my-info", component: UserDetailsComponent, canActivate: [userinfoGuard]},
                               {path:"AboutUs", component: AboutUsComponent},
                               {path:"", component: LandingPageComponent}
];
