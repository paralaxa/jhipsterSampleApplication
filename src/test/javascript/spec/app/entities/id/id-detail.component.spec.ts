import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IdDetailComponent } from 'app/entities/id/id-detail.component';
import { Id } from 'app/shared/model/id.model';

describe('Component Tests', () => {
  describe('Id Management Detail Component', () => {
    let comp: IdDetailComponent;
    let fixture: ComponentFixture<IdDetailComponent>;
    const route = ({ data: of({ id: new Id(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [IdDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(IdDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IdDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load id on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.id).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
