import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { DespesasService } from '../services/despesas.service';
import { Despesa } from "../models/despesa.interface";



@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
})
export class DespesasPage implements OnInit {
  
  private despesa : Despesa;

  constructor(
    private navController: NavController,
    private despesasService: DespesasService,
    private toastController: ToastController,
    private loadingController : LoadingController
  ) {
    this.despesa = {
      descricao : null,
      valor : null,
      dataLancamento : null,
      tipo : 1,
      cor : "danger"
    }
   }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  } 

  ngOnInit() {
  }

  ValidateInputs(){
    var error = false;
    if (this.despesa.descricao == null){
      this.presentToast('Insira a descrição!');
      return error = true;
    }

    if (this.despesa.valor == null){
      this.presentToast('Insira o valor!');
      return error = true;
    }

    if (this.despesa.dataLancamento == null){
      this.presentToast('Insira a data!');
      return error = true;
    }

    return error;
  }

  ClearInputsFields(){
    this.despesa.descricao = null;
    this.despesa.valor = null;
    this.despesa.dataLancamento = null;
  }

  ambiente() {
    this.navController.navigateForward(['/ambiente'])
  }

  async salvar(){
    if (!this.ValidateInputs()){
      let loading = await this.loadingController.create({message: 'Registrando despesa...'});
      loading.present();
  
      this.despesasService
      .salvar(this.despesa)
      .subscribe(() => {
        loading.dismiss();
        this.presentToast('Despesa registrada com sucesso!');
        this.ClearInputsFields();
        this.navController.navigateForward(['/ambiente']);
      });
    }    
  }
}
