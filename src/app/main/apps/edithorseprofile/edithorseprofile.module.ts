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
import { MatSidenavModule, MatListModule,  MatRadioModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatCardModule} from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';


import { EdithorseprofileService } from 'app/main/apps/edithorseprofile/edithorseprofile.service';
import { EdithorseprofileComponent } from 'app/main/apps/edithorseprofile/edithorseprofile.component';
// import { EdithorseprofileListComponent } from 'app/main/apps/edithorseprofile/edithorseprofile-list/edithorseprofile-list.component';
// import { EdithorseprofileListItemComponent } from 'app/main/apps/edithorseprofile/edithorseprofile-list/edithorseprofile-list-item/edithorseprofile-list-item.component';
// import { EdithorseprofileDetailsComponent } from 'app/main/apps/edithorseprofile/edithorseprofile-details/edithorseprofile-details.component';
// import { CommonModule }   from '@angular/common';
// import { jqxCalendarModule }   from 'jqwidgets-ng/jqxcalendar';


const routes: Routes = [
    {
        path     : 'label/:labelHandle',
        component: EdithorseprofileComponent,
        // resolve  : {
        //     edithorseprofile: EdithorseprofileService
        // }
    },
    {
        path     : 'label/:labelHandle/:edithorseprofileId',
        component: EdithorseprofileComponent,
        // resolve  : {
        //     edithorseprofile: EdithorseprofileService
        // }
    },
    {
        path     : 'filter/:filterHandle',
        component: EdithorseprofileComponent,
        // resolve  : {
        //     edithorseprofile: EdithorseprofileService
        // }
    },
    {
        path     : 'filter/:filterHandle/:edithorseprofileId',
        component: EdithorseprofileComponent,
        // resolve  : {
        //     edithorseprofile: EdithorseprofileService
        // }
    },
    {
        path     : ':folderHandle',
        component: EdithorseprofileComponent,
        // resolve  : {
        //     edithorseprofile: EdithorseprofileService
        // }
    },
    {
        path     : ':folderHandle/:edithorseprofileId',
        component: EdithorseprofileComponent,
        // resolve  : {
        //     edithorseprofile: EdithorseprofileService
        // }
    },
    {
        path      : '**',
        redirectTo: 'inbox',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations   : [
        EdithorseprofileComponent,
        // EdithorseprofileListComponent,
        // EdithorseprofileListItemComponent,
        // EdithorseprofileDetailsComponent
 
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
        MatDividerModule,
        FuseSharedModule,
        FuseSidebarModule,
        // CommonModule,
        // jqxCalendarModule,
       
    ],
    providers      : [
         EdithorseprofileService
    ]
   
})

export class EdithorseprofileModule
{
}
