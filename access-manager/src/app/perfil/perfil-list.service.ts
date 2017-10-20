import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../shared/base-list.component';
import { IPerfil } from './perfil.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: '../shared/base-list.component.html',
  styles: []
})
export class PerfilListComponent extends BaseListComponent<IPerfil> implements OnInit {
  get header(): string[] {
    return ['Nome']
  }
  get props(): string[] {
    return ['nome']
  }
  get title(): string {
    return 'Perfis cadastrados'
  }
  get editLink(): string {
    return '/perfil/'
  }

  constructor(route: ActivatedRoute) {
    super(route)
  }

  ngOnInit() {
    super.ngOnInit()
  }

}
