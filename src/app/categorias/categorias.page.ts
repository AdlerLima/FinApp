import { Component, OnInit } from '@angular/core';
import { Categoria } from './categorias.model';
import { CategoriaService } from '../services/categoria.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  private categoria;

  constructor(
    private categoriaService: CategoriaService,
    private toastController: ToastController,
    private navController: NavController
  ) {
    this.categoria= {
      descricao : null
    }
    
   }

  ngOnInit() {
    //this.listarCategorias();
  }
  listarCategorias(){
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categoria = data;
    });
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
  ionViewWillEnter()
  {
    this.listarCategorias();

  }
}
