import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

    lancamento: Lancamento[] = [
    { id:1, descricao:'Teste' ,valor: 100},
    { id:2, descricao:'Teste2', valor: 50 }
  ];

  constructor() { }

  getLancamento()
  {
    return this.lancamento;
  }
  adicionar(lancamento:Lancamento){
    lancamento.id = parseInt((Math.random() * 100).toFixed(0));
    this.lancamento = [...this.lancamento,lancamento];
    console.log(this.lancamento);
  }
}
