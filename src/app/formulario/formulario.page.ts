import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Formulario } from './formulario.model';
import { FormularioService } from '../formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  private formulario:Formulario;

  constructor(private router:Router,
              private navController: NavController,
              private toastController: ToastController,
              private service: FormularioService
              )
               { }
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
  salvar(){
    this.service.salvar(this.formulario);
    this.formulario = new Formulario();
    this.navController.navigateForward('/home');
  }
  



  
  // termos(){
  //   if (this.concordar=true) {
  //     this.router.navigate(['/home'])
  //   } else {
  //     this.toastController
  //       .create({
  //         message: 'Você deve concordar com os termos de uso',
  //         duration: 5000,
  //         color: "dark",
  //         showCloseButton: true,
  //         closeButtonText: 'X',
  //         position: 'middle'
  //       })
  //   }
  // }

  ngOnInit() {
  }

}
