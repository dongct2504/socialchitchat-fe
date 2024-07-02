import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { SharedRoutingModule } from './shared-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NgxGalleryModule } from '@rybos/ngx-gallery'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AgePipe } from './pipes/age.pipe'
import { TextAreaComponent } from './components/text-area/text-area.component';
import { DateInputComponent } from './components/date-input/date-input.component';


@NgModule({
  declarations: [
    TextInputComponent,
    AgePipe,
    TextAreaComponent,
    DateInputComponent
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
    }),
    NgxGalleryModule,
    TabsModule,
    FileUploadModule,
    BsDatepickerModule
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule,
    NgxGalleryModule,
    TabsModule,
    FileUploadModule,
    BsDatepickerModule,

    TextInputComponent,
    TextAreaComponent,
    DateInputComponent,
    AgePipe
  ],
  providers: [
    BsDatepickerConfig
  ]
})
export class SharedModule { }
