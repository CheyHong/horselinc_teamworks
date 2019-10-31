import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

import {MatTabsModule} from '@angular/material/tabs';


import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { ProfileComponent } from './profile.component';
import { ProfileService } from 'app/main/apps/profile/profile.service';

import { ProfileSidebarComponent } from 'app/main/apps/profile/profile-sidebar/profile-sidebar.component';
import { ProfileDetailsComponent } from 'app/main/apps/profile/profile-details/profile-details.component';

const routes: Routes = [
    {
        path     : 'index',
        component: ProfileComponent,
        resolve  : {
            todo: ProfileService
        }
    },

    {
        path      : '**',
        redirectTo: 'index',
        pathMatch: 'full'
    }
   
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,

    NgxDnDModule,

    FuseSharedModule,
    FuseSidebarModule,
    MatTabsModule
    
  ],
  declarations: [
      ProfileComponent,
      ProfileSidebarComponent,
      ProfileDetailsComponent,
  ],
  providers   : [
    ProfileService
  ]
})

export class ProfileModule { }
