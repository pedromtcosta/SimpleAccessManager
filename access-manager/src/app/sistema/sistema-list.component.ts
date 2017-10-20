import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../shared/base-list.component';
import { ISistema } from './sistema.model';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

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
  get title(): string {
    return 'Sistemas cadastrados'
  }
  get editLink(): string {
    return '/sistema/'
  }

  constructor(route: ActivatedRoute, http: Http) {
    super(route, http)
  }

  ngOnInit() {
    super.ngOnInit()
  }

}
