import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaListComponent } from './sistema-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ISistema } from './sistema.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';

describe('SistemaListComponent', () => {
  let component: SistemaListComponent;
  let fixture: ComponentFixture<SistemaListComponent>;
  let spyRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaListComponent ],
      providers: [ { provide: ActivatedRoute, useValue: spyRoute } ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaListComponent);
    component = fixture.componentInstance;
    spyRoute = jasmine.createSpyObj<ActivatedRoute>('data', [{}])
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have table', () => {
    const tableDe: DebugElement = fixture.debugElement.query(By.css('table[data-dataTable]'))
    expect(tableDe).toBeTruthy()
  });

  it('should have table with right header', () => {
    const table = fixture.debugElement.query(By.css('table[data-dataTable]'))
    const thead = table.children[0]
    const tr = thead.children[0]
    const ths = tr.children
    expect(ths[0].nativeElement.innerText).toBe('Nome')
    expect(ths[1].nativeElement.innerText).toBe('Descrição')
  });

  it('should have a tbody', () => {
    const tbody = fixture.debugElement.query(By.css('table[data-dataTable] tbody'))
    expect(tbody).toBeTruthy()
  })

  it('should generate right list', () => {
    fixture.componentInstance.list = [{
      id: 1,
      nome: 'Sistema 1',
      descricao: 'Descrição 1',
      ativo: true,
      perfis: []
    }, {
      id: 2,
      nome: 'Sistema 2',
      descricao: 'Descrição 2',
      ativo: true,
      perfis: []
    }]

    fixture.detectChanges()

    const tbody = fixture.debugElement.query(By.css('table[data-dataTable] tbody'))
    const trs = tbody.children
    expect(trs[0].children[0].nativeElement.innerText).toBe('Sistema 1')
    expect(trs[0].children[1].nativeElement.innerText).toBe('Descrição 1')
    expect(trs[1].children[0].nativeElement.innerText).toBe('Sistema 2')
    expect(trs[1].children[1].nativeElement.innerText).toBe('Descrição 2')
  })

  it('should populate list after ngOnInit', () => {
    const list: ISistema[] = [{
      id: 1,
      nome: 'Sistema 1',
      descricao: 'Descrição 1',
      ativo: true,
      perfis: []
    }, {
      id: 2,
      nome: 'Sistema 2',
      descricao: 'Descrição 2',
      ativo: true,
      perfis: []
    }, {
      id: 3,
      nome: 'Sistema 3',
      descricao: 'Descrição 3',
      ativo: true,
      perfis: []
    }]

    const listSubject = new Subject<any>();

    spyRoute = jasmine.createSpyObj<ActivatedRoute>('spyRoute', ['data'])
    spyRoute.data.and.returnValue(listSubject.asObservable())

    component.ngOnInit()

    listSubject.next({list: list})

    listSubject.subscribe(() => {
      expect(component.list.length).toBe(3)
    })
  })
});
