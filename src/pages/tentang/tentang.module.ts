import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TentangPage } from './tentang';

@NgModule({
  declarations: [
    TentangPage,
  ],
  imports: [
    IonicPageModule.forChild(TentangPage),
  ],
  exports: [
    TentangPage
  ]
})
export class TentangPageModule {}
