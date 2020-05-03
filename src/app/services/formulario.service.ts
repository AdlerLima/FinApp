import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario} from '../models/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private URI = 'http://localhost:3000/usuarios';

  constructor(
    private httpClient : HttpClient
  ) { }

  
  adicionar(usuario: Usuario) {
    return this.httpClient.post<Usuario>(this.URI, usuario);
  }

  atualizar(usuario: Usuario) {
    return this.httpClient.put<Usuario>(`${this.URI}/${usuario.id}`, usuario);
  }

  excluir(usuario: Usuario) {
    return this.httpClient.delete(`${this.URI}/${usuario.id}`);
  }

  getUsuario(id: number) {
    return this.httpClient.get<Usuario>(`${this.URI}/${id}`);
  }

  Login(usuario: Usuario){
    return this.httpClient.get<Usuario>(`${this.URI}?usuario=${usuario.usuario}&senha=${usuario.senha}`);
  }

  salvar(usuario: Usuario) {
    if (usuario && usuario.id) {
      return this.atualizar(usuario);
    } else {
      return this.adicionar(usuario);
    }
  }
}
