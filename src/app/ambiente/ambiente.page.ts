import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
//import {HomePage} from './home.page'
import { HomePage } from '../home/home.page';
import { LancamentosService } from '../services/lancamentos.service';
import { LancamentosPage } from "../lancamentos/lancamentos.page";
import { Lancamento } from '../models/lancamento.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DespesasService } from '../services/despesas.service';
import { CategoriaService } from '../services/categoria.service';
import { BoletosService } from '../services/boletos.service';


@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.page.html',
  styleUrls: ['./ambiente.page.scss'],
})
export class AmbientePage implements OnInit {
  public saldo:number;

  usuario:HomePage[];
  lancamento: Lancamento;
  categoria : any
  despesas: any;
  c : any;
  x : number;
  private boletos;
  private dataVencimento;
  
  constructor(
    private router:Router,
    private navController:NavController,
    private lancamentoService: LancamentosService,
    private categoriaService: CategoriaService,
    private despesasService: DespesasService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private boletosService: BoletosService

  ) { }

  ngOnInit() {
    this.listarlancamentos();
    
    //console.log(this.getBoletos());
  }

  listarlancamentos(){
    this.lancamentoService.getAll().subscribe((data) => {
    //   Object.values(data).forEach(value => {
           
    //       this.categoriaService.getCategoria(value['categoria']).subscribe((data) => {
    //        console.log(data.descricao);   
    //        this.c += data.descricao;    
    //       })
    //   })
    //  this.categoria = this.c;
    this.lancamento = data;
    this.saldo = this.getSaldo(data);
    })
  }
  getBoletos(){
    var dNow = new Date();
    var localdate = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
    console.log(localdate);    

    this.boletosService.getAll().subscribe((data) =>{
      this.boletos = data;
      Object.values(data).forEach(value => {
        if(value['dataVencimento'] <= localdate)
          this.alerta();   
    });
    })
    
  }
  async alerta(){
    let alerta = await this.alertController.create({
      header: 'Aviso!',
      message: `A Boletos a vencer deseja ve-los?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.router.navigate(['/status'])    
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  getSaldo(data : any){
    var entrada = 0;
    var saida = 0;
    
    Object.values(data).forEach(value => {
        if(value['tipo'] == 1)
          saida += value['valor'];
        else if(value['tipo'] == 0)
          entrada += value['valor'];        
    });

    return entrada - saida;
  }

  ionViewWillEnter()
  {
    this.listarlancamentos();
    this.getBoletos();

  }

  editar( lancamento : Lancamento){    
    console.log(lancamento.id);
    /*this.x = parseInt(`${lancamento.tipo}?`)    
    if (this.x == 0){*/
      this.router.navigate(['lancamentos']) 
    /*}else if (this.x == 1){
      this.navegarDespesas();
    }*/

    
  }

  async confirmarExclusao(lancamento: Lancamento) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o Lancamento ${lancamento.descricao}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(lancamento);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(lancamento: Lancamento) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.lancamentoService.excluir(lancamento).subscribe(() => {
      this.ionViewWillEnter()
      busyLoader.dismiss();
    });
  }

  navegarLancamentos() {
    this.router.navigate(['lancamentos'])    
  }

  navegarCategorias(){
    this.router.navigate(['categorias'])
  }
  navegarDespesas() {
    this.router.navigate(['despesas'])
    
  }
  navegarLogin(){
    this.router.navigate(['/home'])
  }
  navegarStatus(){
    this.router.navigate(['status'])
  }
}
