import { Component, OnInit } from '@angular/core';
import { Categoria } from './../models/categoria.interface';
import { CategoriaService } from '../services/categoria.service';
import { ToastController, NavController, AlertController, LoadingController } from '@ionic/angular';

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
    private navController: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.listarCategorias();
  }

  ionViewWillEnter(){
    this.listarCategorias();
  }

  listarCategorias(){
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  async confirmarExclusao(categoria: Categoria) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a categoria ${categoria.descricao}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(categoria);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(categoria: Categoria) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.categoriaService.excluir(categoria).subscribe(() => {
      this.showToast('Categoria excluída!');
      this.ionViewWillEnter()
      busyLoader.dismiss();
    });
  }
  async showToast(message) {
    const toast = await this.toastController.create({
      header: message,
      position: 'top',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }
  
  ambiente(){
    this.navController.navigateForward(['/categorias'])
  }
  
}
