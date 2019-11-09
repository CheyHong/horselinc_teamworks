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
import { MatDividerModule } from '@angular/material/divider';

import {MatTabsModule} from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { PaymentManagerComponent } from './payment-manager.component';
import { PaymentManagerService } from 'app/main/apps/payment/payment-manager/payment-manager.service';
import { PaymentManagerDetailsComponent } from './payment-manager-details/payment-manager-details.component';
import { PaymentManagerListComponent } from 'app/main/apps/payment/payment-manager/payment-manager-list/payment-manager-list.component';
import { PaymentManagerListItemComponent } from './payment-manager-list/payment-manager-list-item/payment-manager-list-item.component';
import { ProfileManagerExportInvoiceComponent } from './exportinvoice/exportinvoice.component';

const routes: Routes = [
    {
        path     : 'list',
        component: PaymentManagerComponent,
        resolve  : {
            manager: PaymentManagerService
        }
    },
    {
        path      : '**',
        redirectTo: 'list',
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
    MatDividerModule,

    NgxDnDModule,

    FuseSharedModule,
    FuseSidebarModule,
    MatTabsModule
    
  ],
  declarations: [
      PaymentManagerComponent,
      PaymentManagerDetailsComponent,
      PaymentManagerListComponent,
      PaymentManagerListItemComponent,
      ProfileManagerExportInvoiceComponent
  ],
  providers   : [
    PaymentManagerService
  ]
})

export class PaymentManagerModule { }
