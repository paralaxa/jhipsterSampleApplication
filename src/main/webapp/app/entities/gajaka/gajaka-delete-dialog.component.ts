import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Gajaka } from './gajaka.model';
import { GajakaPopupService } from './gajaka-popup.service';
import { GajakaService } from './gajaka.service';

@Component({
    selector: 'jhi-gajaka-delete-dialog',
    templateUrl: './gajaka-delete-dialog.component.html'
})
export class GajakaDeleteDialogComponent {

    gajaka: Gajaka;

    constructor(
        private gajakaService: GajakaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gajakaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gajakaListModification',
                content: 'Deleted an gajaka'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gajaka-delete-popup',
    template: ''
})
export class GajakaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gajakaPopupService: GajakaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gajakaPopupService
                .open(GajakaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
