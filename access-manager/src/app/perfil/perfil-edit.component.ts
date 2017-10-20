import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IPerfil } from './perfil.model';
import { IPermissao } from '../shared/permissao.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ISistema } from '../sistema/sistema.model';

@Component({
  templateUrl: './perfil-edit.component.html',
  styles: []
})
export class PerfilEditComponent implements OnInit {
  formPerfil: FormGroup
  perfil: IPerfil
  sistemas: IPermissao[]

  constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  salvar(): void {
    const p = <IPerfil>Object.assign({}, this.perfil, this.formPerfil.value)
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
    this.formPerfil = this.fb.group({
      id: [0],
      nome: []
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
              this.formPerfil.patchValue({
                id: this.perfil.id,
                nome: this.perfil.nome
              })
            })
      }
    })
  }

}
