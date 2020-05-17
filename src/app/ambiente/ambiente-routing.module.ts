import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbientePage } from './ambiente.page';

const routes: Routes = [
  {
    path: '',
    component: AmbientePage
  },
  {
    path: 'lancamentos',
    loadChildren: () => import('../lancamentos/lancamentos.module').then( m => m.LancamentosPageModule)
  },
  {
    path: 'lancamentos/:id',
    loadChildren: () => import('../lancamentos/lancamentos.module').then( m => m.LancamentosPageModule)
  },
  {
    path: 'despesas',
    loadChildren: () => import('../despesas/despesas.module').then( m => m.DespesasPageModule)
  },
  {
    path: 'despesas/:id',
    loadChildren: () => import('../despesas/despesas.module').then( m => m.DespesasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbientePageRoutingModule {}
