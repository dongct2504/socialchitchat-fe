import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowRoutingModule } from './follow-routing.module';
import { FollowComponent } from './pages/follow.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FollowComponent
  ],
  imports: [
    CommonModule,
    FollowRoutingModule,
    SharedModule
  ]
})
export class FollowModule { }
