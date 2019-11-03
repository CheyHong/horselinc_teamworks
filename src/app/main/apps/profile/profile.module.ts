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
import { MatSidenavModule, MatListModule,  MatRadioModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatCardModule} from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { ProfileService } from 'app/main/apps/profile/profile.service';
import { ProfileComponent } from 'app/main/apps/profile/profile.component';
import { ProfileListComponent } from 'app/main/apps/profile/profile-list/profile-list.component';
import { ProfileEditPaymentComponent } from 'app/main/apps/profile/profile-editpayment/profile-editpayment.component';
import { ProfileProviderComponent } from 'app/main/apps/profile/profile-provider/profile-provider.component';
// import { CommonModule }   from '@angular/common';
// import { jqxCalendarModule }   from 'jqwidgets-ng/jqxcalendar';


const routes: Routes = [
    {
        path  : 'navigation1',
        component: ProfileComponent,
        resolve  : {
            provider: ProfileService
        }
        
    },
    {
        path  : 'navigation2',
        component: ProfileComponent,
        resolve  : {
            provider: ProfileService
        }
        
    },
    {
        path      : '**',
        redirectTo: 'navigation1',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations   : [
        ProfileComponent,
        ProfileListComponent,
        ProfileEditPaymentComponent,
        ProfileProviderComponent
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
        MatDividerModule,
        FuseSharedModule,
        FuseSidebarModule,
        // CommonModule,
        // jqxCalendarModule,
       
    ],
    providers      : [
         ProfileService
    ]
   
})

export class ProfileModule
{
}
