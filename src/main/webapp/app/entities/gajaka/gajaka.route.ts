import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GajakaComponent } from './gajaka.component';
import { GajakaDetailComponent } from './gajaka-detail.component';
import { GajakaPopupComponent } from './gajaka-dialog.component';
import { GajakaDeletePopupComponent } from './gajaka-delete-dialog.component';

export const gajakaRoute: Routes = [
    {
        path: 'gajaka',
        component: GajakaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gajakas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'gajaka/:id',
        component: GajakaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gajakas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gajakaPopupRoute: Routes = [
    {
        path: 'gajaka-new',
        component: GajakaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gajakas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gajaka/:id/edit',
        component: GajakaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gajakas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gajaka/:id/delete',
        component: GajakaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gajakas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
