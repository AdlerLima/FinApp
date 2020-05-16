import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categorias.model';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  private categoria;

  constructor(
    private categoriaService : CategoriaService,
    private navController: NavController,
    private toastController : ToastController,
    private loadingController : LoadingController
    
  ) {
    this.categoria = {
      descricao : null
    }
   }

  ngOnInit() {
  }
  ValidadeInputs(){
    var error = false;
    if (this.categoria.descricao == null)
    {
      this.presentToast('Insira a descrição!');
      return error = true;
    }
    return error;
  }
  ClearInputsFields(){
    this.categoria.descricao = null;
    this.categoria.valor = null;
  }
  async salvar(){
   /*this.service.salvar(this.categoria);
    this.categoria = new Categoria();
    console.log(this.categoria);
    this.nav.navigateForward('/categorias')*/
    if (!this.ValidadeInputs()){
      let loading = await this.loadingController.create({message : 'Registrando...'});
      loading.present();
      
      this.categoriaService
      .salvar(this.categoria)
      .subscribe(() => {
        loading.dismiss();
        this.presentToast('Lançamento registrado com sucesso!');
        this.ClearInputsFields();
        this.navController.navigateForward(['/ambiente']);
        
      })
    }
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
