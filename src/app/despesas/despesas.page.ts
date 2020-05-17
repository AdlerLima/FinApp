import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { DespesasService } from '../services/despesas.service';
import { Despesa } from "../models/despesa.interface";
import { CategoriaService } from '../services/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from "../helpers/data";



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
    private loadingController : LoadingController,
    private activatedRoute : ActivatedRoute,
    private DataHelper : Data
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

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      color: color,
      duration: 2000
    });
    toast.present();
  } 

  async ngOnInit() {
    this.listarCategorias();
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    if(id){
      const loading = await this.loadingController.create({message:'Carregando'});
      loading.present();
      this.despesasService.getDespesa(id).subscribe((data) =>{
        this.despesa = data;
        loading.dismiss();
      })
    }
  }

  listarCategorias(){
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  ValidateInputs(){
    var error = false;
    if (this.despesa.descricao == null){
      this.presentToast('Insira a descrição!', 'warning');
      return error = true;
    }

    if (this.despesa.valor == null){
      this.presentToast('Insira o valor!',  'warning');
      return error = true;
    }

    if (this.despesa.dataLancamento == null){
      this.presentToast('Insira a data!',  'warning');
      return error = true;
    }

    if (this.despesa.categoria == null){
      this.presentToast('Informe a categoria!',  'warning');
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
      this.despesa.dataLancamento = this.DataHelper.formatDate(this.despesa.dataLancamento);
      this.despesasService
      .salvar(this.despesa)
      .subscribe(() => {
        loading.dismiss();
        this.presentToast('Despesa registrada com sucesso!',  'success');
        this.ClearInputsFields();
        this.navController.navigateForward(['/ambiente']);
      });
    }    
  }
}
