import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { SharedRoutingModule } from './shared-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NgxGalleryModule } from '@rybos/ngx-gallery'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FileUploadModule } from 'ng2-file-upload';

import { AgePipe } from './pipes/age.pipe'
import { TextAreaComponent } from './components/text-area/text-area.component';


@NgModule({
  declarations: [
    TextInputComponent,
    AgePipe,
    TextAreaComponent
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
    FileUploadModule
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule,
    NgxGalleryModule,
    TabsModule,
    FileUploadModule,

    TextInputComponent,
    TextAreaComponent,
    AgePipe
  ]
})
export class SharedModule { }
