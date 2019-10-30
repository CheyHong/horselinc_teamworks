import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import {WelcomeComponent } from './welcome/welcome.component';

const routes = [
    {
        path        : 'welcome',
        component   :  WelcomeComponent,
    },
    {
        path        : 'auth',
        loadChildren: 'app/main/apps/auth/auth.module#AuthModule'
    },

    {
        path        : 'payment',
        loadChildren: 'app/main/apps/payment/payment.module#PaymentModule'
    },
    {
        path        : 'horse',
        loadChildren: 'app/main/apps/horse/horse.module#HorseModule'
    },
    {
        path        : '',
        redirectTo  : 'payment',
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
        MatInputModule
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
