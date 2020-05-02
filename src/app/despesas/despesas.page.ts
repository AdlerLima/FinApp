import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
})
export class DespesasPage implements OnInit {
  private valor:number;

  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {
  }
  ambiente() {
    this.navController.navigateForward(['/ambiente'])
  }
  salvar(){
    console.log(this.valor);
    class subtrair{
      valor:number;

      setValor():number{
        return this.valor;
        
      }
    }
    this.navController.navigateForward(['/ambiente'])
  }
 

}
