import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IId, Id } from 'app/shared/model/id.model';
import { IdService } from './id.service';
import { IConsumer } from 'app/shared/model/consumer.model';
import { ConsumerService } from 'app/entities/consumer/consumer.service';

@Component({
  selector: 'jhi-id-update',
  templateUrl: './id-update.component.html',
})
export class IdUpdateComponent implements OnInit {
  isSaving = false;
  consumers: IConsumer[] = [];

  editForm = this.fb.group({
    id: [],
    validFrom: [],
    validTo: [],
    consumerId: [],
    consumerId: [],
  });

  constructor(
    protected idService: IdService,
    protected consumerService: ConsumerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ id }) => {
      this.updateForm(id);

      this.consumerService.query().subscribe((res: HttpResponse<IConsumer[]>) => (this.consumers = res.body || []));
    });
  }

  updateForm(id: IId): void {
    this.editForm.patchValue({
      id: id.id,
      validFrom: id.validFrom,
      validTo: id.validTo,
      consumerId: id.consumerId,
      consumerId: id.consumerId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const id = this.createFromForm();
    if (id.id !== undefined) {
      this.subscribeToSaveResponse(this.idService.update(id));
    } else {
      this.subscribeToSaveResponse(this.idService.create(id));
    }
  }

  private createFromForm(): IId {
    return {
      ...new Id(),
      id: this.editForm.get(['id'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value,
      validTo: this.editForm.get(['validTo'])!.value,
      consumerId: this.editForm.get(['consumerId'])!.value,
      consumerId: this.editForm.get(['consumerId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IId>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IConsumer): any {
    return item.id;
  }
}
