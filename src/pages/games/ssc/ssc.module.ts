import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SscPage } from './ssc';
import { ComponentsModule } from '../../../components/components.module'
import { DirectivesModule } from '../../../directives/directives.module'
import { WuXingPageModule } from '../../../components/wuxing.module'

@NgModule({
  declarations: [
    SscPage
    ],
  imports: [
    IonicPageModule.forChild(SscPage),ComponentsModule,WuXingPageModule
  ]
})
export class SscPageModule {}
