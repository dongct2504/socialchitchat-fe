import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserMessageComponent } from './pages/user-message/user-message.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserDetailComponent,
    UserMessageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
