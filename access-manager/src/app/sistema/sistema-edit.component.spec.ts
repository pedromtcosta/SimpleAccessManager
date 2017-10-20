import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SistemaEditComponent } from './sistema-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

describe('SistemaEditComponent', () => {
  let component: SistemaEditComponent;
  let fixture: ComponentFixture<SistemaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaEditComponent ],
      imports: [ ReactiveFormsModule, HttpModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
