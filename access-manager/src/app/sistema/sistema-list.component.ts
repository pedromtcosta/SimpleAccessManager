import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../shared/base-list.component';
import { ISistema } from './sistema.model';

@Component({
  templateUrl: '../shared/base-list.component.html',
  styles: []
})
export class SistemaListComponent extends BaseListComponent<ISistema> implements OnInit {
  get header(): string[] {
    return ['Nome', 'Descrição']
  }
  get props(): string[] {
    return ['nome', 'descricao']
  }

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
