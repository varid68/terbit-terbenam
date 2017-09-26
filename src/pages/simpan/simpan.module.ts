import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpanPage } from './simpan';

@NgModule({
  declarations: [
    SimpanPage,
  ],
  imports: [
    IonicPageModule.forChild(SimpanPage),
  ],
  exports: [
    SimpanPage
  ]
})
export class SimpanPageModule {}
