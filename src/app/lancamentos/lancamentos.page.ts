import { Component, OnInit } from '@angular/core'
import { NavController, ToastController, LoadingController } from '@ionic/angular'
import { LancamentosService } from '../services/lancamentos.service';
import { CategoriaService } from '../services/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from "../helpers/data";

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.page.html',
  styleUrls: ['./lancamentos.page.scss'],
})
export class LancamentosPage implements OnInit {

  private lancamento;
  private categorias;

  constructor(
    private navController: NavController,
    private lancamentoService: LancamentosService,
    private categoriaService: CategoriaService,
    private toastController:ToastController,
    private loadingController : LoadingController,
    private activatedRoute : ActivatedRoute,
    private DataHelper : Data
  ) { 
    
    this.lancamento = {
      descricao : null,
      valor : null,
      dataLancamento : new Date(),
      categoria : [],
      tipo : 0,
      cor : "success"
    }
    }

 async ngOnInit() {
    this.listarCategorias();

    const id = this.activatedRoute.snapshot.params['id'];
    if(id){
      const loading = await this.loadingController.create({message:'Carregando'});
      loading.present();
      this.lancamentoService.getLancamento(id).subscribe((data) =>{
        this.lancamento = data;
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
    if (this.lancamento.descricao == null || this.lancamento.descricao == undefined)
    {
      this.presentToast('Insira a Descrição!', 'warning');
      return error = true;
    }

    if(this.lancamento.valor == null || this.lancamento.valor == undefined)
    {
      this.presentToast('Insira o Valor!', 'warning');
      return error = true;
    }

    if(this.lancamento.dataLancamento == null)
    {
      this.presentToast('Insira a data!', 'warning');
      return error = true;
    }

    if(this.lancamento.categoria == null)
    {
      this.presentToast('Informe a categoria!', 'warning');
      return error = true;
    }

    return error;
  }

  ambiente() {
    this.navController.navigateForward(['/ambiente'])
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

  ClearInputsFields(){
    this.lancamento.descricao = null;
    this.lancamento.valor = null;
    this.lancamento.categoria = null;
  }

  
  async salvar(){
    if (!this.ValidateInputs()){
      let loading = await this.loadingController.create({message: 'Registrando...'});
      loading.present();
      // this.lancamento.dataLancamento = this.DataHelper.formatDate(this.lancamento.dataLancamento);
      
      this.lancamentoService
      .salvar(this.lancamento)
      .subscribe(() => {
        loading.dismiss();
        this.presentToast('Lançamento registrado com sucesso!', 'success');
        this.ClearInputsFields();
        this.navController.navigateForward(['/ambiente']);
      }, () => {
        loading.dismiss();
        this.presentToast('Ops, ocorreu um erro!', "danger");
        this.ClearInputsFields();
        this.navController.navigateForward(['/ambiente']);
      });
    } 
  }
}
  

