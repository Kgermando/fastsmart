import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [AuthComponent, RequestPasswordComponent,
                RegisterComponent, LoginComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
