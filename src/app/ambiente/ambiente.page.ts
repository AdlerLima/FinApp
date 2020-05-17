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

  constructor(
    private router:Router,
    private lancamentoService: LancamentosService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,

  ) { }

  ngOnInit() {
    this.listarlancamentos();
  }

  listarlancamentos(){
    this.lancamentoService.getAll().subscribe((data) => {
      this.lancamento = data;
      this.saldo = this.getSaldo(data);
    })
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

  }

  async confirmarExclusao(lancamento: Lancamento) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o lançamento ${lancamento.descricao}?`,
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
