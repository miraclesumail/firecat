import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SafeCenterPage } from './safe-center';

@NgModule({
  declarations: [
    SafeCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(SafeCenterPage),
  ],
})
export class SafeCenterPageModule {}
