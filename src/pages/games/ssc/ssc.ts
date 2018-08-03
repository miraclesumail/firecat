import {
    Component, ViewChild, ViewContainerRef, ComponentFactory,
    ComponentRef, ComponentFactoryResolver, OnDestroy
  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App, LoadingController } from 'ionic-angular';
import { CommonProvider } from "../../../providers/common/common";

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Effect } from '../../../baseComponent'
import { Events } from 'ionic-angular';
import { CountTipComponent } from '../../../components/count-tip/count-tip'
import { BasketDataProvider } from '../../../providers/basket-data/basket-data'
import { GamemenuComponent } from '../../../components/gamemenu/gamemenu'
import { MenumodalComponent } from '../../../components/menumodal/menumodal'
import { UtilProvider } from '../../../providers/util/util'
import { gameConfig } from '../../../components/ssc-config'
import { GameTrendPage } from '../../game-trend/game-trend'
import * as $ from 'jquery'
import * as Hammer from 'hammerjs';
/**
 * Generated class for the SscPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 */

@IonicPage()
@Component({
  selector: 'page-ssc',
  templateUrl: 'ssc.html',
  providers:[GamemenuComponent]
})
export class SscPage extends Effect{
     
    @ViewChild("gameContainer", { read: ViewContainerRef }) gameContainer: ViewContainerRef;
    componentRef: ComponentRef<any>;
    //showTip:any = ['当前遗漏', '30期冷热', '平均遗漏', '最大遗漏']
    haveChoosen:any[] = ['当前遗漏']

    observable: Observable<any>;
    observer: Observer<any>;
    record: any ;
    //助手菜单
    menus:any =  ['走势图','近期开奖','号码统计','玩法说明']

    list: any ;
    loadInfo:any;

    missData:any
   
    maxNumber:number;
    loadNumber:number = 0
    over:boolean;
    trHeight:number;
    high:number = 0
    timer:any
    gameConfig:any;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public resolver: ComponentFactoryResolver,public app:App,public loadingCtrl:LoadingController,
    public common:CommonProvider, public gamemenu:GamemenuComponent, public util:UtilProvider,public basket:BasketDataProvider, public events:Events) {
        super(common,gamemenu,modalCtrl,navCtrl,resolver,events)
        this.gameConfig = gameConfig

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
        },2000)
    }

    handleBall(ele){
        function judge(number){
            if(number%2 == 0 && number >=5)
                return '大双'
            if(number%2 == 0 && number < 5)
                return '小双'
            if(number%2 != 0 && number >= 5)
                return '大单'
            if(number%2 != 0 && number < 5)
                return '小单'
        } 

        function tell(balls){
            let arr = balls.replace(/\s+/g, "").split('').slice(-3), temp = []
            for(let i = 0;i<arr.length;i++){
                if(temp.indexOf(arr[i]) != -1)
                    return true 
                temp.push(arr[i])
            }    
            return false
        }

        return {...ele, number:ele.number.substr(-7),balls:ele.code.replace(/\s+/g, ""), shiwei:judge(ele.code.replace(/\s+/g, "").split('')[3]) ,
               gewei:judge(ele.code.replace(/\s+/g, "").split('')[4]), housan:tell(ele.code) ? '组三':'组六'
        }                   
    }

    ionViewDidLoad() {
        this.trHeight = document.querySelector('.tr').offsetHeight
        this.initHisBox('ssc-content')
        console.log(document.getElementById('qq'))
        console.log('wgwgeggg3ggergergg')
        console.log($('body').css('height'))
 
        $('.modify').css('height', (parseInt($('body').css('height')) - 202) + 'px')
        $('.modify').css('top',  '152px')
        //this.watchScroll()
        console.log($('.bet-box').offset().top)
      }

    ionViewDidEnter(){
        this.events.subscribe('changeRecord', () => {
            this.fetchListData()
        })    
        this.util.shakePhone(this.util.randomChoose)
    }  

    ionViewWillLeave(){
        console.log('dwfqwfwqef')
        if(this.util.listeners.length){
            this.util.listeners.forEach(element => {
                 window.removeEventListener('devicemotion',element,false)
            })
        }
        clearInterval(this.timer)
        this.events.unsubscribe('changeRecord')
        this.util.listeners = []
    }

    watchScroll(){
        let mc = new Hammer(document.getElementById('ball-area'));
        mc.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});
        mc.on('swipedown', () => {
            if(this.loadNumber == this.maxNumber + 1)
                return
            this.loadNumber ++
            this.high = this.loadNumber == 1 ? 81 : this.loadNumber == 3 ? 248 : 216
        })

        mc.on('swipeup', () => {
            if(this.loadNumber == 0)
                return
            this.loadNumber --
            this.high = this.loadNumber == 1 ? 81 : this.loadNumber == 2 ? 216 : 0
        })
    }

    getBack(){
        console.log('cwcwc')
        var obj = $(".his-box"),his = obj.css('height');
        console.log(his)
        if(his > 54)
            obj.animate({height: "54px"}, 100);
   }

    resetData(){
        this.util.resetData()
    }

    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
          content: '数据加载中...'
        });
        loading.present()
        return loading
      }
}
