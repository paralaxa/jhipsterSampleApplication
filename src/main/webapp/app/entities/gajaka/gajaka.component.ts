import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Gajaka } from './gajaka.model';
import { GajakaService } from './gajaka.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-gajaka',
    templateUrl: './gajaka.component.html'
})
export class GajakaComponent implements OnInit, OnDestroy {
gajakas: Gajaka[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gajakaService: GajakaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.gajakaService.query().subscribe(
            (res: HttpResponse<Gajaka[]>) => {
                this.gajakas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGajakas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Gajaka) {
        return item.id;
    }
    registerChangeInGajakas() {
        this.eventSubscriber = this.eventManager.subscribe('gajakaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
