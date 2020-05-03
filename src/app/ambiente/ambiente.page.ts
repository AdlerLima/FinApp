import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
//import {HomePage} from './home.page'
import { HomePage } from '../home/home.page';
import { LancamentosService } from '../services/lancamentos.service';
import { LancamentosPage } from "../lancamentos/lancamentos.page";


@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.page.html',
  styleUrls: ['./ambiente.page.scss'],
})
export class AmbientePage implements OnInit {
  public saldo:number;
  lancamento : Lancamento[];

  usuario:HomePage[];

  constructor(
    private router:Router,
    private navController:NavController,
    private lancamentoService: LancamentosService
  ) { }

  ngOnInit() {
    this.saldo = 1000;
    this.lancamento = this.lancamentoService.getLancamento();
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

  // calculoSaldo(){
  //   this.saldo = 10;
  // }
}
