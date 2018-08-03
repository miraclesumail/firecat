import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { QiansanzhixuanfushiComponent } from '../components/115-game/sanma/qiansanzhixuanfushi/qiansanzhixuanfushi'
import { QiansanzuxuanfushiComponent } from '../components/115-game/sanma/qiansanzuxuanfushi/qiansanzuxuanfushi'
import { QiansanzuxuandantuoComponent } from '../components/115-game/sanma/qiansanzuxuandantuo/qiansanzuxuandantuo'
import { QianerzhixuanfushiComponent } from '../components/115-game/erma/qianerzhixuanfushi/qianerzhixuanfushi'
import { QianerzuxuanfushiComponent } from '../components/115-game/erma/qianerzuxuanfushi/qianerzuxuanfushi'
import { QianerzuxuandantuoComponent } from '../components/115-game/erma/qianerzuxuandantuo/qianerzuxuandantuo'
import { QiansanbudingweiComponent } from '../components/115-game/budingwei/qiansanbudingwei/qiansanbudingwei'

import { DingweidanComponent } from '../components/115-game/dingweidan/dingweidan/dingweidan'
import { RenxuanyizhongyifushiComponent } from '../components/115-game/renxuanfushi/renxuanyizhongyifushi/renxuanyizhongyifushi'
import { RenxuanerzhongerfushiComponent } from '../components/115-game/renxuanfushi/renxuanerzhongerfushi/renxuanerzhongerfushi'
import { RenxuansanzhongsanfushiComponent } from '../components/115-game/renxuanfushi/renxuansanzhongsanfushi/renxuansanzhongsanfushi'
import { RenxuansizhongsifushiComponent } from '../components/115-game/renxuanfushi/renxuansizhongsifushi/renxuansizhongsifushi'
import { RenxuanwuzhongwufushiComponent } from '../components/115-game/renxuanfushi/renxuanwuzhongwufushi/renxuanwuzhongwufushi'
import { RenxuanliuzhongwufushiComponent } from '../components/115-game/renxuanfushi/renxuanliuzhongwufushi/renxuanliuzhongwufushi'
import { RenxuanqizhongwufushiComponent } from '../components/115-game/renxuanfushi/renxuanqizhongwufushi/renxuanqizhongwufushi'
import { RenxuanbazhongwufushiComponent } from '../components/115-game/renxuanfushi/renxuanbazhongwufushi/renxuanbazhongwufushi'

import { RenxuanerzhongerdantuoComponent } from '../components/115-game/renxuandantuo/renxuanerzhongerdantuo/renxuanerzhongerdantuo'
import { RenxuansanzhongsandantuoComponent } from '../components/115-game/renxuandantuo/renxuansanzhongsandantuo/renxuansanzhongsandantuo'
import { RenxuansizhongsidantuoComponent } from '../components/115-game/renxuandantuo/renxuansizhongsidantuo/renxuansizhongsidantuo'
import { RenxuanwuzhongwudantuoComponent } from '../components/115-game/renxuandantuo/renxuanwuzhongwudantuo/renxuanwuzhongwudantuo'
import { RenxuanliuzhongwudantuoComponent } from '../components/115-game/renxuandantuo/renxuanliuzhongwudantuo/renxuanliuzhongwudantuo'
import { RenxuanqizhongwudantuoComponent } from '../components/115-game/renxuandantuo/renxuanqizhongwudantuo/renxuanqizhongwudantuo'
import { RenxuanbazhongwudantuoComponent } from '../components/115-game/renxuandantuo/renxuanbazhongwudantuo/renxuanbazhongwudantuo'

@NgModule({
    declarations: [
      QiansanzhixuanfushiComponent,QiansanzuxuanfushiComponent,QiansanzuxuandantuoComponent,QianerzhixuanfushiComponent,QianerzuxuanfushiComponent,
      QianerzuxuandantuoComponent,QiansanbudingweiComponent,
      DingweidanComponent,
      RenxuanyizhongyifushiComponent,RenxuanerzhongerfushiComponent,RenxuansanzhongsanfushiComponent,RenxuansizhongsifushiComponent,RenxuanwuzhongwufushiComponent,
      RenxuanliuzhongwufushiComponent,RenxuanqizhongwufushiComponent,RenxuanbazhongwufushiComponent,

      RenxuanerzhongerdantuoComponent,RenxuansanzhongsandantuoComponent, RenxuansizhongsidantuoComponent,RenxuanwuzhongwudantuoComponent,
      RenxuanliuzhongwudantuoComponent,RenxuanqizhongwudantuoComponent,RenxuanbazhongwudantuoComponent
    ],
    imports: [
      IonicPageModule.forChild(QiansanzhixuanfushiComponent), IonicPageModule.forChild(QiansanzuxuanfushiComponent), IonicPageModule.forChild(QiansanzuxuandantuoComponent),
      IonicPageModule.forChild(QianerzhixuanfushiComponent), IonicPageModule.forChild(QianerzuxuanfushiComponent), IonicPageModule.forChild(QianerzuxuandantuoComponent),
      IonicPageModule.forChild(QiansanbudingweiComponent),

      IonicPageModule.forChild(DingweidanComponent),

      IonicPageModule.forChild(RenxuanyizhongyifushiComponent),IonicPageModule.forChild(RenxuanerzhongerfushiComponent),IonicPageModule.forChild(RenxuansanzhongsanfushiComponent),
      IonicPageModule.forChild(RenxuansizhongsifushiComponent),IonicPageModule.forChild(RenxuanwuzhongwufushiComponent),IonicPageModule.forChild(RenxuanliuzhongwufushiComponent),
      IonicPageModule.forChild(RenxuanqizhongwufushiComponent),IonicPageModule.forChild(RenxuanbazhongwufushiComponent),

      IonicPageModule.forChild(RenxuanerzhongerdantuoComponent),IonicPageModule.forChild(RenxuansanzhongsandantuoComponent),IonicPageModule.forChild(RenxuansizhongsidantuoComponent),
      IonicPageModule.forChild(RenxuanwuzhongwudantuoComponent),IonicPageModule.forChild(RenxuanliuzhongwudantuoComponent),IonicPageModule.forChild(RenxuanqizhongwudantuoComponent),
      IonicPageModule.forChild(RenxuanbazhongwudantuoComponent),
    ]
  })
  export class Xuan5Module {}