import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Boletos } from '../models/boletos.interface';
import { API_URL } from '../config/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {
  private URI = API_URL + 'boleto';

  constructor(
    private httpClient : HttpClient
  ) { }
  getAll(){
    return this.httpClient.get<Boletos>(`${this.URI}`);
  }
  getVencimento(dataVencimento : Date){
    return this.httpClient.get<Boletos>(`${this.URI}/${dataVencimento}`)
  }
  adicionar(boletos : Boletos){
    return this.httpClient.post<Boletos>(this.URI,boletos);
  }
  getBoleto(id:number){
    return this.httpClient.get<Boletos>(`${this.URI}/${id}`);
  }
  atualizar(boletos : Boletos){
    return this.httpClient.put<Boletos>(`${this.URI}/${boletos.id}`,boletos);
  }
  excluir(boletos : Boletos){
    return this.httpClient.delete(`${this.URI}/${boletos.id}`);
  }
  getCategoria(id: number){
    return this.httpClient.get<Boletos>(`${this.URI}/${id}`);
  }
  salvar(boletos : Boletos){
    if (boletos && boletos.id)
    {
      return this.atualizar(boletos);
    } else {
      return this.adicionar(boletos);
    }
  }
}
