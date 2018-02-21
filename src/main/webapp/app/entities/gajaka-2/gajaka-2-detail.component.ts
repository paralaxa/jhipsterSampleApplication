import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Gajaka2 } from './gajaka-2.model';
import { Gajaka2Service } from './gajaka-2.service';

@Component({
    selector: 'jhi-gajaka-2-detail',
    templateUrl: './gajaka-2-detail.component.html'
})
export class Gajaka2DetailComponent implements OnInit, OnDestroy {

    gajaka2: Gajaka2;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gajaka2Service: Gajaka2Service,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGajaka2S();
    }

    load(id) {
        this.gajaka2Service.find(id)
            .subscribe((gajaka2Response: HttpResponse<Gajaka2>) => {
                this.gajaka2 = gajaka2Response.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGajaka2S() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gajaka2ListModification',
            (response) => this.load(this.gajaka2.id)
        );
    }
}
