import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FuseSharedModule } from '@fuse/shared.module';

import {PaymentAccountComponent } from './payment-account/payment-account.component';
import {PaymentInfoComponent } from './payment-info/payment-info.component';

const routes = [

    {
        path        : 'account',
        component   :  PaymentAccountComponent,
    },
    {
        path        : 'info',
        component   :  PaymentInfoComponent,
    },
    {
        path      : '**',
        redirectTo: 'account'
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
        MatRadioModule
    ],
    declarations: [
        PaymentAccountComponent, 
        PaymentInfoComponent,
    ],

    exports     : [
        PaymentAccountComponent,
        PaymentInfoComponent,
    ]
})
export class AuthPaymentModule
{
}
