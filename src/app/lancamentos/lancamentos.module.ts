import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LancamentosPageRoutingModule } from './lancamentos-routing.module';
import { LancamentosPage } from './lancamentos.page';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxMaskIonicModule,
    LancamentosPageRoutingModule
  ],
  declarations: [LancamentosPage]
})
export class LancamentosPageModule {}
