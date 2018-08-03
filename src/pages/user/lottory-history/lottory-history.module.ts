import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LottoryHistoryPage } from './lottory-history';

@NgModule({
  declarations: [
    LottoryHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(LottoryHistoryPage),
  ],
})
export class LottoryHistoryPageModule {}
