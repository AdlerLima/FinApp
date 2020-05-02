import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespesasPageRoutingModule } from './despesas-routing.module';

import { DespesasPage } from './despesas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespesasPageRoutingModule
  ],
  declarations: [DespesasPage]
})
export class DespesasPageModule {}
