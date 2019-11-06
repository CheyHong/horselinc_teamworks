import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import {  MatSidenavModule, MatListModule,  MatRadioModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatCardModule} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { HorseManagerService } from 'app/main/apps/horse-manager/horse-manager.service';
import { HorseManagerComponent } from 'app/main/apps/horse-manager/horse-manager.component';
import { HorseManagerListComponent } from 'app/main/apps/horse-manager/horse-manager-list/horse-manager-list.component';
import { HorseManagerListItemComponent } from 'app/main/apps/horse-manager/horse-manager-list/horse-manager-list-item/horse-manager-list-item.component';
import { HorseManagerDetailsComponent } from 'app/main/apps/horse-manager/horse-manager-details/horse-manager-details.component';
import { HorseManagerProfileComponent } from 'app/main/apps/horse-manager/horse-manager-profile/horse-manager-profile.component';
import { HorseManagerScheduleComponent } from 'app/main/apps/horse-manager/horse-manager-schedule/horse-manager-schedule.component';
import { HorseManagerConfirmComponent } from 'app/main/apps/horse-manager/horse-manager-confirm/horse-manager-confirm.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './../../components/calendar/calendar.component';

const routes: Routes = [
    {
        path     : ':folderHandle',
        component: HorseManagerComponent,
        resolve  : {
            horsemanager: HorseManagerService
        }
    },
   
    {
        path      : '**',
        redirectTo: 'inbox',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations   : [
        HorseManagerComponent,
        HorseManagerListComponent,
        HorseManagerListItemComponent,
        HorseManagerDetailsComponent,
        HorseManagerProfileComponent,
        HorseManagerScheduleComponent,
        HorseManagerConfirmComponent,
        CalendarComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,  
        MatRadioModule, 
        MatGridListModule, 
        MatDatepickerModule, 
        MatNativeDateModule, 
        MatCardModule,
        TranslateModule,
        MatSlideToggleModule,
        FuseSharedModule,
        FuseSidebarModule,
        CommonModule,
//        CalendarModule
       
    ],
    providers      : [
        HorseManagerService
    ],
   
})
export class HorseManagerModule
{
}
