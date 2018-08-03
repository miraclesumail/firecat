import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {WuxingComponent} from '../components/gametrend/wuxing/wuxing'
import {KuadutrendComponent} from '../components/gametrend/kuadutrend/kuadutrend'
import {ZhixuanhezhiComponent} from '../components/gametrend/qiansan/zhixuanhezhi/zhixuanhezhi'
import { ZufuComponent } from '../components/gametrend/zufu/zufu'
import {DaxiaodanshuangComponent} from '../components/gametrend/daxiaodanshuang/daxiaodanshuang'

@NgModule({
    declarations: [
        WuxingComponent,KuadutrendComponent,ZhixuanhezhiComponent,ZufuComponent,DaxiaodanshuangComponent
    ],
    imports: [
      IonicPageModule.forChild(WuxingComponent), IonicPageModule.forChild(KuadutrendComponent), IonicPageModule.forChild(ZhixuanhezhiComponent),
      IonicPageModule.forChild(ZufuComponent), IonicPageModule.forChild(DaxiaodanshuangComponent),
    ],
  })
  export class GameTrendModule {}

