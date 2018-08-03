import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommonStatusPage } from './common-status';

@NgModule({
  declarations: [
    CommonStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(CommonStatusPage),
  ],
})
export class CommonStatusPageModule {}
