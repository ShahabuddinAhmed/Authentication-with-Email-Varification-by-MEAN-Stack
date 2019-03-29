import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { Login } from './../models/login';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  public loginForm: FormGroup;
  public email: FormControl;
  public password: FormControl;
  login: Login;

  private createForm(): void {
    this.loginForm = new FormGroup( {
      email: this.email,
      password: this.password
    });
  }
  private CreateFormControls(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(60),
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100)
    ]);
  }
  constructor(private _accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.CreateFormControls();
    this.createForm();
  }

  onSubmit() {
    this.login = new Login();
    this.login.userEmail = this.email.value;
    this.login.userPassword = this.password.value;
    this._accountService.userLogin(this.login)
    .subscribe(data => {
      console.log(data);
      this._accountService.setToken(data);
      this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      });
  }

}
