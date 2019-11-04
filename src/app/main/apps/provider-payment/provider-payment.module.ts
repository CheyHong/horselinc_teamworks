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

import { ProviderPaymentService } from 'app/main/apps/provider-payment/provider-payment.service';
import { ProviderPaymentComponent } from './provider-payment.component';
import { ProviderPaymentListComponent } from './provider-payment-list/provider-payment-list.component';
import { ProviderPaymentDetailsComponent } from './provider-payment-details/provider-payment-details.component';
import { ProviderPaymentListItemComponent } from './provider-payment-list/provider-payment-list-item/provider-payment-list-item.component';

import {CreateDialogComponent} from './provider-dialogs/create-dialog/create-dialog.component';
import {EditDialogComponent} from './provider-dialogs/edit-dialog/edit-dialog.component';

const routes: Routes = [
    {
        path     : 'all',
        component: ProviderPaymentComponent,
        resolve  : {
            provider: ProviderPaymentService
        }
    },
    {
        path     : 'all/:providerId',
        component: ProviderPaymentComponent,
        resolve  : {
            provider: ProviderPaymentService
        }
    },
    {
        path      : '**',
        redirectTo: 'all',
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
      ProviderPaymentComponent,
      ProviderPaymentListComponent,
      ProviderPaymentDetailsComponent,
      ProviderPaymentListItemComponent,
      CreateDialogComponent,
      EditDialogComponent

  ],
  providers   : [
    ProviderPaymentService
  ]
})

export class ProviderPaymentModule { }
