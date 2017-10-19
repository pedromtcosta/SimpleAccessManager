import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { ISistema } from './sistema.model';

@Component({
  selector: 'app-sistema-edit',
  templateUrl: './sistema-edit.component.html',
  styles: []
})
export class SistemaEditComponent implements OnInit {
  formSistema: FormGroup
  sistema: ISistema

  constructor(private http: Http, private fb: FormBuilder) { }

  salvar(): void {
    const s = <ISistema>Object.assign({}, this.sistema, this.formSistema.value)
    s.ativo = true

    this.http.post('/api/sistema', s)
          .subscribe(() => {  })
  }

  ngOnInit() {
    this.formSistema = this.fb.group({
      nome: [],
      descricao: []
    })
  }

}
