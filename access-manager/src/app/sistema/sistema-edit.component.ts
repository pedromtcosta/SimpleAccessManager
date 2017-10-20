import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { ISistema } from './sistema.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericValidator } from '../shared/generic-validator';
import { BaseEditComponent } from '../shared/base-edit.component';

@Component({
  selector: 'app-sistema-edit',
  templateUrl: './sistema-edit.component.html',
  styles: []
})
export class SistemaEditComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  formGroup: FormGroup
  sistema: ISistema

  constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    super()
    const messages = {
      nome: {
        required: 'Nome do sistema obrigatório'
      },
      descricao: {
        required: 'Descrição do sistema obrigatória'
      }
    }
    this.genericValidator = new GenericValidator(messages)
  }

  ngAfterViewInit() {
    super.ngAfterViewInit()
  }

  salvar(): void {
    const s = <ISistema>Object.assign({}, this.sistema, this.formGroup.value)
    s.ativo = true

    if (s.id === 0) {
      this.http.post('/api/sistema', s)
      .subscribe(() => this.router.navigate(['/sistema']))
    } else {
      this.http.put('/api/sistema', s)
      .subscribe(() => this.router.navigate(['/sistema']))
    }
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    })

    this.route.params.subscribe(params => {
      const id = +params['id']
      if (id !== 0) {
        this.http.get(`api/sistema/${id}`)
              .subscribe(s => {
                this.sistema = <ISistema>s.json()
                this.formGroup.patchValue({
                  id: this.sistema.id,
                  nome: this.sistema.nome,
                  descricao: this.sistema.descricao
                })
              })
      }
    })
  }

}
