import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {
  
  despesas: Despesa[]= [
    {id: 1, descricao: 'Despesa 1', valor: 150},
    {id: 2, descricao: 'Despesa 2', valor: 200}
  ];

  constructor() { }

  getDespesa()
  {
    return this.despesas;
  }
  adicionar(despesas:Despesa){
    despesas.id = parseInt((Math.random() * 100).toFixed(0));
    this.despesas = [...this.despesas,despesas]
    console.log(this.despesas);
  }
}
