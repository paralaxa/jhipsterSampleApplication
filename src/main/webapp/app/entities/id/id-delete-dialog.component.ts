import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IId } from 'app/shared/model/id.model';
import { IdService } from './id.service';

@Component({
  templateUrl: './id-delete-dialog.component.html',
})
export class IdDeleteDialogComponent {
  id?: IId;

  constructor(protected idService: IdService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.idService.delete(id).subscribe(() => {
      this.eventManager.broadcast('idListModification');
      this.activeModal.close();
    });
  }
}
