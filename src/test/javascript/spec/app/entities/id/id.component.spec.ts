import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IdComponent } from 'app/entities/id/id.component';
import { IdService } from 'app/entities/id/id.service';
import { Id } from 'app/shared/model/id.model';

describe('Component Tests', () => {
  describe('Id Management Component', () => {
    let comp: IdComponent;
    let fixture: ComponentFixture<IdComponent>;
    let service: IdService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [IdComponent],
      })
        .overrideTemplate(IdComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IdComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IdService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Id(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ids && comp.ids[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
