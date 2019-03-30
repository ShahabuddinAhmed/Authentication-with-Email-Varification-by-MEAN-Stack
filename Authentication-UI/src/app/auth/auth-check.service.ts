import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if(this.auth.isAuthenticated())
    {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
