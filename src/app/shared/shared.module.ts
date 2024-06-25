import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { SharedRoutingModule } from './shared-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/text-input/text-input.component';


@NgModule({
  declarations: [
    TextInputComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule,

    TextInputComponent
  ]
})
export class SharedModule { }
