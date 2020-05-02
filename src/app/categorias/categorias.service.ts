import { Injectable } from '@angular/core';
import { Categoria } from './categorias.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  
  private categorias: Categoria[];

  constructor() {
    this.categorias = [ 
      new Categoria('Mercado'),
      new Categoria('Farmacia'),
      new Categoria('Lazer'),
      new Categoria('Restaurante')

    ];
  }

  getCategorias() {
    return this.categorias;
  }

  salvar(categorias: Categoria) {
    this.categorias.push(categorias);
  }

  concluir(categorias :Categoria) {
   let categoriaEncontrada = this.categorias.find(c => c.id === categorias.id);
   categoriaEncontrada.concluida = true;
}
 

}
