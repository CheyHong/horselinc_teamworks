import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { 
    MatToolbarModule, MatSidenavModule, 
    MatListModule, MatSelectModule, MatRadioModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatCardModule
} from '@angular/material';

import {WelcomeComponent } from './welcome/welcome.component';
<<<<<<< HEAD
=======
import {EditProfileDialogComponent} from './edit-profile-dialog/edit-profile-dialog.component';
import { CreateInvoiceDialogComponent } from './create-invoice-dialog/create-invoice-dialog.component';
 


>>>>>>> horser providr change

const routes = [
    {
        path        : 'welcome',
        component   :  WelcomeComponent,
    },
    {
<<<<<<< HEAD
=======
        path        : 'create-invoice-dialog',
        component   :  CreateInvoiceDialogComponent,
    },
    {
        path        : 'edit-profile-dialog',
        component   :  EditProfileDialogComponent,
    },
    {
>>>>>>> horser providr change
        path        : 'user',
        loadChildren: 'app/main/apps/user/user.module#UserModule'
    },
    {
        path        : 'profile',
        loadChildren: 'app/main/apps/profile/profile.module#ProfileModule'
    },
    {
        path        : 'horse/manager',
        loadChildren: 'app/main/apps/horse-manager/horse-manager.module#HorseManagerModule'
    },
    {
        path        : 'payment/manager',
        loadChildren: 'app/main/apps/payment-manager/payment-manager.module#PaymentManagerModule'
    },
    {
        path        : 'payment/provider',
        loadChildren: 'app/main/apps/payment-provider/payment-provider.module#PaymentProviderModule'
    },
    {
        path        : 'schedule',
        loadChildren: 'app/main/apps/schedule/schedule.module#ScheduleModule'
    },
    {
        path        : '',
        redirectTo  : 'welcome',
        pathMatch   : 'full'
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        MatToolbarModule, MatSidenavModule, 
        MatListModule, MatSelectModule, MatRadioModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatCardModule
    ],
    declarations: [
        WelcomeComponent,
        
    ],

    exports     : [
        WelcomeComponent,
        
    ]
})
export class AppsModule
{
}
