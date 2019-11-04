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

import { HorseService } from 'app/main/apps/horse/horse.service';
import { HorseComponent } from 'app/main/apps/horse/horse.component';
import { HorseListComponent } from 'app/main/apps/horse/horse-list/horse-list.component';
import { HorseListItemComponent } from 'app/main/apps/horse/horse-list/horse-list-item/horse-list-item.component';
import { HorseDetailsComponent } from 'app/main/apps/horse/horse-details/horse-details.component';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'app/main/components/calendar/calendar.module';
import { CalendarComponent } from './../../components/calendar/calendar.component';

const routes: Routes = [
    {
        path     : ':folderHandle',
        component: HorseComponent,
        resolve  : {
            horse: HorseService
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
        HorseComponent,
        HorseListComponent,
        HorseListItemComponent,
        HorseDetailsComponent,
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

        FuseSharedModule,
        FuseSidebarModule,
        CommonModule,
//        CalendarModule
       
    ],
    providers      : [
        HorseService
    ],
   
})
export class HorseModule
{
}
