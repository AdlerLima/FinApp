import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbientePageRoutingModule } from './ambiente-routing.module';

import { AmbientePage } from './ambiente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbientePageRoutingModule
  ],
  declarations: [AmbientePage]
})
export class AmbientePageModule {}
