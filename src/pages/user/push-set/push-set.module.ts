import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PushSetPage } from './push-set';

@NgModule({
  declarations: [
    PushSetPage,
  ],
  imports: [
    IonicPageModule.forChild(PushSetPage),
  ],
})
export class PushSetPageModule {}
