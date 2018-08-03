import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LhcSlidePage } from './lhc-slide';

@NgModule({
  declarations: [
    LhcSlidePage,
  ],
  imports: [
    IonicPageModule.forChild(LhcSlidePage),
  ],
})
export class LhcSlidePageModule {}
