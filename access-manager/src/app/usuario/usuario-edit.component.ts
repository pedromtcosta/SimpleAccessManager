import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IUsuario } from './usuario.model';
import { IPermissao } from '../shared/permissao.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ISistema } from '../sistema/sistema.model';
import { IPerfil } from '../perfil/perfil.model';
import { BaseEditComponent } from '../shared/base-edit.component';
import { GenericValidator } from '../shared/generic-validator';
import { CpfValidator } from '../shared/cpf.validator';

@Component({
  templateUrl: './usuario-edit.component.html',
  styles: []
})
export class UsuarioEditComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup
  usuario: IUsuario
  perfis: IPermissao[]

  constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    super()
    const messages = {
      nome: {
        required: 'Nome do usuário obrigatório'
      },
      email: {
        required: 'E-mail do usuário obrigatório',
        pattern: 'E-mail inválido'
      },
      cpf: {
        required: 'CPF do usuário obrigatório',
        isCpf: 'CPF inválido'
      }
    }
    this.genericValidator = new GenericValidator(messages)
  }

  salvar(): void {
    const u = <IUsuario>Object.assign({}, this.usuario, this.formGroup.value)
    u.ativo = true
    u.perfis = this.perfis

    if (u.id === 0) {
      this.http.post('api/usuario', u)
            .subscribe(() => this.router.navigate(['/usuario']))
    } else {
      this.http.put('api/usuario', u)
      .subscribe(() => this.router.navigate(['/usuario']))
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit()
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      )])],
      cpf: ['', Validators.compose([Validators.required, CpfValidator.validate])],
      telefone: []
    })

    this.route.params.subscribe(params => {
      const id = +params['id']

      this.http.get(`api/usuario/${id}/perfis`)
      .subscribe(r => {
          this.perfis = <IPermissao[]>r.json()
      })

      if (id !== 0) {
        this.http.get(`api/usuario/${id}`)
            .subscribe(s => {
              this.usuario = <IUsuario>s.json()
              this.formGroup.patchValue({
                id: this.usuario.id,
                nome: this.usuario.nome,
                email: this.usuario.email,
                cpf: this.usuario.cpf,
                telefone: this.usuario.telefone
              })
            })
      }
    })

  }

}
