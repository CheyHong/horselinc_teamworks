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

import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

const routes: Routes = [
    {
        path     : 'create',
        component: CreateDialogComponent,
    },

    {
        path     : 'edit',
        component: EditDialogComponent,
    },

    {
        path      : '**',
        redirectTo: 'edit',
        pathMatch: 'full'
    }
   
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),

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
      CreateDialogComponent,
      EditDialogComponent,
    ],

  exports: [
    CreateDialogComponent,
    EditDialogComponent
  ]
})
export class ProviderDialogModule { }
