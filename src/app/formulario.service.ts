import { Injectable } from '@angular/core';
import { Formulario } from './formulario/formulario.model';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private formulario: Formulario[];

  constructor() {
    this.formulario = [
    new Formulario('Cadastro 1'),
    new Formulario('Cadastro 2')
  ];
   }

   getFormulario(){
     return this.formulario;
   }
   salvar(formulario: Formulario){
     this.formulario.push(formulario);
   }
   concluir(formulario: Formulario){
      let formularioEncontrado = this.formulario.find(f => f.id === formulario.id)
   }
}
