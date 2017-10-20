import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { ISistema } from './sistema.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sistema-edit',
  templateUrl: './sistema-edit.component.html',
  styles: []
})
export class SistemaEditComponent implements OnInit {
  formSistema: FormGroup
  sistema: ISistema

  constructor(private http: Http, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  salvar(): void {
    const s = <ISistema>Object.assign({}, this.sistema, this.formSistema.value)
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
    this.formSistema = this.fb.group({
      id: [0],
      nome: [],
      descricao: []
    })

    this.route.params.subscribe(params => {
      const id = +params['id']
      if (id !== 0) {
        this.http.get(`api/sistema/${id}`)
              .subscribe(s => {
                this.sistema = <ISistema>s.json()
                this.formSistema.patchValue({
                  id: this.sistema.id,
                  nome: this.sistema.nome,
                  descricao: this.sistema.descricao
                })
              })
      }
    })
  }

}
