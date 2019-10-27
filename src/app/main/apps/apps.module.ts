import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import {WelcomeComponent } from './welcome/welcome.component';

const routes = [
    // {
    //     path        : 'dashboard',
    //     component   :  ProjectDashboardComponent,
    // },
    {
        path        : 'welcome',
        component   :  WelcomeComponent,
    },
    {
        path        : 'auth',
        loadChildren: 'app/main/apps/auth/auth.module#AuthModule'
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
