import { Login } from './models/login';
import { Router } from '@angular/router';
import { Register } from './models/register';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  userRegister(_register: Register) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:3000/user/register/', _register, httpOptions);
  }

  userLogin(_login: Login) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:3000/user/login/', _login, httpOptions);
  }

  setToken(auth: any) {
    localStorage.setItem('token', auth.token);
  }

  loggedOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
