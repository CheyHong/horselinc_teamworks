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
import { HorseMainSidebarComponent } from 'app/main/apps/horse/sidebars/main/main-sidebar.component';
import { HorseComposeDialogComponent } from 'app/main/apps/horse/dialogs/compose/compose.component';

import { CommonModule }   from '@angular/common';
import { jqxCalendarModule }   from 'jqwidgets-ng/jqxcalendar';


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
        redirectTo: 'inbox'
    }
];

@NgModule({
    declarations   : [
        HorseComponent,
        HorseListComponent,
        HorseListItemComponent,
        HorseDetailsComponent,
        HorseMainSidebarComponent,
        HorseComposeDialogComponent
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
    entryComponents: [
        HorseComposeDialogComponent
    ]
})
export class HorseModule
{
}
