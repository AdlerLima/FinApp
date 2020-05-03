import { Injectable } from '@angular/core';
import { Despesa } from '../models/despesa.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  
  private URI = 'http://localhost:3000/despesas';

  constructor(
    private httpClient : HttpClient
  ) { }

  
  adicionar(despesa: Despesa) {
    return this.httpClient.post<Despesa>(this.URI, despesa);
  }

  getAll() {
    return this.httpClient.get<Despesa>(`${this.URI}`);
  }

  atualizar(despesa: Despesa) {
    return this.httpClient.put<Despesa>(`${this.URI}/${despesa.id}`, despesa);
  }

  excluir(despesa: Despesa) {
    return this.httpClient.delete(`${this.URI}/${despesa.id}`);
  }

  getDespesa(id: number) {
    return this.httpClient.get<Despesa>(`${this.URI}/${id}`);
  }

  salvar(despesa: Despesa) {
    if (despesa && despesa.id) {
      return this.atualizar(despesa);
    } else {
      return this.adicionar(despesa);
    }
  }
}
