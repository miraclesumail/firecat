import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZhixuanfushiComponent } from './ssc-game/wuxing/zhixuanfushi/zhixuanfushi'
import { WuxingzhixuanzuheComponent } from './ssc-game/wuxing/wuxingzhixuanzuhe/wuxingzhixuanzuhe'
import { Zuxuan120Component } from './ssc-game/wuxing/zuxuan120/zuxuan120'
import { Zuxuan60Component } from './ssc-game/wuxing/zuxuan60/zuxuan60'
import { Zuxuan30Component } from './ssc-game/wuxing/zuxuan30/zuxuan30'
import { Zuxuan20Component } from './ssc-game/wuxing/zuxuan20/zuxuan20'
import { Zuxuan10Component } from './ssc-game/wuxing/zuxuan10/zuxuan10'
import { Zuxuan5Component } from './ssc-game/wuxing/zuxuan5/zuxuan5'

import { SiXingZhixuanfushiComponent } from './ssc-game/sixing/zhixuanfushi/zhixuanfushi'
import { SixingzhixuanzuheComponent } from './ssc-game/sixing/sixingzhixuanzuhe/sixingzhixuanzuhe'
import { Zuxuan24Component } from './ssc-game/sixing/zuxuan24/zuxuan24'
import { Zuxuan12Component } from './ssc-game/sixing/zuxuan12/zuxuan12'
import { Zuxuan6Component } from './ssc-game/sixing/zuxuan6/zuxuan6'
import { Zuxuan4Component } from './ssc-game/sixing/zuxuan4/zuxuan4'

import { QisanzhixuanhezhiComponent } from './ssc-game/qiansan/qisanzhixuanhezhi/qisanzhixuanhezhi'
import { QisanzhixuankuaduComponent } from './ssc-game/qiansan/qisanzhixuankuadu/qisanzhixuankuadu'
import { QisanzhixuanfushiComponent } from './ssc-game/qiansan/qisanzhixuanfushi/qisanzhixuanfushi'
import { QisanzhixuanzuheComponent } from './ssc-game/qiansan/qisanzhixuanzuhe/qisanzhixuanzuhe'
import { Qisanzuxuan3Component } from './ssc-game/qiansan/qisanzuxuan3/qisanzuxuan3'
import { Qisanzuxuan6Component } from './ssc-game/qiansan/qisanzuxuan6/qisanzuxuan6'
import { QisanzuxuanhezhiComponent } from './ssc-game/qiansan/qisanzuxuanhezhi/qisanzuxuanhezhi'
import { QisanbaodanComponent } from './ssc-game/qiansan/qisanbaodan/qisanbaodan'
import { QisantesuhaomaComponent } from './ssc-game/qiansan/qisantesuhaoma/qisantesuhaoma'
import { QiansanhezhiweishuComponent} from './ssc-game/qiansan/qiansanhezhiweishu/qiansanhezhiweishu'

import { ZhongsanzhixuanfushiComponent } from '../components/ssc-game/zhongsan/zhongsanzhixuanfushi/zhongsanzhixuanfushi'
import { ZhongsanzhixuanhezhiComponent } from '../components/ssc-game/zhongsan/zhongsanzhixuanhezhi/zhongsanzhixuanhezhi'
import { ZhongsanzhixuankuaduComponent } from '../components/ssc-game/zhongsan/zhongsanzhixuankuadu/zhongsanzhixuankuadu'
import { ZhongsanzhixuanzuheComponent } from '../components/ssc-game/zhongsan/zhongsanzhixuanzuhe/zhongsanzhixuanzuhe'
import { Zhongsanzuxuan6Component } from '../components/ssc-game/zhongsan/zhongsanzuxuan6/zhongsanzuxuan6'
import { Zhongsanzuxuan3Component } from '../components/ssc-game/zhongsan/zhongsanzuxuan3/zhongsanzuxuan3'
import { ZhongsanzuxuanhezhiComponent } from '../components/ssc-game/zhongsan/zhongsanzuxuanhezhi/zhongsanzuxuanhezhi'
import { ZhongsanbaodanComponent } from '../components/ssc-game/zhongsan/zhongsanbaodan/zhongsanbaodan'
import { ZhongsanhezhiweishuComponent } from '../components/ssc-game/zhongsan/zhongsanhezhiweishu/zhongsanhezhiweishu'
import { ZhongsanteshuhaomaComponent  } from '../components/ssc-game/zhongsan/zhongsanteshuhaoma/zhongsanteshuhaoma'

import { HousanzhixuanfushiComponent } from '../components/ssc-game/housan/housanzhixuanfushi/housanzhixuanfushi'
import { HousanzhixuanhezhiComponent } from '../components/ssc-game/housan/housanzhixuanhezhi/housanzhixuanhezhi'
import { HousanzhixuankuaduComponent } from '../components/ssc-game/housan/housanzhixuankuadu/housanzhixuankuadu'
import { HousanzhixuanzuheComponent } from '../components/ssc-game/housan/housanzhixuanzuhe/housanzhixuanzuhe'
import { HousanzusanComponent } from '../components/ssc-game/housan/housanzusan/housanzusan'
import { HousanzuliuComponent } from '../components/ssc-game/housan/housanzuliu/housanzuliu'
import { HousanzuxuanhezhiComponent } from '../components/ssc-game/housan/housanzuxuanhezhi/housanzuxuanhezhi'
import { HousanbaodanComponent } from '../components/ssc-game/housan/housanbaodan/housanbaodan'
import { HousanhezhiweishuComponent } from '../components/ssc-game/housan/housanhezhiweishu/housanhezhiweishu'
import { HousanteshuhaomaComponent } from '../components/ssc-game/housan/housanteshuhaoma/housanteshuhaoma'

import { ErxingzhixuanhouerhezhiComponent } from '../components/ssc-game/erxing/erxingzhixuanhouerhezhi/erxingzhixuanhouerhezhi'
import { ErxingzhixuanhouerfushiComponent } from '../components/ssc-game/erxing/erxingzhixuanhouerfushi/erxingzhixuanhouerfushi'
import { ErxingzhixuanhouerkuaduComponent } from '../components/ssc-game/erxing/erxingzhixuanhouerkuadu/erxingzhixuanhouerkuadu'
import { ErxingzhixuanqianerfushiComponent } from '../components/ssc-game/erxing/erxingzhixuanqianerfushi/erxingzhixuanqianerfushi'
import { ErxingzhixuanqianerhezhiComponent } from '../components/ssc-game/erxing/erxingzhixuanqianerhezhi/erxingzhixuanqianerhezhi'
import { ErxingzhixuanqianerkuaduComponent } from '../components/ssc-game/erxing/erxingzhixuanqianerkuadu/erxingzhixuanqianerkuadu'
import { ErxingzuxuanhouerhezhiComponent } from '../components/ssc-game/erxing/erxingzuxuanhouerhezhi/erxingzuxuanhouerhezhi'
import { ErxingzuxuanhouerbaodanComponent } from '../components/ssc-game/erxing/erxingzuxuanhouerbaodan/erxingzuxuanhouerbaodan'
import { ErxingzuxuanqianerfushiComponent } from '../components/ssc-game/erxing/erxingzuxuanqianerfushi/erxingzuxuanqianerfushi'
import { ErxingzuxuanqianerhezhiComponent } from '../components/ssc-game/erxing/erxingzuxuanqianerhezhi/erxingzuxuanqianerhezhi'
import { ErxingzuxuanqianerbaodanComponent } from '../components/ssc-game/erxing/erxingzuxuanqianerbaodan/erxingzuxuanqianerbaodan'
import { ErxingzuxuanhouerfushiComponent } from '../components/ssc-game/erxing/erxingzuxuanhouerfushi/erxingzuxuanhouerfushi'

import { YixingdingweidanComponent } from '../components/ssc-game/yixing/yixingdingweidan/yixingdingweidan'

import { HousanyimabudingweiComponent } from '../components/ssc-game/budingwei/housanyimabudingwei/housanyimabudingwei'
import { HousanermabudingweiComponent } from '../components/ssc-game/budingwei/housanermabudingwei/housanermabudingwei'
import { QiansanyimabudingweiComponent } from '../components/ssc-game/budingwei/qiansanyimabudingwei/qiansanyimabudingwei'
import { QiansanermabudingweiComponent } from '../components/ssc-game/budingwei/qiansanermabudingwei/qiansanermabudingwei'
import { ZhongsanyimabudingweiComponent } from '../components/ssc-game/budingwei/zhongsanyimabudingwei/zhongsanyimabudingwei'
import { ZhongsanermabudingweiComponent } from '../components/ssc-game/budingwei/zhongsanermabudingwei/zhongsanermabudingwei'
import { SixingyimabudingweiComponent } from '../components/ssc-game/budingwei/sixingyimabudingwei/sixingyimabudingwei'
import { SixingermabudingweiComponent } from '../components/ssc-game/budingwei/sixingermabudingwei/sixingermabudingwei'
import { WuxingermabudingweiComponent } from '../components/ssc-game/budingwei/wuxingermabudingwei/wuxingermabudingwei'
import { WuxingsanmabudingweiComponent } from '../components/ssc-game/budingwei/wuxingsanmabudingwei/wuxingsanmabudingwei'

import { HouerdaxiaodanshuangComponent } from '../components/ssc-game/daxiaodanshuang/houerdaxiaodanshuang/houerdaxiaodanshuang'
import { HousandaxiaodanshuangComponent } from '../components/ssc-game/daxiaodanshuang/housandaxiaodanshuang/housandaxiaodanshuang'
import { QianerdaxiaodanshuangComponent } from '../components/ssc-game/daxiaodanshuang/qianerdaxiaodanshuang/qianerdaxiaodanshuang'
import { QiansandaxiaodanshuangComponent } from '../components/ssc-game/daxiaodanshuang/qiansandaxiaodanshuang/qiansandaxiaodanshuang'
import { ZhongsandaxiaodanshuangComponent } from '../components/ssc-game/daxiaodanshuang/zhongsandaxiaodanshuang/zhongsandaxiaodanshuang'


import { RenxuanerzhixuanfushiComponent } from '../components/ssc-game/renxuan/renxuanerzhixuanfushi/renxuanerzhixuanfushi'
import { RenxuanerzhixuanhezhiComponent } from '../components/ssc-game/renxuan/renxuanerzhixuanhezhi/renxuanerzhixuanhezhi'
import { RenxuanerzuxuanfushiComponent } from '../components/ssc-game/renxuan/renxuanerzuxuanfushi/renxuanerzuxuanfushi'
import { RenxuanerzuxuanhezhiComponent } from '../components/ssc-game/renxuan/renxuanerzuxuanhezhi/renxuanerzuxuanhezhi'
import { RenxuansanzhixuanfushiComponent } from '../components/ssc-game/renxuan/renxuansanzhixuanfushi/renxuansanzhixuanfushi'
import { RenxuansanzhixuanhezhiComponent } from '../components/ssc-game/renxuan/renxuansanzhixuanhezhi/renxuansanzhixuanhezhi'
import { RenxuansanzusanfushiComponent } from '../components/ssc-game/renxuan/renxuansanzusanfushi/renxuansanzusanfushi'
import { RenxuansanzuliufushiComponent } from '../components/ssc-game/renxuan/renxuansanzuliufushi/renxuansanzuliufushi'
import { RenxuansanzuxuanhezhiComponent } from '../components/ssc-game/renxuan/renxuansanzuxuanhezhi/renxuansanzuxuanhezhi'
import { RenxuansizhixuanfushiComponent } from '../components/ssc-game/renxuan/renxuansizhixuanfushi/renxuansizhixuanfushi'
import { Renxuanzuxuan24Component } from '../components/ssc-game/renxuan/renxuanzuxuan24/renxuanzuxuan24'
import { Renxuanzuxuan12Component } from '../components/ssc-game/renxuan/renxuanzuxuan12/renxuanzuxuan12'
import { Renxuanzuxuan6Component } from '../components/ssc-game/renxuan/renxuanzuxuan6/renxuanzuxuan6'
import { Renxuanzuxuan4Component } from '../components/ssc-game/renxuan/renxuanzuxuan4/renxuanzuxuan4'

@NgModule({
  declarations: [
    ZhixuanfushiComponent,
    WuxingzhixuanzuheComponent,Zuxuan120Component,Zuxuan60Component,Zuxuan30Component,Zuxuan20Component,Zuxuan10Component,Zuxuan5Component,
    SiXingZhixuanfushiComponent, SixingzhixuanzuheComponent, Zuxuan24Component, Zuxuan12Component, Zuxuan6Component, Zuxuan4Component,
    QisanzhixuanhezhiComponent,QisanzhixuankuaduComponent,
    QisanzhixuanfushiComponent,QisanzhixuanzuheComponent,Qisanzuxuan3Component,Qisanzuxuan6Component,QisanzuxuanhezhiComponent,QisanbaodanComponent,QiansanhezhiweishuComponent,
    QisantesuhaomaComponent,ZhongsanzhixuanfushiComponent,ZhongsanzhixuanhezhiComponent,ZhongsanzhixuankuaduComponent,ZhongsanzhixuanzuheComponent,Zhongsanzuxuan6Component,
    Zhongsanzuxuan3Component,ZhongsanzuxuanhezhiComponent,ZhongsanbaodanComponent,ZhongsanhezhiweishuComponent,ZhongsanteshuhaomaComponent,HousanzhixuanfushiComponent,
    HousanzhixuanhezhiComponent,HousanzhixuankuaduComponent,HousanzhixuanzuheComponent,HousanzusanComponent,HousanbaodanComponent,
    HousanzuliuComponent,HousanhezhiweishuComponent,HousanteshuhaomaComponent,HousanzuxuanhezhiComponent,
    ErxingzhixuanhouerkuaduComponent,ErxingzhixuanqianerfushiComponent,ErxingzhixuanqianerhezhiComponent,ErxingzhixuanhouerhezhiComponent,
    ErxingzhixuanqianerkuaduComponent,ErxingzuxuanhouerhezhiComponent,ErxingzuxuanhouerbaodanComponent,ErxingzuxuanqianerfushiComponent,ErxingzuxuanqianerhezhiComponent,
    ErxingzuxuanqianerbaodanComponent,ErxingzhixuanhouerfushiComponent,ErxingzuxuanhouerfushiComponent,ErxingzhixuanhouerkuaduComponent,YixingdingweidanComponent,

    HousanyimabudingweiComponent,HousanermabudingweiComponent,QiansanyimabudingweiComponent,
    QiansanermabudingweiComponent,ZhongsanyimabudingweiComponent,ZhongsanermabudingweiComponent,SixingyimabudingweiComponent,SixingermabudingweiComponent,WuxingermabudingweiComponent,
    WuxingsanmabudingweiComponent,

    HouerdaxiaodanshuangComponent,HousandaxiaodanshuangComponent,QianerdaxiaodanshuangComponent,QiansandaxiaodanshuangComponent,
    ZhongsandaxiaodanshuangComponent,

    RenxuanerzhixuanhezhiComponent,RenxuanerzuxuanfushiComponent,RenxuanerzuxuanhezhiComponent,RenxuanerzhixuanfushiComponent,
    RenxuansanzhixuanhezhiComponent,RenxuansanzusanfushiComponent,RenxuansanzhixuanfushiComponent,RenxuansanzuliufushiComponent,RenxuansanzuxuanhezhiComponent,
    RenxuansizhixuanfushiComponent,Renxuanzuxuan24Component, Renxuanzuxuan6Component ,
    Renxuanzuxuan12Component,Renxuanzuxuan4Component,

  ],
  imports: [
    IonicPageModule.forChild(ZhixuanfushiComponent),
    IonicPageModule.forChild(WuxingzhixuanzuheComponent),IonicPageModule.forChild(Zuxuan120Component),IonicPageModule.forChild(Zuxuan60Component),IonicPageModule.forChild(Zuxuan30Component),
    IonicPageModule.forChild(Zuxuan10Component),IonicPageModule.forChild(Zuxuan20Component),IonicPageModule.forChild(Zuxuan5Component),IonicPageModule.forChild(SiXingZhixuanfushiComponent), 
    IonicPageModule.forChild(SixingzhixuanzuheComponent), IonicPageModule.forChild(Zuxuan24Component), IonicPageModule.forChild(Zuxuan12Component) ,
    IonicPageModule.forChild(Zuxuan6Component), IonicPageModule.forChild(Zuxuan4Component),IonicPageModule.forChild(QisanzhixuanhezhiComponent),
    IonicPageModule.forChild(QisanzhixuankuaduComponent),IonicPageModule.forChild( QisanzhixuanfushiComponent),IonicPageModule.forChild(QisanzhixuanzuheComponent),
    IonicPageModule.forChild(Qisanzuxuan3Component),IonicPageModule.forChild(Qisanzuxuan6Component),IonicPageModule.forChild(QisanzuxuanhezhiComponent),
    IonicPageModule.forChild(QisanbaodanComponent), IonicPageModule.forChild(QiansanhezhiweishuComponent), IonicPageModule.forChild(QisantesuhaomaComponent),
    IonicPageModule.forChild(ZhongsanzhixuanfushiComponent), IonicPageModule.forChild(ZhongsanzhixuanhezhiComponent), IonicPageModule.forChild(ZhongsanzhixuankuaduComponent),
    IonicPageModule.forChild(ZhongsanzhixuanzuheComponent), IonicPageModule.forChild(Zhongsanzuxuan6Component), IonicPageModule.forChild(Zhongsanzuxuan3Component),
    IonicPageModule.forChild(ZhongsanzuxuanhezhiComponent), IonicPageModule.forChild(ZhongsanbaodanComponent), IonicPageModule.forChild(ZhongsanhezhiweishuComponent),
    IonicPageModule.forChild(ZhongsanteshuhaomaComponent),
    IonicPageModule.forChild(HousanzhixuanfushiComponent),IonicPageModule.forChild(HousanzhixuanhezhiComponent),IonicPageModule.forChild(HousanzhixuankuaduComponent),
    IonicPageModule.forChild(HousanzhixuanzuheComponent),IonicPageModule.forChild(HousanzusanComponent),IonicPageModule.forChild(HousanbaodanComponent),
    IonicPageModule.forChild(HousanzuliuComponent),IonicPageModule.forChild(HousanhezhiweishuComponent),IonicPageModule.forChild(HousanteshuhaomaComponent),
    IonicPageModule.forChild(HousanzuxuanhezhiComponent),

    IonicPageModule.forChild(ErxingzhixuanhouerhezhiComponent),IonicPageModule.forChild(ErxingzhixuanqianerfushiComponent),IonicPageModule.forChild(ErxingzhixuanqianerhezhiComponent),
    IonicPageModule.forChild(ErxingzhixuanqianerkuaduComponent),IonicPageModule.forChild(ErxingzuxuanhouerhezhiComponent),IonicPageModule.forChild(ErxingzuxuanhouerbaodanComponent),
    IonicPageModule.forChild(ErxingzuxuanqianerfushiComponent),IonicPageModule.forChild(ErxingzuxuanqianerhezhiComponent),IonicPageModule.forChild(ErxingzuxuanqianerbaodanComponent),
    IonicPageModule.forChild(ErxingzhixuanhouerfushiComponent),IonicPageModule.forChild(ErxingzuxuanhouerfushiComponent),IonicPageModule.forChild(ErxingzhixuanhouerkuaduComponent),

    IonicPageModule.forChild(YixingdingweidanComponent),

    IonicPageModule.forChild(HousanyimabudingweiComponent),IonicPageModule.forChild(HousanermabudingweiComponent),IonicPageModule.forChild(QiansanyimabudingweiComponent),
    IonicPageModule.forChild(QiansanermabudingweiComponent),IonicPageModule.forChild(ZhongsanyimabudingweiComponent),IonicPageModule.forChild(ZhongsanermabudingweiComponent),
    IonicPageModule.forChild(SixingyimabudingweiComponent),IonicPageModule.forChild(SixingermabudingweiComponent),IonicPageModule.forChild(WuxingermabudingweiComponent),
    IonicPageModule.forChild(WuxingsanmabudingweiComponent),

    IonicPageModule.forChild(HouerdaxiaodanshuangComponent),IonicPageModule.forChild(HousandaxiaodanshuangComponent),IonicPageModule.forChild(QianerdaxiaodanshuangComponent),
    IonicPageModule.forChild(QiansandaxiaodanshuangComponent),IonicPageModule.forChild(ZhongsandaxiaodanshuangComponent),

    IonicPageModule.forChild(QiansandaxiaodanshuangComponent),IonicPageModule.forChild(QiansandaxiaodanshuangComponent),IonicPageModule.forChild(QiansandaxiaodanshuangComponent),
    IonicPageModule.forChild(QiansandaxiaodanshuangComponent),IonicPageModule.forChild(QiansandaxiaodanshuangComponent),IonicPageModule.forChild(QiansandaxiaodanshuangComponent),
    IonicPageModule.forChild(QiansandaxiaodanshuangComponent),IonicPageModule.forChild(QiansandaxiaodanshuangComponent),IonicPageModule.forChild(QiansandaxiaodanshuangComponent),
    IonicPageModule.forChild(QiansandaxiaodanshuangComponent),IonicPageModule.forChild(QiansandaxiaodanshuangComponent),IonicPageModule.forChild(QiansandaxiaodanshuangComponent),
    IonicPageModule.forChild(QiansandaxiaodanshuangComponent),IonicPageModule.forChild(QiansandaxiaodanshuangComponent),
    
    IonicPageModule.forChild(RenxuanerzhixuanhezhiComponent),IonicPageModule.forChild(RenxuanerzuxuanfushiComponent),IonicPageModule.forChild(RenxuanerzuxuanhezhiComponent),
    IonicPageModule.forChild(RenxuanerzhixuanfushiComponent),IonicPageModule.forChild(RenxuansanzhixuanhezhiComponent),IonicPageModule.forChild(RenxuansanzusanfushiComponent),
    IonicPageModule.forChild(RenxuansanzhixuanfushiComponent),IonicPageModule.forChild(RenxuansanzuliufushiComponent),IonicPageModule.forChild(RenxuansanzuxuanhezhiComponent),
    IonicPageModule.forChild(RenxuansizhixuanfushiComponent),IonicPageModule.forChild(Renxuanzuxuan24Component),IonicPageModule.forChild(Renxuanzuxuan6Component),
    IonicPageModule.forChild(Renxuanzuxuan12Component),IonicPageModule.forChild(Renxuanzuxuan4Component)

  ]})
export class WuXingPageModule {}