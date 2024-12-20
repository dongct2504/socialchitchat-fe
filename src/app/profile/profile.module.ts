import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile.component';
import { SharedModule } from '../shared/shared.module';
import { PictureEditComponent } from './pages/picture-edit/picture-edit.component';


@NgModule({
  declarations: [
    ProfileComponent,
    PictureEditComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
