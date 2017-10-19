import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaListComponent } from './sistema-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SistemaListComponent', () => {
  let component: SistemaListComponent;
  let fixture: ComponentFixture<SistemaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaListComponent);
    component = fixture.componentInstance;
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
});
