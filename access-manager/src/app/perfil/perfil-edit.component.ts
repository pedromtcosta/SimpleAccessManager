import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IPerfil } from './perfil.model';
import { IPermissao } from '../shared/permissao.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ISistema } from '../sistema/sistema.model';
import { BaseEditComponent } from '../shared/base-edit.component';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './perfil-edit.component.html',
  styles: []
})
export class PerfilEditComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup
  perfil: IPerfil
  sistemas: IPermissao[]

  constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    super()
    const messages = {
      nome: {
        required: 'Nome do perfil obrigatório'
      }
    }
    this.genericValidator = new GenericValidator(messages)
  }

  ngAfterViewInit() {
    super.ngAfterViewInit()
  }

  salvar(): void {
    const p = <IPerfil>Object.assign({}, this.perfil, this.formGroup.value)
    p.ativo = true
    p.sistemas = this.sistemas

    console.log(p)

    if (p.id === 0) {
      this.http.post('api/perfil', p)
        .subscribe(() => this.router.navigate(['/perfil']))
    } else {
      this.http.put('api/perfil', p)
        .subscribe(() => this.router.navigate(['/perfil']))
    }
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [0],
      nome: ['', Validators.required]
    })

    this.route.params.subscribe(params => {
      const id = +params['id']

      this.http.get(`api/perfil/${id}/sistemas`)
            .subscribe(r => {
                this.sistemas = <IPermissao[]>r.json()
            })

      if (id !== 0) {
        this.http.get(`api/perfil/${id}`)
            .subscribe(s => {
              this.perfil = <IPerfil>s.json()
              this.formGroup.patchValue({
                id: this.perfil.id,
                nome: this.perfil.nome
              })
            })
      }
    })
  }

}
