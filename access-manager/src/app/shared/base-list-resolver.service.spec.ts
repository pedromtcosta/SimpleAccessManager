import { TestBed, inject } from '@angular/core/testing';

import { BaseListResolverService } from './base-list-resolver.service';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IBaseModel } from './base.model';
import { ActivatedRouteSnapshot, UrlSegment } from '@angular/router';

interface IDummy {
  g: string
}

describe('BaseListResolverService', () => {
  let spyHttp: jasmine.SpyObj<Http>

  beforeEach(() => {
    spyHttp = jasmine.createSpyObj<Http>('spyHttp', ['get'])
    TestBed.configureTestingModule({
      providers: [BaseListResolverService, { provide: Http, useValue: spyHttp }],
      imports: []
    });
  });

  it('should be created', inject([BaseListResolverService], (service: BaseListResolverService) => {
    expect(service).toBeTruthy();
  }))

  it('should make right call to api', inject([BaseListResolverService], (service: BaseListResolverService) => {
    spyHttp.get.and.returnValue(Observable.of(undefined))

    const route = new ActivatedRouteSnapshot()
    route.url = []
    route.url[0] = new UrlSegment('dummy', {})
    service.resolve(route)

    expect(spyHttp.get).toHaveBeenCalledWith('api/dummy')
  }))
});
