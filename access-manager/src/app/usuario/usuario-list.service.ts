import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../shared/base-list.component';
import { IUsuario } from './usuario.model';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  templateUrl: '../shared/base-list.component.html',
  styles: []
})
export class UsuarioListComponent extends BaseListComponent<IUsuario> implements OnInit {
  get header(): string[] {
    return ['Nome', 'E-mail', 'CPF', 'Telefone']
  }
  get props(): string[] {
    return ['nome', 'email', 'cpf', 'telefone']
  }
  get title(): string {
    return 'Usuários cadastrados'
  }
  get editLink(): string {
    return '/usuario/'
  }

  constructor(route: ActivatedRoute, http: Http) {
    super(route, http)
  }

  ngOnInit() {
    super.ngOnInit()
  }

}
