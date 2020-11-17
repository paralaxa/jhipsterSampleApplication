import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IConsumer, Consumer } from 'app/shared/model/consumer.model';
import { ConsumerService } from './consumer.service';

@Component({
  selector: 'jhi-consumer-update',
  templateUrl: './consumer-update.component.html',
})
export class ConsumerUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    otherFields: [],
  });

  constructor(protected consumerService: ConsumerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consumer }) => {
      this.updateForm(consumer);
    });
  }

  updateForm(consumer: IConsumer): void {
    this.editForm.patchValue({
      id: consumer.id,
      otherFields: consumer.otherFields,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consumer = this.createFromForm();
    if (consumer.id !== undefined) {
      this.subscribeToSaveResponse(this.consumerService.update(consumer));
    } else {
      this.subscribeToSaveResponse(this.consumerService.create(consumer));
    }
  }

  private createFromForm(): IConsumer {
    return {
      ...new Consumer(),
      id: this.editForm.get(['id'])!.value,
      otherFields: this.editForm.get(['otherFields'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsumer>>): void {
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
}
