import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if(!this.auth.isAuthenticated() || this.auth.isTokenExit() )
    {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
