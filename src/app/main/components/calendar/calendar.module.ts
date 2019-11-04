
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
    MatListModule, MatSelectModule, MatRadioModule, MatGridListModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,MatCardModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports:      [         
        NoopAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatSelectModule,
        MatRadioModule,
        MatGridListModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        FlexLayoutModule,
        CommonModule
         ],

    exports: [
        CalendarComponent
    ],
  declarations: [ CalendarComponent ],
  bootstrap:    [ CalendarComponent ]
})
export class CalendarModule { }
