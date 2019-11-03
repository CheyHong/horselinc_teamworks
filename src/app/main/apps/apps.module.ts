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
import { CalendarComponent } from '../components/calendar/calendar.component';

const routes = [
    {
        path        : 'welcome',
        component   :  WelcomeComponent,
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
        path        : 'horse',
        loadChildren: 'app/main/apps/horse/horse.module#HorseModule'
    },
    {
        path        : 'edithorseprofile',
        loadChildren: 'app/main/apps/edithorseprofile/edithorseprofile.module#EdithorseprofileModule'
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
        CalendarComponent
    ],

    exports     : [
        WelcomeComponent,
        CalendarComponent
    ]
})
export class AppsModule
{
}
