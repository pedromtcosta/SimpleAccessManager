import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Http } from '@angular/http';
import { ISimpleChartData } from './simple-chart-data.model';

@Injectable()
export class DashboardResolver implements Resolve<ISimpleChartData[][]> {
  constructor(private http: Http) { }

  async resolve(route: ActivatedRouteSnapshot): Promise<ISimpleChartData[][]> {
    const ret: ISimpleChartData[][] = []

    const usuariosPorSistemaData = <any[]>(await this.http.get('api/dashboard/usuariosporsistema').toPromise()).json()
    const usuariosPorSistema = usuariosPorSistemaData.map(d => <ISimpleChartData>{ label: d.sistema, value: d.qtdUsuarios })

    const usuariosPorPerfilData = <any[]>(await this.http.get('api/dashboard/usuariosporperfil').toPromise()).json()
    const usuariosPorPerfil = usuariosPorPerfilData.map(d => <ISimpleChartData>{ label: d.perfil, value: d.qtdUsuarios })

    ret[0] = usuariosPorSistema
    ret[1] = usuariosPorPerfil

    return ret;
  }

}
