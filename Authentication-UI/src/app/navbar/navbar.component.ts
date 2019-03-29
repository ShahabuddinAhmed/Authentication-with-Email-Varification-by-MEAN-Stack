import { AccountService } from './../account/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  jwtHelper = new JwtHelperService();
  public userName: string;

  constructor(private _accountService: AccountService, private router: Router) { }

  ngOnInit() {

  }

  getName() {
    const token = localStorage.getItem('token');
    const tokenPayload = this.jwtHelper.decodeToken(token);
    return this.userName = tokenPayload.userName;
  }

  loggedOut() {
    this._accountService.loggedOut();
  }

}
