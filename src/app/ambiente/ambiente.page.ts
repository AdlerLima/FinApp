import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.page.html',
  styleUrls: ['./ambiente.page.scss'],
})
export class AmbientePage implements OnInit {
  public saldo:number;

  constructor(
    private router:Router,
    private navController:NavController
  ) { }

  ngOnInit() {
    this.saldo = 1000;
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
