import { Component, OnInit } from '@angular/core'
import { NavController, ToastController, LoadingController } from '@ionic/angular'
import { LancamentosService } from '../services/lancamentos.service';
import { CategoriaService } from '../services/categoria.service';
import { ActivatedRoute } from '@angular/router';




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
    private activatedRoute : ActivatedRoute
  ) { 
    
    this.lancamento = {
      descricao : null,
      valor : null,
      dataLancamento : null,
      categoria : [],
      tipo : 0,
      cor : "success"
    }
    }  

 async ngOnInit() {
    this.listarCategorias();

    const id = parseInt(this.activatedRoute.snapshot.params['id']);
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
    if (this.lancamento.descricao == null || this.lancamento.valor == undefined)
    {
      this.presentToast('Insira a Descrição!');
      return error = true;
    }

    if(this.lancamento.valor == null || this.lancamento.valor == undefined)
    {
      this.presentToast('Insira o Valor!');
      return error = true;
    }

    if(this.lancamento.dataLancamento == null)
    {
      this.presentToast('Insira a data!');
      return error = true;
    }

    if(this.lancamento.categoria == null)
    {
      this.presentToast('Informe a categoria!');
      return error = true;
    }

    return error;
  }

  ambiente() {
    this.navController.navigateForward(['/ambiente'])
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      color: 'success',
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
  
      this.lancamentoService
      .salvar(this.lancamento)
      .subscribe(() => {
        loading.dismiss();
        this.presentToast('Lançamento registrado com sucesso!');
        this.ClearInputsFields();
        this.navController.navigateForward(['/ambiente']);
      });
    } 
  }
}
  

