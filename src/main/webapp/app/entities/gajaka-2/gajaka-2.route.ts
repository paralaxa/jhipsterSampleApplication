import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Gajaka2Component } from './gajaka-2.component';
import { Gajaka2DetailComponent } from './gajaka-2-detail.component';
import { Gajaka2PopupComponent } from './gajaka-2-dialog.component';
import { Gajaka2DeletePopupComponent } from './gajaka-2-delete-dialog.component';

export const gajaka2Route: Routes = [
    {
        path: 'gajaka-2',
        component: Gajaka2Component,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gajaka2S'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'gajaka-2/:id',
        component: Gajaka2DetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gajaka2S'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gajaka2PopupRoute: Routes = [
    {
        path: 'gajaka-2-new',
        component: Gajaka2PopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gajaka2S'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gajaka-2/:id/edit',
        component: Gajaka2PopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gajaka2S'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gajaka-2/:id/delete',
        component: Gajaka2DeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gajaka2S'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
