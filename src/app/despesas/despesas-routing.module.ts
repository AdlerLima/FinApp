import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespesasPage } from './despesas.page';

const routes: Routes = [
  {
    path: '',
    component: DespesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesasPageRoutingModule {}
