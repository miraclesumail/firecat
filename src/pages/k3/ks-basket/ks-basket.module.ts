import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KsBasketPage } from './ks-basket';

@NgModule({
  declarations: [
    KsBasketPage,
  ],
  imports: [
    IonicPageModule.forChild(KsBasketPage),
  ],
})
export class KsBasketPageModule {}
