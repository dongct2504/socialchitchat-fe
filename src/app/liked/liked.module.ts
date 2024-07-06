import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LikedRoutingModule } from './liked-routing.module';
import { LikedComponent } from './liked.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LikedComponent
  ],
  imports: [
    CommonModule,
    LikedRoutingModule,
    SharedModule
  ]
})
export class LikedModule { }
