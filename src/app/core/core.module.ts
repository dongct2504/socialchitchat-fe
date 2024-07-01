import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotfoundComponent } from './errors/notfound/notfound.component';
import { InternalServerErrorComponent } from './errors/internal-server-error/internal-server-error.component';


@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    TestErrorsComponent,
    NotfoundComponent,
    InternalServerErrorComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    BsDropdownModule,
    NgxSpinnerModule
  ],
  exports: [
    NgxSpinnerModule,

    NavBarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
