import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { IdUpdateComponent } from 'app/entities/id/id-update.component';
import { IdService } from 'app/entities/id/id.service';
import { Id } from 'app/shared/model/id.model';

describe('Component Tests', () => {
  describe('Id Management Update Component', () => {
    let comp: IdUpdateComponent;
    let fixture: ComponentFixture<IdUpdateComponent>;
    let service: IdService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [IdUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(IdUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IdUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IdService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Id(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Id();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
