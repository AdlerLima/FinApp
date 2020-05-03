import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
//import {HomePage} from './home.page'
import { HomePage } from '../home/home.page';
import { LancamentosService } from '../services/lancamentos.service';
import { LancamentosPage } from "../lancamentos/lancamentos.page";
import { Lancamento } from '../models/lancamento.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DespesasService } from '../services/despesas.service';


@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.page.html',
  styleUrls: ['./ambiente.page.scss'],
})
export class AmbientePage implements OnInit {
  public saldo:number;

  usuario:HomePage[];
  lancamento;
  despesas;

  constructor(
    private router:Router,
    private navController:NavController,
    private lancamentoService: LancamentosService,
    private despesasService: DespesasService
  ) { }

  ngOnInit() {
    this.saldo = 50;
  }
  listarlancamentos()
  {
    this.lancamentoService.getAll().subscribe((data) => {
    this.lancamento = data;
  });
  }
  listardespesas(){
  this.despesasService.getAll().subscribe((data) => {
    this.despesas = data;
  });
  }
  ionViewWillEnter()
  {
    this.listarlancamentos();
    this.listardespesas();

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
