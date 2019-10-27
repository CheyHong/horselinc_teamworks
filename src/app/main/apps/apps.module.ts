import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { FuseSharedModule } from '@fuse/shared.module';

import {WelcomeComponent } from './welcome/welcome.component';
import { AuthComponent } from './auth/auth.component';

const routes = [
    {
        path        : 'welcome',
        component   :  WelcomeComponent,
    },
    {
        path        : 'auth',
        component   : AuthComponent
    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatButtonModule
    ],
    declarations: [
        WelcomeComponent, 
        AuthComponent
    ],

    exports     : [
        WelcomeComponent,
        AuthComponent
    ]
})
export class AppsModule
{
}
