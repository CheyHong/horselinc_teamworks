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

import { ProfileService } from 'app/main/apps/profile/profile.service';

import { ProfileManagerComponent } from 'app/main/apps/profile/profile-manager/profile-manager.component';
import { ProfileManagerListComponent } from 'app/main/apps/profile/profile-manager/profile-manager-list/profile-manager-list.component';
import { ProfileManagerDetailsComponent } from 'app/main/apps/profile/profile-manager/profile-manager-details/profile-manager-details.component';
import { ProfileManagerManagerComponent } from 'app/main/apps/profile/profile-manager/profile-manager-details/profile-manager-manager/profile-manager-manager.component';
import { ProfileManagerProviderComponent } from 'app/main/apps/profile/profile-manager/profile-manager-details/profile-manager-provider/profile-manager-provider.component';
import { ProfileManagerPaymentComponent } from 'app/main/apps/profile/profile-manager/profile-manager-details/profile-manager-payment/profile-manager-payment.component';
import { ProfileManagerTermsComponent } from 'app/main/apps/profile/profile-manager/profile-manager-details/profile-manager-terms/profile-manager-terms.component';
import { ProfileManagerPrivacyComponent } from 'app/main/apps/profile/profile-manager/profile-manager-details/profile-manager-privacy/profile-manager-privacy.component';

import { ProfileProviderComponent } from 'app/main/apps/profile/profile-provider/profile-provider.component';
import { ProfileProviderListComponent } from 'app/main/apps/profile/profile-provider/profile-provider-list/profile-provider-list.component';
import { ProfileProviderDetailsComponent } from 'app/main/apps/profile/profile-provider/profile-provider-details/profile-provider-details.component';
import { ProfileProviderApplogComponent } from 'app/main/apps/profile/profile-provider/profile-provider-details/profile-provider-applog/profile-provider-applog.component';
import { ProfileProviderProviderComponent } from 'app/main/apps/profile/profile-provider/profile-provider-details/profile-provider-provider/profile-provider-provider.component';
import { ProfileProviderPaymentComponent } from 'app/main/apps/profile/profile-provider/profile-provider-details/profile-provider-payment/profile-provider-payment.component';
import { ProfileProviderTermsComponent } from 'app/main/apps/profile/profile-provider/profile-provider-details/profile-provider-terms/profile-provider-terms.component';
import { ProfileProviderPrivacyComponent } from 'app/main/apps/profile/profile-provider/profile-provider-details/profile-provider-privacy/profile-provider-privacy.component';

const routes: Routes = [
    {
        path  : 'manager',
        component: ProfileManagerComponent,
        resolve  : {
            provider: ProfileService
        }
    },
    {
        path  : 'provider',
        component: ProfileProviderComponent,
        resolve  : {
            provider: ProfileService
        }
    },
    {
        path      : '**',
        redirectTo: 'manager',
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
        ProfileManagerTermsComponent,
        ProfileManagerPrivacyComponent,

        ProfileProviderComponent,
        ProfileProviderListComponent,
        ProfileProviderDetailsComponent,
        ProfileProviderApplogComponent,
        ProfileProviderProviderComponent,
        ProfileProviderPaymentComponent,
        ProfileProviderTermsComponent,
        ProfileProviderPrivacyComponent,
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
         ProfileService
    ]
   
})

export class ProfileModule
{
}
