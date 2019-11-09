import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewServiceComponent } from './add-new-service.component';

import { RouterModule, Routes } from '@angular/router';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
      path     : 'home',
      component: AddNewServiceComponent,
  },
  {
      path      : '**',
      redirectTo: 'home',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

    MatInputModule,
    MatButtonModule
  ],
  declarations: [AddNewServiceComponent]
})
export class AddNewServiceModule { }
