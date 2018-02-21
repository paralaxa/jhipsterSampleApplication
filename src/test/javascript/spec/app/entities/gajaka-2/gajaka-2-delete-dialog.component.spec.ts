/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Gajaka2DeleteDialogComponent } from '../../../../../../main/webapp/app/entities/gajaka-2/gajaka-2-delete-dialog.component';
import { Gajaka2Service } from '../../../../../../main/webapp/app/entities/gajaka-2/gajaka-2.service';

describe('Component Tests', () => {

    describe('Gajaka2 Management Delete Component', () => {
        let comp: Gajaka2DeleteDialogComponent;
        let fixture: ComponentFixture<Gajaka2DeleteDialogComponent>;
        let service: Gajaka2Service;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Gajaka2DeleteDialogComponent],
                providers: [
                    Gajaka2Service
                ]
            })
            .overrideTemplate(Gajaka2DeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Gajaka2DeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Gajaka2Service);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
