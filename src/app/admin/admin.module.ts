import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { AdminComponent } from './pages/admin.component';
import { AdminManagementComponent } from './pages/admin-management/admin-management.component';
import { PictureManagementComponent } from './pages/picture-management/picture-management.component';


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
