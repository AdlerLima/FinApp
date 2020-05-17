import { Component, OnInit } from '@angular/core';
import { Categoria } from './../models/categoria.interface';
import { CategoriaService } from '../services/categoria.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categorias : Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private toastController: ToastController,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.listarCategorias();
  }

  ionViewWillEnter(){
    this.listarCategorias();
  }

  listarCategorias(){
    this.categoriaService.getCategorias().subscribe((data) => {
       console.log(data);
      this.categorias = data;
    });
    console.log("tesesss");
  }
  
  deletar() {
    this.toastController
      .create({
        message: 'Categoria Deletada',
        duration: 900,
        color: "warning",
        showCloseButton: true,
        closeButtonText: 'X',
        position: 'bottom'
      })
      .then(toast => toast.present());
  }

  ambiente(){
    this.navController.navigateForward(['/categorias'])
  }
  
}
