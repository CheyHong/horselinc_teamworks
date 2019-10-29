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

import { PaymentComponent } from './payment.component';
import { PaymentService } from 'app/main/apps/payment/payment.service';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentListComponent } from 'app/main/apps/payment/payment-list/payment-list.component';
import { PaymentListItemComponent } from './payment-list/payment-list-item/payment-list-item.component';

const routes: Routes = [
    {
        path     : 'all',
        component: PaymentComponent,
        resolve  : {
            todo: PaymentService
        }
    },

    {
        path      : '**',
        redirectTo: 'all'
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
      PaymentComponent,
      PaymentDetailsComponent,
      PaymentListComponent,
      PaymentListItemComponent
  ],
  providers   : [
    PaymentService
  ]
})

export class PaymentModule { }
