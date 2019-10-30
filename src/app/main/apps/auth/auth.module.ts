import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import {LoginComponent } from './login/login.component';
import {RegisterComponent } from './register/register.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {RoleComponent} from './role/role.component';

const routes = [

    {
        path        : 'login',
        component   :  LoginComponent,
    },
    {
        path        : 'register',
        component   :  RegisterComponent,
    },
    {
        path        : 'reset-password',
        component   :  ResetPasswordComponent,
    },
    {
        path        :  'role',
        component   :   RoleComponent,
    },
    {
        path        : 'payment',
        loadChildren: 'app/main/apps/auth/payment/payment.module#AuthPaymentModule'
    },
    {
        path      : '**',
        redirectTo: 'login'
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
        LoginComponent, 
        RegisterComponent,
        ResetPasswordComponent,
        RoleComponent
    ],

    exports     : [
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        RoleComponent
    ]
})
export class AuthModule
{
}
