import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController , ToastController } from '@ionic/angular';
import { FormularioService } from '../services/formulario.service';
import { Usuario } from '../models/usuario.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  private usuario : Usuario;

  constructor(private router: Router,
              private UsuarioService: FormularioService,
              private toastController: ToastController,
              private loadingController:LoadingController,
              private navController:NavController) {
                this.usuario = {
                  nome : null,
                  email : null,
                  usuario: null,
                  sexo : null,
                  nascimento : null,
                  senha : null
                }
    
  }
  navegar() {
    this.navController.navigateForward(['formulario'])
  }
  entrar(){
    this.UsuarioService.Login(this.usuario).subscribe((data) => {

      if(Object.keys(data).length == 1){
        this.showLoading("ambiente");
      }else{
        this.presentToast("Usuário ou senha inválidos");
      }
      
    }); 

  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  showLoading(pageRoute) {
    this.loadingController
      .create({
        message: 'Um momento...',
        spinner: "crescent"
      })
      .then((loading) => {
        loading.present();
        setTimeout(() => {
          loading.dismiss();
          this.navController.navigateForward([pageRoute]);
        } , 2000);
      });
  }

}
