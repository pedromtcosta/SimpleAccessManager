import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IUsuario } from './usuario.model';
import { IPermissao } from '../shared/permissao.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ISistema } from '../sistema/sistema.model';
import { IPerfil } from '../perfil/perfil.model';

@Component({
  templateUrl: './usuario-edit.component.html',
  styles: []
})
export class UsuarioEditComponent implements OnInit {
  formUsuario: FormGroup
  usuario: IUsuario
  perfis: IPermissao[]

  constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  salvar(): void {
    const u = <IUsuario>Object.assign({}, this.usuario, this.formUsuario.value)
    u.ativo = true
    u.perfis = this.perfis

    console.log(u)

    if (u.id === 0) {
      this.http.post('api/usuario', u)
            .subscribe(() => this.router.navigate(['/usuario']))
    } else {
      this.http.put('api/usuario', u)
      .subscribe(() => this.router.navigate(['/usuario']))
    }
  }

  ngOnInit() {
    this.formUsuario = this.fb.group({
      id: [0],
      nome: [],
      email: [],
      cpf: [],
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
              this.formUsuario.patchValue({
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
