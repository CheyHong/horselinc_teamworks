import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import { FakeDbService } from 'app/fake-db/fake-db.service';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { WelcomeComponent } from 'app/main/welcome/welcome.component';

const appRoutes = [
    {
        path        : 'welcome',
        component   :  WelcomeComponent,
    },
    {
        path        : 'notification',
        loadChildren: 'app/main/notification/notification.module#NotificationModule'
    },
    {
        path        : 'user',
        loadChildren: 'app/main/user/user.module#UserModule'
    },
    {
        path        : 'profile',
        loadChildren: 'app/main/profile/profile.module#ProfileModule'
    },
    {
        path        : 'horse/provider',
        loadChildren: 'app/main/horse/horse-provider/horse-provider.module#HorseProviderModule'
    },
    {
        path        : 'horse/manager',
        loadChildren: 'app/main/horse/horse-manager/horse-manager.module#HorseManagerModule'
    },
    {
        path        : 'payment/manager',
        loadChildren: 'app/main/payment/payment-manager/payment-manager.module#PaymentManagerModule'
    },
    {
        path        : 'payment/provider',
        loadChildren: 'app/main/payment/payment-provider/payment-provider.module#PaymentProviderModule'
    },
    {
        path        : 'schedule',
        loadChildren: 'app/main/schedule/schedule.module#ScheduleModule'
    },
    {
        path        : '',
        redirectTo  : 'welcome',
        pathMatch   : 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent
    ],
    imports     : [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,

        //Firebase module
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [    
        { provide: FirestoreSettingsToken, useValue: {} }
    
    ],
})
export class AppModule
{
}
