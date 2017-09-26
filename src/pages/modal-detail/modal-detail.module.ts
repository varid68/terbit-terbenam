import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDetailPage } from './modal-detail';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ModalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDetailPage),DirectivesModule
  ],
  exports: [
    ModalDetailPage
  ]
})
export class ModalDetailPageModule {}
