import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaPageRoutingModule } from './categoria-routing.module';

import { CategoriaPage } from './categoria.page';
import { Routes,RouterModule } from '@angular/router';

// const routes: Routes = [
//   {
//     // path='',
//     component: CategoriaPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPageRoutingModule,
    // RouterModule.forChild(routes)
  ],
  declarations: [CategoriaPage]
})
export class CategoriaPageModule {}
