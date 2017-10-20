import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ISimpleChartData } from './simple-chart-data.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  public usuariosSistemaLabels: string[] = []
  public usuariosSistemaData: number[] = []

  public usuariosPerfilLabels: string[] = []
  public usuariosPerfilData: number[] = []

  constructor(private http: Http, protected route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = <ISimpleChartData[][]>routeData['data'];
      this.usuariosSistemaLabels = data[0].map(e => e.label)
      this.usuariosSistemaData = data[0].map(e => e.value)

      this.usuariosPerfilLabels = data[1].map(e => e.label)
      this.usuariosPerfilData = data[1].map(e => e.value)
    });
  }

}
