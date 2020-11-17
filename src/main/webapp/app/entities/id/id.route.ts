import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IId, Id } from 'app/shared/model/id.model';
import { IdService } from './id.service';
import { IdComponent } from './id.component';
import { IdDetailComponent } from './id-detail.component';
import { IdUpdateComponent } from './id-update.component';

@Injectable({ providedIn: 'root' })
export class IdResolve implements Resolve<IId> {
  constructor(private service: IdService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IId> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((id: HttpResponse<Id>) => {
          if (id.body) {
            return of(id.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Id());
  }
}

export const idRoute: Routes = [
  {
    path: '',
    component: IdComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ids',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: IdDetailComponent,
    resolve: {
      id: IdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ids',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: IdUpdateComponent,
    resolve: {
      id: IdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ids',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: IdUpdateComponent,
    resolve: {
      id: IdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ids',
    },
    canActivate: [UserRouteAccessService],
  },
];
