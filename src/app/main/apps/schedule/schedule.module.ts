import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import {MatTabsModule} from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { ScheduleComponent } from './schedule.component';
import {SchedulePastComponent} from './schedule-past/schedule-past.component';
import {ScheduleCurrentComponent} from './schedule-current/schedule-current.component';
import {ScheduleFilterDialogComponent} from './schedule-filter-dialog/schedule-filter-dialog.component';
import {ScheduleCardComponent} from './schedule-card/schedule-card.component';


const routes: Routes = [
    {
        path     : 'home',
        component: ScheduleComponent,
    },
    {
        path      : '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    NgxDnDModule,

    FuseSharedModule,
    FuseSidebarModule,
    MatTabsModule
  ],
  declarations: [
      ScheduleComponent,
      SchedulePastComponent,
      ScheduleCurrentComponent,
      ScheduleFilterDialogComponent,
      ScheduleCardComponent
    ]
})
export class ScheduleModule { }
