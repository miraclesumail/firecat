import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoCenterPage } from './info-center';

@NgModule({
  declarations: [
    InfoCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoCenterPage),
  ],
})
export class InfoCenterPageModule {}
