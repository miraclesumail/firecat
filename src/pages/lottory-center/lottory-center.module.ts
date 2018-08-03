import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LottoryCenterPage } from './lottory-center';
// import { ComponentsModule } from '../../components/components.module'
import {lCenterModule} from '../../components/lottory-center/lottoryCenter.module'



@NgModule({
  declarations: [
    LottoryCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(LottoryCenterPage),
    lCenterModule,
    // ComponentsModule,
  ],
})
export class LottoryCenterPageModule {}
