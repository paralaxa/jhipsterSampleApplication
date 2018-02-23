import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Gajaka } from './gajaka.model';
import { GajakaService } from './gajaka.service';

@Component({
    selector: 'jhi-gajaka-detail',
    templateUrl: './gajaka-detail.component.html'
})
export class GajakaDetailComponent implements OnInit, OnDestroy {

    gajaka: Gajaka;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gajakaService: GajakaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGajakas();
    }

    load(id) {
        this.gajakaService.find(id)
            .subscribe((gajakaResponse: HttpResponse<Gajaka>) => {
                this.gajaka = gajakaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGajakas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gajakaListModification',
            (response) => this.load(this.gajaka.id)
        );
    }
}
