import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransformHistoryPage } from './transform-history';

@NgModule({
  declarations: [
    TransformHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TransformHistoryPage),
  ],
})
export class TransformHistoryPageModule {}
