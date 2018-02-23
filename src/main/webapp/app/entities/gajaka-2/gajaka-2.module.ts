import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    Gajaka2Service,
    Gajaka2PopupService,
    Gajaka2Component,
    Gajaka2DetailComponent,
    Gajaka2DialogComponent,
    Gajaka2PopupComponent,
    Gajaka2DeletePopupComponent,
    Gajaka2DeleteDialogComponent,
    gajaka2Route,
    gajaka2PopupRoute,
} from './';

const ENTITY_STATES = [
    ...gajaka2Route,
    ...gajaka2PopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Gajaka2Component,
        Gajaka2DetailComponent,
        Gajaka2DialogComponent,
        Gajaka2DeleteDialogComponent,
        Gajaka2PopupComponent,
        Gajaka2DeletePopupComponent,
    ],
    entryComponents: [
        Gajaka2Component,
        Gajaka2DialogComponent,
        Gajaka2PopupComponent,
        Gajaka2DeleteDialogComponent,
        Gajaka2DeletePopupComponent,
    ],
    providers: [
        Gajaka2Service,
        Gajaka2PopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationGajaka2Module {}
