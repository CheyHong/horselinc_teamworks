import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { FuseSharedModule } from '@fuse/shared.module';

import {UserLoginComponent } from './user-login/user-login.component';
import {UserRegisterComponent } from './user-register/user-register.component';
import {UserResetPasswordComponent} from './user-reset-password/user-reset-password.component';
import {UserRoleComponent} from './user-role/user-role.component';
import {UserPaymentAccountComponent} from './user-payment-account/user-payment-account.component';
import {UserPaymentInfoComponent} from './user-payment-info/user-payment-info.component';

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
        path        : 'payment-account',
        component   :   UserPaymentAccountComponent,        
    },
    {
        path        : 'payment-info',
        component   :   UserPaymentInfoComponent,        
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
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule
    ],
    declarations: [
        UserLoginComponent, 
        UserRegisterComponent,
        UserResetPasswordComponent,
        UserRoleComponent,
        UserPaymentAccountComponent,
        UserPaymentInfoComponent
    ],

    exports     : [
        UserLoginComponent,
        UserRegisterComponent,
        UserResetPasswordComponent,
        UserRoleComponent,
        UserPaymentAccountComponent,
        UserPaymentInfoComponent
    ]
})
export class UserModule
{
}
