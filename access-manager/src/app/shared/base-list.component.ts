import { Component, OnInit } from '@angular/core';

export abstract class BaseListComponent<T> implements OnInit {

  abstract get header(): string[]
  abstract get props(): string[]

  list: T[]

  constructor() { }

  ngOnInit() {
  }

}
