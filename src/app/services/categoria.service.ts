import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../categorias/categorias.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private URI = 'http://localhost:3000/categoria';
  constructor(
    private httpCliente : HttpClient
  ) {  }

  adicionar(categoria : Categoria){
    return this.httpCliente.post<Categoria>(this.URI,categoria);
  }
  atualizar(categoria : Categoria){
    return this.httpCliente.put<Categoria>(`${this.URI}/${categoria.id}`,categoria);
  }
  excluir(categoria : Categoria){
    return this.httpCliente.delete(`${this.URI}/${categoria.id}`);
  }
  getCategoria(id: number){
    return this.httpCliente.get<Categoria>(`${this.URI}/${id}`);
  }
  salvar(categoria : Categoria){
    if (categoria && categoria.id)
    {
      return this.atualizar(categoria);
    } else {
      return this.adicionar(categoria);
    }
  }
}
