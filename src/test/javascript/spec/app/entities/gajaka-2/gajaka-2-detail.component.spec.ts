/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { Gajaka2DetailComponent } from '../../../../../../main/webapp/app/entities/gajaka-2/gajaka-2-detail.component';
import { Gajaka2Service } from '../../../../../../main/webapp/app/entities/gajaka-2/gajaka-2.service';
import { Gajaka2 } from '../../../../../../main/webapp/app/entities/gajaka-2/gajaka-2.model';

describe('Component Tests', () => {

    describe('Gajaka2 Management Detail Component', () => {
        let comp: Gajaka2DetailComponent;
        let fixture: ComponentFixture<Gajaka2DetailComponent>;
        let service: Gajaka2Service;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [Gajaka2DetailComponent],
                providers: [
                    Gajaka2Service
                ]
            })
            .overrideTemplate(Gajaka2DetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Gajaka2DetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Gajaka2Service);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Gajaka2(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.gajaka2).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
