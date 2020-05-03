import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lancamento } from "../models/lancamento.interface";

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  /*  lancamento: Lancamento[] = [
    { id:1, descricao:'Teste' ,valor: 100},
    { id:2, descricao:'Teste2', valor: 50 }
  ];*/

  private URI = 'http://localhost:3000/lancamentos';

  constructor(
    private HttpClient : HttpClient
  ) { }

  getLancamento(id: number)
  {
    return this.HttpClient.get<Lancamento>(`${this.URI}/${id}`);
  }
  getAll()
  {
    return this.HttpClient.get<Lancamento>(`${this.URI}`);

  }
  adicionar(lancamento:Lancamento){
    return this.HttpClient.post<Lancamento>(this.URI, lancamento);
  }
  excluir(lancamento:Lancamento)
  {
    return this.HttpClient.delete<Lancamento>(`${this.URI}/${lancamento.id}`);
  }
  atualizar(lancamento:Lancamento)
  {
    return this.HttpClient.put<Lancamento>(`${this.URI}/${lancamento.id}`,lancamento);
  }
  salvar(lancamento:Lancamento) {
    if (lancamento && lancamento.id) {
      return this.atualizar(lancamento);
    } else {
      return this.adicionar(lancamento);
    }
  }
}
