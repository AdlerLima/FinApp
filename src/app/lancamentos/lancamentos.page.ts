import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { AmbientePage } from '../ambiente/ambiente.page';



@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.page.html',
  styleUrls: ['./lancamentos.page.scss'],
})
export class LancamentosPage implements OnInit {
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
    class somar{
      valor:number;

      setValor():number{
        return this.valor;
        
      }
    }
    this.navController.navigateForward(['/ambiente'])
  }
  

}
