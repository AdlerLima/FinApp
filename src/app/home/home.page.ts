import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 

  constructor(private router: Router,
              private loadingController:LoadingController,
              private navController:NavController) {
    
  }
  navegar() {
    this.navController.navigateForward(['formulario'])
  }
  entrar(){
    this.navController.navigateForward(["ambiente"])
  }
  showLoading() {
    this.loadingController
      .create({
        message: 'Um momento...',
        spinner: "crescent"
      })
      .then((loading) => {
        loading.present();
        setTimeout(() => loading.dismiss(), 2000);
      });
  }

}
