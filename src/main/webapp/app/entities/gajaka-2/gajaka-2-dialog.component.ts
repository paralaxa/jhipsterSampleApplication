import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Gajaka2 } from './gajaka-2.model';
import { Gajaka2PopupService } from './gajaka-2-popup.service';
import { Gajaka2Service } from './gajaka-2.service';

@Component({
    selector: 'jhi-gajaka-2-dialog',
    templateUrl: './gajaka-2-dialog.component.html'
})
export class Gajaka2DialogComponent implements OnInit {

    gajaka2: Gajaka2;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private gajaka2Service: Gajaka2Service,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.gajaka2.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gajaka2Service.update(this.gajaka2));
        } else {
            this.subscribeToSaveResponse(
                this.gajaka2Service.create(this.gajaka2));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Gajaka2>>) {
        result.subscribe((res: HttpResponse<Gajaka2>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Gajaka2) {
        this.eventManager.broadcast({ name: 'gajaka2ListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-gajaka-2-popup',
    template: ''
})
export class Gajaka2PopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gajaka2PopupService: Gajaka2PopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gajaka2PopupService
                    .open(Gajaka2DialogComponent as Component, params['id']);
            } else {
                this.gajaka2PopupService
                    .open(Gajaka2DialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
