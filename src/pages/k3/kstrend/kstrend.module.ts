import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KstrendPage } from './kstrend';

@NgModule({
  declarations: [
    KstrendPage,
  ],
  imports: [
    IonicPageModule.forChild(KstrendPage),
  ],
})
export class KstrendPageModule {}
