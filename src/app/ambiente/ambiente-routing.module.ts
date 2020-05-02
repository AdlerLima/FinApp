import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbientePage } from './ambiente.page';

const routes: Routes = [
  {
    path: '',
    component: AmbientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbientePageRoutingModule {}
