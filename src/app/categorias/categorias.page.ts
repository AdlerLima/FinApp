import { Component, OnInit } from '@angular/core';
import { Categoria } from './categorias.model';
import { CategoriaService } from './categorias.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  private categorias: Categoria[];

  constructor(
    private categoriaService: CategoriaService,
    private toastController: ToastController,
    private navController: NavController
  ) {
    this.categorias= categoriaService.getCategorias();
   }

  ngOnInit() {
  }
  concluir(categoria: Categoria) {
    this.categoriaService.concluir(categoria);
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
    this.navController.navigateForward(['/ambiente'])
  }
}
