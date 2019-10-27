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
        ResetPasswordComponent
    ],

    exports     : [
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent
    ]
})
export class AuthModule
{
}
