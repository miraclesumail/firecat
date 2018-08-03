import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpCenterPage } from './help-center';

@NgModule({
  declarations: [
    HelpCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpCenterPage),
  ],
})
export class HelpCenterPageModule {}
