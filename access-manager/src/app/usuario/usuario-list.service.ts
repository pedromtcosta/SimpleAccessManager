import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../shared/base-list.component';
import { IUsuario } from './usuario.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: '../shared/base-list.component.html',
  styles: []
})
export class UsuarioListComponent extends BaseListComponent<IUsuario> implements OnInit {
  get header(): string[] {
    return ['Nome']
  }
  get props(): string[] {
    return ['nome']
  }
  get title(): string {
    return 'Usuários cadastrados'
  }
  get editLink(): string {
    return '/usuario/'
  }

  constructor(route: ActivatedRoute) {
    super(route)
  }

  ngOnInit() {
    super.ngOnInit()
  }

}
