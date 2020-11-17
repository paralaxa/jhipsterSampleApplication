import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { ConsumerComponent } from './consumer.component';
import { ConsumerDetailComponent } from './consumer-detail.component';
import { ConsumerUpdateComponent } from './consumer-update.component';
import { ConsumerDeleteDialogComponent } from './consumer-delete-dialog.component';
import { consumerRoute } from './consumer.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(consumerRoute)],
  declarations: [ConsumerComponent, ConsumerDetailComponent, ConsumerUpdateComponent, ConsumerDeleteDialogComponent],
  entryComponents: [ConsumerDeleteDialogComponent],
})
export class JhipsterSampleApplicationConsumerModule {}
