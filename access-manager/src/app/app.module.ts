import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SistemaListComponent } from './sistema/sistema-list.component';
import { BaseListComponent } from './shared/base-list.component';
import { SistemaEditComponent } from './sistema/sistema-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router'

import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BaseListResolverService } from './shared/base-list-resolver.service';
import { PerfilListComponent } from './perfil/perfil-list.service';

import { PerfilEditComponent } from './perfil/perfil-edit.component';
import { UsuarioEditComponent } from './usuario/usuario-edit.component';
import { UsuarioListComponent } from './usuario/usuario-list.service';

@NgModule({
  declarations: [
    AppComponent,
    SistemaListComponent,
    SistemaEditComponent,
    PerfilListComponent,
    PerfilEditComponent,
    UsuarioEditComponent,
    UsuarioListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'sistema/:id', component: SistemaEditComponent },
      { path: 'sistema', component: SistemaListComponent, resolve: { list: BaseListResolverService } },
      { path: 'perfil/:id', component: PerfilEditComponent },
      { path: 'perfil', component: PerfilListComponent, resolve: { list: BaseListResolverService } },
      { path: 'usuario/:id', component: UsuarioEditComponent },
      { path: 'usuario', component: UsuarioListComponent, resolve: { list: BaseListResolverService } },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [ BaseListResolverService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
