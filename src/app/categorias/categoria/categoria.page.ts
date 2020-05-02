import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categorias.model';
import { CategoriaService } from '../categorias.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  private categoria: Categoria;

  constructor(
    private service : CategoriaService,
    private nav : NavController
  ) {
    this.categoria = new Categoria();
   }

  ngOnInit() {
  }
  salvar(){
    this.service.salvar(this.categoria);
    this.categoria = new Categoria();
    console.log(this.categoria);
    this.nav.navigateForward('/categorias')
  }

}
