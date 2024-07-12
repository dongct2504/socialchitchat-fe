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
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago'
import { strings as vietnameseStrings } from 'ngx-timeago/language-strings/vi'
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AgePipe } from './pipes/age.pipe'
import { TextAreaComponent } from './components/text-area/text-area.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { PagingFooterComponent } from './components/paging-footer/paging-footer.component';
import { UserCardComponent } from './components/user-card/user-card.component';


@NgModule({
  declarations: [
    TextInputComponent,
    AgePipe,
    TextAreaComponent,
    DateInputComponent,
    PagingFooterComponent,
    UserCardComponent
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
    BsDatepickerModule,
    PaginationModule,
    TimeagoModule.forRoot({
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    }),
    ButtonsModule
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
    PaginationModule,
    TimeagoModule,
    ButtonsModule,

    TextInputComponent,
    TextAreaComponent,
    DateInputComponent,
    PagingFooterComponent,
    UserCardComponent,

    AgePipe
  ],
  providers: [
    BsDatepickerConfig,
    { 
      provide: TimeagoIntl,
      useFactory: () => {
        const intl = new TimeagoIntl();
        intl.strings = vietnameseStrings;
        intl.changes.next();
        return intl;
      }
    }
  ]
})
export class SharedModule { }
