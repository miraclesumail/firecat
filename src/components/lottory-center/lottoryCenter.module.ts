import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {K3BaseTrendComponent} from './k3-base-trend/k3-base-trend';
import {K3ShapeTrendComponent} from './k3-shape-trend/k3-shape-trend';
import {K3KaijiangComponent} from './k3-kaijiang/k3-kaijiang';
import {K3CoodHotComponent} from './k3-cood-hot/k3-cood-hot';
import {LhcBoseComponent} from './lhc-bose/lhc-bose';
import {LhcKaijiangComponent} from './lhc-kaijiang/lhc-kaijiang';
import {LhcShengxiaoComponent} from './lhc-shengxiao/lhc-shengxiao';
import {SscDaxiaoComponent} from './ssc-daxiao/ssc-daxiao';
import {SscDanshuangComponent} from './ssc-danshuang/ssc-danshuang';
import {SscKaijiangComponent} from './ssc-kaijiang/ssc-kaijiang';
import {YKaijiangComponent} from './y-kaijiang/y-kaijiang';
import {YDistributeComponent} from './y-distribute/y-distribute';





@NgModule({
    declarations: [
      K3BaseTrendComponent,K3ShapeTrendComponent,K3KaijiangComponent,K3CoodHotComponent,LhcBoseComponent,
      LhcKaijiangComponent,LhcShengxiaoComponent,SscDaxiaoComponent,SscDanshuangComponent,SscKaijiangComponent,
      YKaijiangComponent,YDistributeComponent
    ],
    imports: [
      IonicPageModule.forChild(K3BaseTrendComponent),
      IonicPageModule.forChild(K3ShapeTrendComponent),
      IonicPageModule.forChild(K3KaijiangComponent),
      IonicPageModule.forChild(K3CoodHotComponent),
      IonicPageModule.forChild(LhcBoseComponent),
      IonicPageModule.forChild(LhcKaijiangComponent),
      IonicPageModule.forChild(LhcShengxiaoComponent),
      IonicPageModule.forChild(SscDaxiaoComponent),
      IonicPageModule.forChild(SscDanshuangComponent),
      IonicPageModule.forChild(SscKaijiangComponent),
      IonicPageModule.forChild(YKaijiangComponent),
      IonicPageModule.forChild(YDistributeComponent),
    ]
  })
  export class lCenterModule {}
