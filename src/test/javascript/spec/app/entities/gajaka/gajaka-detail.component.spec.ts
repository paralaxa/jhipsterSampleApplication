/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { GajakaDetailComponent } from '../../../../../../main/webapp/app/entities/gajaka/gajaka-detail.component';
import { GajakaService } from '../../../../../../main/webapp/app/entities/gajaka/gajaka.service';
import { Gajaka } from '../../../../../../main/webapp/app/entities/gajaka/gajaka.model';

describe('Component Tests', () => {

    describe('Gajaka Management Detail Component', () => {
        let comp: GajakaDetailComponent;
        let fixture: ComponentFixture<GajakaDetailComponent>;
        let service: GajakaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [GajakaDetailComponent],
                providers: [
                    GajakaService
                ]
            })
            .overrideTemplate(GajakaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GajakaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GajakaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Gajaka(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.gajaka).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
