import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Gajaka2 } from './gajaka-2.model';
import { Gajaka2Service } from './gajaka-2.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-gajaka-2',
    templateUrl: './gajaka-2.component.html'
})
export class Gajaka2Component implements OnInit, OnDestroy {
gajaka2S: Gajaka2[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gajaka2Service: Gajaka2Service,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.gajaka2Service.query().subscribe(
            (res: HttpResponse<Gajaka2[]>) => {
                this.gajaka2S = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGajaka2S();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Gajaka2) {
        return item.id;
    }
    registerChangeInGajaka2S() {
        this.eventSubscriber = this.eventManager.subscribe('gajaka2ListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
