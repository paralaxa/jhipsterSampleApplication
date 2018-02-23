/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { GajakaComponent } from '../../../../../../main/webapp/app/entities/gajaka/gajaka.component';
import { GajakaService } from '../../../../../../main/webapp/app/entities/gajaka/gajaka.service';
import { Gajaka } from '../../../../../../main/webapp/app/entities/gajaka/gajaka.model';

describe('Component Tests', () => {

    describe('Gajaka Management Component', () => {
        let comp: GajakaComponent;
        let fixture: ComponentFixture<GajakaComponent>;
        let service: GajakaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [GajakaComponent],
                providers: [
                    GajakaService
                ]
            })
            .overrideTemplate(GajakaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GajakaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GajakaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Gajaka(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.gajakas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
