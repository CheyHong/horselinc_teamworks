import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { NotificationCardComponent } from './notification-card/notification-card.component';
import { NotificationComponent } from './notification.component';

const routes: Routes = [
    {
        path     : 'home',
        component: NotificationComponent,
    },
    {
        path      : '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations   : [
        NotificationCardComponent,
        NotificationComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        CommonModule,
        MatButtonModule,
        MatRippleModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers: [
    ]
   
})

export class NotificationModule
{
}

