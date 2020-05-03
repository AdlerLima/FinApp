import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DespesasService } from '../services/despesas.service';



@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
})
export class DespesasPage implements OnInit {
  
  private despesa;

  constructor(
    private navController: NavController,
    private despesasService: DespesasService
  ) {
    this.despesa = this.despesasService.getDespesa();
    //console.log(this.despesa);
   }

  ngOnInit() {
  }
  ambiente() {
    this.navController.navigateForward(['/ambiente'])
  }
  salvar(){
    this.despesasService.adicionar(this.despesa);
    this.navController.navigateForward(['/ambiente'])
  }
}
