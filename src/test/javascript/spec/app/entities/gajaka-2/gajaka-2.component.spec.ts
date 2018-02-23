/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Gajaka2Component } from '../../../../../../main/webapp/app/entities/gajaka-2/gajaka-2.component';
import { Gajaka2Service } from '../../../../../../main/webapp/app/entities/gajaka-2/gajaka-2.service';
import { Gajaka2 } from '../../../../../../main/webapp/app/entities/gajaka-2/gajaka-2.model';

describe('Component Tests', () => {

    describe('Gajaka2 Management Component', () => {
        let comp: Gajaka2Component;
        let fixture: ComponentFixture<Gajaka2Component>;
        let service: Gajaka2Service;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Gajaka2Component],
                providers: [
                    Gajaka2Service
                ]
            })
            .overrideTemplate(Gajaka2Component, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Gajaka2Component);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Gajaka2Service);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Gajaka2(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.gajaka2S[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
