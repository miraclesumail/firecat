import {
  Component, ViewChild, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy
} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App,  LoadingController } from 'ionic-angular';
import { CommonProvider } from "../../../providers/common/common";
import { Effect } from '../../../baseComponent'
import { Events } from 'ionic-angular';
import { CountTipComponent } from '../../../components/count-tip/count-tip'

import { BasketDataProvider } from '../../../providers/basket-data/basket-data'
import { gameConfig } from '../../../components/115-config'

import { GamemenuComponent } from '../../../components/gamemenu/gamemenu'
import { MenumodalComponent } from '../../../components/menumodal/menumodal'
import { UtilProvider } from '../../../providers/util/util'

import * as $ from 'jquery'
import * as Hammer from 'hammerjs';

/**
 * Generated class for the Xuan5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xuan5',
  templateUrl: 'xuan5.html',
  providers:[GamemenuComponent]
  
})
export class Xuan5Page extends Effect{
   @ViewChild("gameContainer", { read: ViewContainerRef }) gameContainer: ViewContainerRef;
   componentRef: ComponentRef<any>;
   haveChoosen:any[] = ['当前遗漏']
   gameConfig:any;
   record: any = [
    {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23056, balls: '34567', shiwei: '大单', gewei: '小双', housan: '组六'},
    {number: 23057, balls: '12345', shiwei: '大单', gewei: '小双', housan: '组六'},
   ]
   loadInfo:any;
   list: any = []

   maxNumber:number
   loadNumber:number = 0
   //助手菜单
   menus:any =  ['走势图','近期开奖','号码统计','玩法说明']


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public resolver: ComponentFactoryResolver,public app:App,public loadingCtrl:LoadingController,
    public common:CommonProvider, public gamemenu:GamemenuComponent, public util:UtilProvider,public basket:BasketDataProvider,public events:Events) {
        super(common,gamemenu,modalCtrl,navCtrl,resolver,events)
        this.gameConfig = gameConfig
        this.list = this.record.slice(0, 2)

        this.events.subscribe('reload',()=>{
            this.renderMethodContainer()
        })

        this.common.getMissObservable()
        this.loadInfo = this.presentLoadingDefault()

        this.common.initData().then(
            () => {
                this.renderMethodContainer()
                this.loadInfo.dismiss()
                $('#qq').show()  
            }
        )

        setTimeout(() => {
            this.loadInfo.dismiss()
        },3000)
  }

  handleBall(ele){
    let tempArr = ele.code.split(' ').map(ele => Number(ele))
    let total = tempArr.reduce((a,b) => a + b)
    let kuadu = Math.max(...tempArr) - Math.min(...tempArr)
   
    let da = tempArr.filter(el => el > 5).length
    let daxiao = da + ':' + (5 - da)
    let odd = tempArr.filter(el => el%2 != 0).length
    let oddeven = odd + ':' + (5 -odd)
    console.log(ele.code)
    console.log(ele.code.split(' '))
    return {...ele, number:ele.number.substr(5,ele.number.length),balls:tempArr.map(ele => ele ? ('0'+ele).slice(-2) : '').join(' '), hezhi:total, kuadu:kuadu,
           daxiao:daxiao, oddeven:oddeven
    }                   
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad Xuan5Page');
    $('.modify').css('height', (parseInt($('body').css('height')) - 202) + 'px')
    $('.modify').css('top',  '152px')
    this.initHisBox('d5-content')
  }

  ionViewDidEnter(){
    this.events.subscribe('changeRecord', () => {
      this.fetchListData()
    })    
    this.util.shakePhone(this.util.randomChoose)
 }  

 ionViewWillLeave(){
    console.log('dwfqwfwqef')
    //console.log(window.getEventListeners(window))
    if(this.util.listeners.length){
        this.util.listeners.forEach(element => {
            window.removeEventListener('devicemotion',element,false)
        })
    }
    clearInterval(this.timer)
    this.events.unsubscribe('changeRecord')
    this.util.listeners = []
 
 }

   resetData(){
       if(this.common.smallMethod.indexOf('组选胆拖') != -1){
            console.log('dwf')
            this.componentRef.instance.arr = []
       }
       this.util.resetData()
   }

   getBack(){
    console.log('cwcwc')
    var obj = $(".his-box"),his = obj.css('height');
    console.log(his)
    if(his > 54)
        obj.animate({height: "54px"}, 100);
   }


   presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
    loading.present()
    return loading
  }

}
