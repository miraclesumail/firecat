import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameTrendPage } from './game-trend';
import { ComponentsModule } from '../../components/components.module';
import { GameTrendModule } from '../../components/gameTrend.module'
import { WuXingPageModule } from '../../components/wuxing.module'
import { Xuan5Module } from '../../components/115-module'

@NgModule({
  declarations: [
    GameTrendPage,
  ],
  imports: [
    IonicPageModule.forChild(GameTrendPage),ComponentsModule,GameTrendModule,WuXingPageModule,Xuan5Module
  ],
})
export class GameTrendPageModule {}
