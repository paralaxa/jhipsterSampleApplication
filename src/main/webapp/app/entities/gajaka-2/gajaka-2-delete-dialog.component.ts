import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Gajaka2 } from './gajaka-2.model';
import { Gajaka2PopupService } from './gajaka-2-popup.service';
import { Gajaka2Service } from './gajaka-2.service';

@Component({
    selector: 'jhi-gajaka-2-delete-dialog',
    templateUrl: './gajaka-2-delete-dialog.component.html'
})
export class Gajaka2DeleteDialogComponent {

    gajaka2: Gajaka2;

    constructor(
        private gajaka2Service: Gajaka2Service,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gajaka2Service.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gajaka2ListModification',
                content: 'Deleted an gajaka2'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gajaka-2-delete-popup',
    template: ''
})
export class Gajaka2DeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gajaka2PopupService: Gajaka2PopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gajaka2PopupService
                .open(Gajaka2DeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
