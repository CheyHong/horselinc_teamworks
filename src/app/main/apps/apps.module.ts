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
import {EditProfileDialogComponent} from './edit-profile-dialog/edit-profile-dialog.component';
import {HorseManagerScheduleComponent} from './horse-manager-schedule/horse-manager-schedule.component';
import {HorseManagerConfirmComponent} from './horse-manager-confirm/horse-manager-confirm.component';

const routes = [
    {
        path        : 'welcome',
        component   :  WelcomeComponent,
    },
    {
        path        : 'edit-profile-dialog',
        component   :  EditProfileDialogComponent,
    },
    {
        path        : 'horse-manager-confirm',
        component   :  HorseManagerConfirmComponent,
    },
    {
        path        : 'horse-manager-schedule',
        component   :  HorseManagerScheduleComponent,
    },
    {
        path        : 'user',
        loadChildren: 'app/main/apps/user/user.module#UserModule'
    },
    {
        path        : 'profile',
        loadChildren: 'app/main/apps/profile/profile.module#ProfileModule'
    },
    {
        path        : 'horse-manager',
        loadChildren: 'app/main/apps/horse-manager/horse-manager.module#HorseManagerModule'
    },
    {
        path        : 'payment-manager',
        loadChildren: 'app/main/apps/payment/payment.module#PaymentModule'
    },
    {
        path        : 'payment-provider',
        loadChildren: 'app/main/apps/provider-payment/provider-payment.module#ProviderPaymentModule'
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
        EditProfileDialogComponent, 

        HorseManagerScheduleComponent,
        HorseManagerConfirmComponent,
    ],

    exports     : [
        WelcomeComponent,
        EditProfileDialogComponent,

        HorseManagerScheduleComponent,
        HorseManagerConfirmComponent,
    ]
})
export class AppsModule
{
}
