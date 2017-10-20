import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export abstract class BaseListComponent<T> implements OnInit {

  abstract get header(): string[]
  abstract get props(): string[]
  abstract get title(): string
  abstract get editLink(): string

  list: T[]

  constructor(protected route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.list = data['list'];
    })
  }

}
