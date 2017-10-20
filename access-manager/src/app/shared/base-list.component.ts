import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBaseModel } from './base.model';
import { Http } from '@angular/http';

export abstract class BaseListComponent<T extends IBaseModel> implements OnInit {

  abstract get header(): string[]
  abstract get props(): string[]
  abstract get title(): string
  abstract get editLink(): string

  list: T[]

  constructor(protected route: ActivatedRoute, protected http: Http) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.list = data['list'];
    })
  }

  toggleStatus(obj: T) {
    const toPut = <T>Object.assign({}, obj)
    toPut.ativo = !toPut.ativo
    console.log(toPut)
    this.http.put(`api/${this.editLink}`, toPut)
          .subscribe(() => {
            obj.ativo = toPut.ativo
          })
  }

}
