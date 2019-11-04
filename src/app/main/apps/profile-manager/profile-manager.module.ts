import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { ProfileManagerService } from 'app/main/apps/profile-manager/profile-manager.service';
import { ProfileManagerComponent } from 'app/main/apps/profile-manager/profile-manager.component';
import { ProfileManagerListComponent } from 'app/main/apps/profile-manager/profile-manager-list/profile-manager-list.component';
import { ProfileManagerDetailsComponent } from 'app/main/apps/profile-manager/profile-manager-details/profile-manager-details.component';
import { ProfileManagerManagerComponent } from 'app/main/apps/profile-manager/profile-manager-details/profile-manager-manager/profile-manager-manager.component';
import { ProfileManagerProviderComponent } from 'app/main/apps/profile-manager/profile-manager-details/profile-manager-provider/profile-manager-provider.component';
import { ProfileManagerPaymentComponent } from 'app/main/apps/profile-manager/profile-manager-details/profile-manager-payment/profile-manager-payment.component';

const routes: Routes = [
    {
        path  : 'index',
        component: ProfileManagerComponent,
        resolve  : {
            provider: ProfileManagerService
        }
    },
    {
        path      : '**',
        redirectTo: 'index',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations   : [
        ProfileManagerComponent,
        ProfileManagerListComponent,
        ProfileManagerDetailsComponent,
        ProfileManagerManagerComponent,
        ProfileManagerProviderComponent,
        ProfileManagerPaymentComponent,
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
        CommonModule
      
    ],
    providers      : [
         ProfileManagerService
    ]
   
})

export class ProfileManagerModule
{
}
