import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { BoletosService } from 'src/app/services/boletos.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from "../../helpers/data";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  private boleto;
  private categorias;

  constructor(
    private navController: NavController,
    private categoriaService: CategoriaService,
    private boletoService : BoletosService,
    private toastController:ToastController,
    private loadingController : LoadingController,
    private activatedRoute : ActivatedRoute,
    private DataHelper : Data
  ) {
    this.boleto = {
      descricao : null,
      valor : null,
      categoria : [],
      dataVencimento : null
    }
   }

  async ngOnInit() {
    this.listarCategorias();

    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    if(id){
      const loading = await this.loadingController.create({message:'Carregando'});
      loading.present();
      this.boletoService.getBoleto(id).subscribe((data) =>{
        this.boleto = data;
        loading.dismiss();
      })
    }
  }

  ValidateInputs(){
    var error = false;
    if (this.boleto.descricao == null || this.boleto.valor == undefined)
    {
      this.presentToast('Insira a Descrição!');
      return error = true;
    }

    if(this.boleto.valor == null || this.boleto.valor == undefined)
    {
      this.presentToast('Insira o Valor!');
      return error = true;
    }

    if(this.boleto.dataVencimento == null)
    {
      this.presentToast('Insira a data!');
      return error = true;
    }

    if(this.boleto.categoria == null)
    {
      this.presentToast('Informe a categoria!');
      return error = true;
    }

    return error;
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  ClearInputsFields(){
    this.boleto.descricao = null;
    this.boleto.valor = null;
    this.boleto.categoria = null;
  }
  async salvar(){
    
    if (!this.ValidateInputs()){
      let loading = await this.loadingController.create({message: 'Registrando...'});
      loading.present();
      this.boleto.dataVencimento = this.DataHelper.formatDate(this.boleto.dataVencimento);
      this.boletoService
      .salvar(this.boleto)
      .subscribe(() => {
        loading.dismiss();
        this.presentToast('Boleto registrado com sucesso!');
        this.ClearInputsFields();
        this.navController.navigateForward(['/status']);
      });
    } 
  }
  listarCategorias(){
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }
}
