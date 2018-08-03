import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { IonicModule } from 'ionic-angular';
import { GamemenuComponent } from './gamemenu/gamemenu';
import { TabYuanComponent } from './tab-yuan/tab-yuan';
import { RightmenuComponent } from './rightmenu/rightmenu';
import { MenumodalComponent } from './menumodal/menumodal';
import { ZuxuanhezhiComponent } from './ssc-game/zuxuanhezhi/zuxuanhezhi';
import { ZuxuanliuComponent } from './ssc-game/zuxuanliu/zuxuanliu';
import { WuxingzhixuanzuheComponent } from './ssc-game/wuxing/wuxingzhixuanzuhe/wuxingzhixuanzuhe';
import { FooterComponent } from './footer/footer';

import { ZhixuanfushiComponent } from './ssc-game/wuxing/zhixuanfushi/zhixuanfushi'
import { SiXingComponent } from './si-xing/si-xing';
import { QianSanComponent } from './qian-san/qian-san';





@NgModule({
	declarations: [
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    GamemenuComponent,
    ZuxuanhezhiComponent,
    ZuxuanliuComponent,
    FooterComponent,
    SiXingComponent,
    QianSanComponent,
   
    ],
	imports: [CommonModule],
	exports: [
    TabYuanComponent,
    RightmenuComponent,
    MenumodalComponent,
    GamemenuComponent,
    ZuxuanhezhiComponent,
    ZuxuanliuComponent,
    FooterComponent,
    SiXingComponent,
    QianSanComponent,
  
    ]
})

export class ComponentsModule {}


