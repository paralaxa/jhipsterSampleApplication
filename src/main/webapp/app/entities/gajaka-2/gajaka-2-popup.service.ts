import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Gajaka2 } from './gajaka-2.model';
import { Gajaka2Service } from './gajaka-2.service';

@Injectable()
export class Gajaka2PopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private gajaka2Service: Gajaka2Service

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.gajaka2Service.find(id)
                    .subscribe((gajaka2Response: HttpResponse<Gajaka2>) => {
                        const gajaka2: Gajaka2 = gajaka2Response.body;
                        this.ngbModalRef = this.gajaka2ModalRef(component, gajaka2);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.gajaka2ModalRef(component, new Gajaka2());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    gajaka2ModalRef(component: Component, gajaka2: Gajaka2): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.gajaka2 = gajaka2;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
