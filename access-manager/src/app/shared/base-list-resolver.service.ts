import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { IBaseModel } from './base.model';

@Injectable()
export class BaseListResolverService implements Resolve<any> {
  constructor(private http: Http) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const path = route.url[0].path

    return this.http.get(`api/${path}`).map(r => r.json())
  }

}
