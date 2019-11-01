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
import { ProviderPaymentService } from 'app/main/apps/payment/provider-payment.service';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentListComponent } from 'app/main/apps/payment/payment-list/payment-list.component';
import { PaymentListItemComponent } from './payment-list/payment-list-item/payment-list-item.component';

import { ProviderPaymentListComponent } from './provider-payment-list/provider-payment-list.component';
import { ProviderPaymentDetailsComponent } from './provider-payment-details/provider-payment-details.component';
import { ProviderPaymentListItemComponent } from './provider-payment-list/provider-payment-list-item/provider-payment-list-item.component';

import { ProviderDialogModule } from './provider-dialogs/provider-dialogs.module';

const routes: Routes = [
    {
        path     : 'manager',
        component: PaymentComponent,
        resolve  : {
            manager: PaymentService
        }
    },
    {
        path     : 'provider',
        component: PaymentComponent,
        resolve  : {
            provider: ProviderPaymentService
        }
    },
    {
        path        : 'dialogs',
        loadChildren: 'app/main/apps/payment/provider-dialogs/provider-dialogs.module#ProviderDialogModule'
    },
    {
        path      : '**',
        redirectTo: 'provider',
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
      PaymentComponent,
      PaymentDetailsComponent,
      PaymentListComponent,
      PaymentListItemComponent,
      ProviderPaymentListComponent,
      ProviderPaymentDetailsComponent,
      ProviderPaymentListItemComponent,

  ],
  providers   : [
    PaymentService,
    ProviderPaymentService
  ]
})

export class PaymentModule { }
