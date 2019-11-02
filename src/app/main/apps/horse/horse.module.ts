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
import { jqxCalendarModule } from 'jqwidgets-ng/jqxcalendar';

const routes: Routes = [
    {
        path     : 'label/:labelHandle',
        component: HorseComponent,
        resolve  : {
            horse: HorseService
        }
    },
    {
        path     : 'label/:labelHandle/:horseId',
        component: HorseComponent,
        resolve  : {
            horse: HorseService
        }
    },
    {
        path     : 'filter/:filterHandle',
        component: HorseComponent,
        resolve  : {
            horse: HorseService
        }
    },
    {
        path     : 'filter/:filterHandle/:horseId',
        component: HorseComponent,
        resolve  : {
            horse: HorseService
        }
    },
    {
        path     : ':folderHandle',
        component: HorseComponent,
        resolve  : {
            horse: HorseService
        }
    },
    {
        path     : ':folderHandle/:horseId',
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
        jqxCalendarModule,
       
    ],
    providers      : [
        HorseService
    ],
   
})
export class HorseModule
{
}
