import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IId } from 'app/shared/model/id.model';
import { IdService } from './id.service';
import { IdDeleteDialogComponent } from './id-delete-dialog.component';

@Component({
  selector: 'jhi-id',
  templateUrl: './id.component.html',
})
export class IdComponent implements OnInit, OnDestroy {
  ids?: IId[];
  eventSubscriber?: Subscription;

  constructor(protected idService: IdService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.idService.query().subscribe((res: HttpResponse<IId[]>) => (this.ids = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInIds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IId): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInIds(): void {
    this.eventSubscriber = this.eventManager.subscribe('idListModification', () => this.loadAll());
  }

  delete(id: IId): void {
    const modalRef = this.modalService.open(IdDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.id = id;
  }
}
