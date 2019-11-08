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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ProfileService } from 'app/main/apps/profile/profile.service';

import { ProfileManagerComponent } from 'app/main/apps/profile/manager/manager.component';
import { ProfileManagerListComponent } from 'app/main/apps/profile/manager/list/list.component';
import { ProfileManagerDetailsComponent } from 'app/main/apps/profile/manager/details/details.component';
import { ProfileManagerProviderComponent } from 'app/main/apps/profile/manager/details/provider/provider.component';
import { ProfileManagerPaymentComponent } from 'app/main/apps/profile/manager/details/payment/payment.component';
import { ProfileManagerTermsComponent } from 'app/main/apps/profile/manager/details/terms/terms.component';
import { ProfileManagerPrivacyComponent } from 'app/main/apps/profile/manager/details/privacy/privacy.component';
import { ProfileManagerEditProfileComponent } from 'app/main/apps/profile/manager/dialogs/editprofile/editprofile.component';
import { ProfileManagerUpdateEmailComponent } from './manager/dialogs/updateemail/updateemail.component';
import { ProfileManagerUpdatePasswordComponent } from './manager/dialogs/updatepassword/updatepassword.component';
import { ProfileManagerAddProviderComponent } from './manager/dialogs/addprovider/addprovider.component';
import { ProfileManagerSearchProviderComponent } from './manager/dialogs/searchprovider/searchprovider.component';
import { ProfileManagerAddPaymentComponent } from './manager/dialogs/addpayment/addpayment.component';

import { ProfileProviderComponent } from 'app/main/apps/profile/provider/provider.component';
import { ProfileProviderListComponent } from 'app/main/apps/profile/provider/list/list.component';
import { ProfileProviderDetailsComponent } from 'app/main/apps/profile/provider/details/details.component';
import { ProfileProviderInvoiceComponent } from 'app/main/apps/profile/provider/details/invoice/invoice.component';
import { ProfileProviderTermsComponent } from 'app/main/apps/profile/provider/details/terms/terms.component';
import { ProfileProviderPrivacyComponent } from 'app/main/apps/profile/provider/details/privacy/privacy.component';
import { ProfileProviderEditProfileComponent } from 'app/main/apps/profile/provider/dialogs/editprofile/editprofile.component';

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
        ProfileManagerProviderComponent,
        ProfileManagerPaymentComponent,
        ProfileManagerTermsComponent,
        ProfileManagerPrivacyComponent,
        ProfileManagerEditProfileComponent,
        ProfileManagerUpdateEmailComponent,
        ProfileManagerUpdatePasswordComponent,
        ProfileManagerAddProviderComponent,
        ProfileManagerSearchProviderComponent,
        ProfileManagerAddPaymentComponent,

        ProfileProviderComponent,
        ProfileProviderListComponent,
        ProfileProviderDetailsComponent,
        ProfileProviderInvoiceComponent,
        ProfileProviderTermsComponent,
        ProfileProviderPrivacyComponent,
        ProfileProviderEditProfileComponent
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
        MatSlideToggleModule,
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
