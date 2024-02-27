import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  constructor(private auth: AuthService) { }
  loginError = ""
  loginorouttext = ""

}
