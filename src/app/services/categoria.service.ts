import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria.interface';
import { API_URL } from '../config/apiconfig';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private URI = API_URL + 'categoria';
  constructor(
    private httpClient : HttpClient
  ) {  }

  getCategorias(){
    return this.httpClient.get<Categoria>(`${this.URI}`);
  }
  adicionar(categoria : Categoria){
    return this.httpClient.post<Categoria>(this.URI,categoria);
  }
  atualizar(categoria : Categoria){
    return this.httpClient.put<Categoria>(`${this.URI}/${categoria.id}`,categoria);
  }
  excluir(categoria : Categoria){
    return this.httpClient.delete(`${this.URI}/${categoria.id}`);
  }
  getCategoria(id: number){
    return this.httpClient.get<Categoria>(`${this.URI}/${id}`);
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
