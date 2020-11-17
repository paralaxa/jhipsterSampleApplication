import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { IdComponent } from './id.component';
import { IdDetailComponent } from './id-detail.component';
import { IdUpdateComponent } from './id-update.component';
import { IdDeleteDialogComponent } from './id-delete-dialog.component';
import { idRoute } from './id.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(idRoute)],
  declarations: [IdComponent, IdDetailComponent, IdUpdateComponent, IdDeleteDialogComponent],
  entryComponents: [IdDeleteDialogComponent],
})
export class JhipsterSampleApplicationIdModule {}
