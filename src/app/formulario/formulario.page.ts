import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { Usuario } from '../models/usuario.interface';
import { FormularioService } from '../services/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  private usuario : Usuario;

  constructor(private router:Router,
              private navController: NavController,
              private toastController: ToastController,
              private UsuarioService: FormularioService,
              private loadingController : LoadingController
              ){ 
                this.usuario = {
                  nome : null,
                  email : null,
                  usuario: null,
                  sexo : null,
                  nascimento : null,
                  senha : null
                }
  }
  
  voltar() {
    this.navController.navigateForward(['/home'])
  }
  showToast() {
    this.toastController
      .create({
        message: 'TERMOS DE SERVIÇO <br> VISÃO GERAL <br> Esse site é operado pelo FinApp. Em todo o site, os termos “nós”, “nos” e “nosso” se referem ao FinApp. O FinApp proporciona esse site, incluindo todas as informações, ferramentas e serviços disponíveis deste site para você, o usuário, com a condição da sua aceitação de todos os termos, condições, políticas e avisos declarados aqui. <br> ',
        duration: 50000,
        color: "dark",
        showCloseButton: true,
        closeButtonText: 'X',
        position: 'middle'
      })
      .then(toast => toast.present());
  }

  ValidateInputs(){
    var error = false;
    if (this.usuario.nome == null || this.usuario.nome == undefined){
      this.presentToast('Insira o nome!');
      return error = true;
    }

    if (this.usuario.usuario == null){
      this.presentToast('Insira o usuário!');
      return error = true;
    }

    if (this.usuario.senha == null){
      this.presentToast('Insira a senha!');
      return error = true;
    }

    if (this.usuario.email == null){
      this.presentToast('Insira o e-mail!');
      return error = true;
    }

    if (this.usuario.nascimento == null){
      this.presentToast('Insira a data de nascimento!');
      return error = true;
    }

    if (this.usuario.sexo == null){
      this.presentToast('Selecione o sexo!');
      return error = true;
    }

    return error;
  }

  ClearInputsFields(){
    this.usuario.nome = null;
    this.usuario.usuario = null;
    this.usuario.senha = null;
    this.usuario.email = null;
    this.usuario.nascimento = null;
    this.usuario.senha = null;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async salvar(){
    if (!this.ValidateInputs()){
      let loading = await this.loadingController.create({message: 'Registrando...'});
      loading.present();
  
      this.UsuarioService
      .salvar(this.usuario)
      .subscribe(() => {
        loading.dismiss();
        this.presentToast('Usuário registrado com sucesso!');
        this.ClearInputsFields();
        this.navController.navigateForward(['/home']);
      });
    }

    
  }
   
  ngOnInit() {
  }

}
