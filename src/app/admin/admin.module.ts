import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { PictureManagementComponent } from './picture-management/picture-management.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    AdminComponent,
    AdminManagementComponent,
    PictureManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class AdminModule { }
