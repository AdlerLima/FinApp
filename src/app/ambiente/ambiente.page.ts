import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
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
  public cor : string;
  visto : boolean; 
  mostrou : boolean; 
  constructor(
    private router:Router,
    private lancamentoService: LancamentosService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private boletosService: BoletosService

  ) { 
    this.visto = false;
  }

  ngOnInit() {
    this.listarlancamentos();
    this.corAmbiente();    
  }

  listarlancamentos(){
    this.lancamentoService.getAll().subscribe((data) => {
      this.lancamento = data; 
      this.saldo = this.getSaldo(data);      
    })
  }
  corAmbiente(){
    if(this.saldo < 0){
      this.cor = "danger"
    }else{
      this.cor = "primary"
    }
    
  }
  getBoletos(){
    if(!this.visto){
    var dNow = new Date();
    var localdate = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear();
    this.boletosService.getAll().subscribe((data) =>{

      this.boletos = data;
      Object.values(data).forEach(value => {
        if(!this.mostrou){
        if (value['lembrar'] == true){
          if(value['dataVencimento'] <= localdate)
            this.alerta();  
            this.visto = true;
            this.mostrou = true
          }
        }
    });
    }) }
    
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
        text: 'NÃO',
        handler:() => {
         this.boletos.lembrar = false
         this.boletosService.atualizar(this.boletos);          
        }
      }]
    });
    alerta.present();
  }

  getSaldo(data : any){
    var entrada = 0;
    var saida = 0;
    
    Object.values(data).forEach(value => {
        if(value['tipo'] == "despesa")
          saida += value['valor'];
        else if(value['tipo'] == "lancamento")
          entrada += value['valor'];      
    });

    return entrada - saida;
  }

  ionViewWillEnter()
  {
    this.listarlancamentos();
    this.getBoletos();
    this.corAmbiente();
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
      this.showToast('Lançamento excluído!', 'danger');
      this.ionViewWillEnter()
      busyLoader.dismiss();
    });
  }

  async showToast(message, color) {
    const toast = await this.toastController.create({
      header: message,
      position: 'top',
      color: color,
      duration: 2000
    });
    toast.present();
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
