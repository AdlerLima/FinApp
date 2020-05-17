import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { DespesasService } from '../services/despesas.service';
import { Despesa } from "../models/despesa.interface";
import { CategoriaService } from '../services/categoria.service';



@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
})
export class DespesasPage implements OnInit {
  
  private despesa : Despesa;
  private categorias;

  constructor(
    private navController: NavController,
    private despesasService: DespesasService,
    private categoriaService: CategoriaService,
    private toastController: ToastController,
    private loadingController : LoadingController
  ) {
    this.despesa = {
      descricao : null,
      valor : null,
      dataLancamento : null,
      categoria : [],
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
    this.listarCategorias();
  }

  listarCategorias(){
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
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

    if (this.despesa.categoria == null){
      this.presentToast('Informe a categoria!');
      return error = true;
    }

    return error;
  }

  ClearInputsFields(){
    this.despesa.descricao = null;
    this.despesa.valor = null;
    this.despesa.dataLancamento = null;
    this.despesa.categoria = null;
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
