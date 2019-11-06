import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {MatTreeModule} from '@angular/material/tree';

import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { MatSidenavModule, MatListModule,  MatRadioModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatCardModule} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { HorseProviderService } from 'app/main/apps/horse-provider/horse-provider.service';
import { HorseProviderComponent } from './horse-provider.component';
import { HorseProviderListComponent } from './horse-provider-list/horse-provider-list.component';
import { HorseProviderDetailsComponent } from './horse-provider-details/horse-provider-details.component';
import { HorseProviderListItemComponent } from './horse-provider-list/horse-provider-list-item/horse-provider-list-item.component';
import { HorseProviderPrivateComponent} from './horse-provider-private/horse-provider-private.component';
import { HorseProviderInvoiceComponent } from './horse-provider-invoice/horse-provider-invoice.component';
import { HorseProviderConfirmComponent } from './horse-provider-confirm/horse-provider-confirm.component';

const routes: Routes = [
    {
        path     : 'list',
        component: HorseProviderComponent,
        resolve  : {
            provider: HorseProviderService
        }
    },
    {
        path     : 'list/:providerId',
        component: HorseProviderComponent,
        resolve  : {
            provider: HorseProviderService
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

    NgxDnDModule,
    FuseSharedModule,
    FuseSidebarModule,

    MatTreeModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,   
    MatSidenavModule,
    MatListModule,  
    MatRadioModule, 
    MatGridListModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatCardModule,
    MatSelectModule
  ],
  declarations: [
      HorseProviderComponent,
      HorseProviderListComponent,
      HorseProviderDetailsComponent,
      HorseProviderListItemComponent,
      HorseProviderPrivateComponent,
      HorseProviderInvoiceComponent,
      HorseProviderConfirmComponent,
  ],
  providers   : [
    HorseProviderService
  ]
})

export class HorseProviderModule { }
