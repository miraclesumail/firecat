import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KsPage } from './ks';

@NgModule({
  declarations: [
    KsPage,
  ],
  imports: [
    IonicPageModule.forChild(KsPage),
  ],
})
export class KsPageModule {}
