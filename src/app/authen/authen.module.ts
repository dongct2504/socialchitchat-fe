import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenRoutingModule } from './authen-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenRoutingModule,
    SharedModule
  ]
})
export class AuthenModule { }
