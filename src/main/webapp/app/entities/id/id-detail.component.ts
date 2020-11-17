import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IId } from 'app/shared/model/id.model';

@Component({
  selector: 'jhi-id-detail',
  templateUrl: './id-detail.component.html',
})
export class IdDetailComponent implements OnInit {
  id: IId | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ id }) => (this.id = id));
  }

  previousState(): void {
    window.history.back();
  }
}
