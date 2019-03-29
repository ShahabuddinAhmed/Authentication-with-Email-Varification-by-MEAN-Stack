import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { Login } from './../models/login';
import { Register } from './../models/register';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hide1 = true;
  public Register: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;
  register: Register;
  login: Login;

  private createFormGroup(): void {
    this.Register = new  FormGroup( {
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  private createFormControls(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(60)
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100)
    ]);
  }

  constructor(private _accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.createFormControls();
    this.createFormGroup();
  }

  onSubmit() {
    this.register = new Register();
    this.register.userName = this.name.value;
    this.register.userEmail = this.email.value;
    this.register.userPassword = this.password.value;
    this.register.userConfirmPassword = this.confirmPassword.value;
    this.login = new Login();
    this.login.userEmail = this.email.value;
    this.login.userPassword = this.password.value;

    this._accountService.userRegister(this.register)
    .subscribe(data => {
      console.log(data);
      this._accountService.userLogin(this.login)
    .subscribe(loginData => {
      console.log(loginData);
      this._accountService.setToken(data);
      this.router.navigate(['/home']);
    },
    err => {
      console.log(err);
    });
    },
    err => {
      console.log(err);
    });
  }
}
