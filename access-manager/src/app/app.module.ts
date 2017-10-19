import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SistemaListComponent } from './sistema/sistema-list.component';
import { BaseListComponent } from './shared/base-list.component';
import { SistemaEditComponent } from './sistema/sistema-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router'

import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    SistemaListComponent,
    SistemaEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'sistema/new', component: SistemaEditComponent },
      { path: 'sistema', component: SistemaListComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
