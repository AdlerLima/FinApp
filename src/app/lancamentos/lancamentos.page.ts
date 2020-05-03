import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { AmbientePage } from '../ambiente/ambiente.page';
import { LancamentosService } from '../services/lancamentos.service';



@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.page.html',
  styleUrls: ['./lancamentos.page.scss'],
})
export class LancamentosPage implements OnInit {

  private lancamento;


  constructor(
    private navController: NavController,
    private lancamentoService: LancamentosService
  ) { 
    
    this.lancamento = this.lancamentoService.getLancamento();
    console.log(this.lancamento);
    }
  

  ngOnInit() {
    
  }
  ambiente() {
    this.navController.navigateForward(['/ambiente'])
  }
  
  salvar(){
    //console.log(this.lancamento);
    this.lancamentoService.adicionar(this.lancamento);
    this.navController.navigateForward(['/ambiente'])
  }
  

}
