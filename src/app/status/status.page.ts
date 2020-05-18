import { Component, OnInit } from '@angular/core';
import { BoletosService } from '../services/boletos.service';
import { Boletos } from '../models/boletos.interface';
import { AlertController, LoadingController } from '@ionic/angular';
import { Data } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {
  boleto : Boletos;

  constructor(
    private boletosService : BoletosService,
    private alertController: AlertController,
    private loadingController: LoadingController,

  ) { }

  ngOnInit() {
    this.listarBoletos();
  }
  listarBoletos(){
    this.boletosService.getAll().subscribe((data) =>{
      this.boleto = data;
    })
  }
  ionViewWillEnter()
  {
    this.listarBoletos();

  }
  async confirmarExclusao(boletos: Boletos) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(boletos);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }
  private async excluir(boletos: Boletos) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.boletosService.excluir(boletos).subscribe(() => {
      this.ionViewWillEnter()
      busyLoader.dismiss();
    });
  }
}
