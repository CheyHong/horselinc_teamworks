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

import { PaymentProviderService } from 'app/main/apps/payment-provider/payment-provider.service';
import { PaymentProviderComponent } from './payment-provider.component';
import { PaymentProviderListComponent } from './payment-provider-list/payment-provider-list.component';
import { PaymentProviderDetailsComponent } from './payment-provider-details/payment-provider-details.component';
import { PaymentProviderListItemComponent } from './payment-provider-list/payment-provider-list-item/payment-provider-list-item.component';

import {CreateDialogComponent} from './provider-dialogs/create-dialog/create-dialog.component';
import {EditDialogComponent} from './provider-dialogs/edit-dialog/edit-dialog.component';

const routes: Routes = [
    {
        path     : 'all',
        component: PaymentProviderComponent,
        resolve  : {
            provider: PaymentProviderService
        }
    },
    {
        path     : 'all/:providerId',
        component: PaymentProviderComponent,
        resolve  : {
            provider: PaymentProviderService
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
      PaymentProviderComponent,
      PaymentProviderListComponent,
      PaymentProviderDetailsComponent,
      PaymentProviderListItemComponent,
      CreateDialogComponent,
      EditDialogComponent

  ],
  providers   : [
    PaymentProviderService
  ]
})

export class PaymentProviderModule { }
