import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Gajaka } from './gajaka.model';
import { GajakaPopupService } from './gajaka-popup.service';
import { GajakaService } from './gajaka.service';

@Component({
    selector: 'jhi-gajaka-dialog',
    templateUrl: './gajaka-dialog.component.html'
})
export class GajakaDialogComponent implements OnInit {

    gajaka: Gajaka;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private gajakaService: GajakaService,
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
        if (this.gajaka.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gajakaService.update(this.gajaka));
        } else {
            this.subscribeToSaveResponse(
                this.gajakaService.create(this.gajaka));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Gajaka>>) {
        result.subscribe((res: HttpResponse<Gajaka>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Gajaka) {
        this.eventManager.broadcast({ name: 'gajakaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-gajaka-popup',
    template: ''
})
export class GajakaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gajakaPopupService: GajakaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gajakaPopupService
                    .open(GajakaDialogComponent as Component, params['id']);
            } else {
                this.gajakaPopupService
                    .open(GajakaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
