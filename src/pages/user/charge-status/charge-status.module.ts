import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChargeStatusPage } from './charge-status';

@NgModule({
  declarations: [
    ChargeStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(ChargeStatusPage),
  ],
})
export class ChargeStatusPageModule {}
