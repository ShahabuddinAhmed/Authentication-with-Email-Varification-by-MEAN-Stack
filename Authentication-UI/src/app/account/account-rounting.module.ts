import { AuthCheckService } from './../auth/auth-check.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [AuthCheckService] },
  { path: 'login', component: LoginComponent, canActivate: [AuthCheckService] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AccountRountingModule { }
