import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import {UserLoginComponent } from './user-login/user-login.component';
import {UserRegisterComponent } from './user-register/user-register.component';
import {UserResetPasswordComponent} from './user-reset-password/user-reset-password.component';
import {UserRoleComponent} from './user-role/user-role.component';
import {UserPaymentComponent} from './user-payment/user-payment.component';
import {UserPaymentInfoComponent} from './user-payment/user-payment-info/user-payment-info.component';
import {UserPaymentApproverComponent} from './user-payment/user-payment-approver/user-payment-approver.component';

const routes = [

    {
        path        : 'login',
        component   :  UserLoginComponent,
    },
    {
        path        : 'register',
        component   :  UserRegisterComponent,
    },
    {
        path        : 'reset-password',
        component   :  UserResetPasswordComponent,
    },
    {
        path        :  'role',
        component   :   UserRoleComponent,
    },
    {
        path        : 'payment',
        component   :   UserPaymentComponent,        
    },
    {
        path        : 'payment/info',
        component   :   UserPaymentInfoComponent,        
    },
    {
        path        : 'payment/info/approver',
        component   :   UserPaymentApproverComponent,        
    },
    {
        path      : '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        FuseSidebarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSlideToggleModule
    ],
    declarations: [
        UserLoginComponent, 
        UserRegisterComponent,
        UserResetPasswordComponent,
        UserRoleComponent,
        UserPaymentComponent,
        UserPaymentInfoComponent,
        UserPaymentApproverComponent
    ],

    exports     : [
        UserLoginComponent,
        UserRegisterComponent,
        UserResetPasswordComponent,
        UserRoleComponent,
        UserPaymentComponent,
        UserPaymentInfoComponent,
        UserPaymentApproverComponent
    ]
})
export class UserModule
{
}
