import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Xuan5Page } from './xuan5';
import { ComponentsModule } from '../../../components/components.module';
import { Xuan5Module } from '../../../components/115-module'

@NgModule({
  declarations: [
    Xuan5Page,
  ],
  imports: [
    IonicPageModule.forChild(Xuan5Page),ComponentsModule,Xuan5Module
  ],
})
export class Xuan5PageModule {}
