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
// import { CalendarModule } from './../components/calendar/calendar.module';

import {WelcomeComponent } from 'app/main/apps/welcome/welcome.component';

const routes = [
    {
        path        : 'welcome',
        component   :  WelcomeComponent,
    },
    {
        path        : 'notification',
        loadChildren: 'app/main/apps/notification/notification.module#NotificationModule'
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
        path        : 'horse/provider',
        loadChildren: 'app/main/apps/horse/horse-provider/horse-provider.module#HorseProviderModule'
    },
    {
        path        : 'horse/manager',
        loadChildren: 'app/main/apps/horse/horse-manager/horse-manager.module#HorseManagerModule'
    },
    {
        path        : 'payment/manager',
        loadChildren: 'app/main/apps/payment/payment-manager/payment-manager.module#PaymentManagerModule'
    },
    {
        path        : 'payment/provider',
        loadChildren: 'app/main/apps/payment/payment-provider/payment-provider.module#PaymentProviderModule'
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
        MatToolbarModule, 
        MatSidenavModule, 
        MatListModule,
        MatSelectModule,
        MatRadioModule, 
        MatGridListModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatCardModule
    ],
    declarations: [
        WelcomeComponent
    ],

    exports: [
        WelcomeComponent
    ]
})
export class AppsModule
{
}
