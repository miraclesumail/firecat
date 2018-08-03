import {
  Component, ViewChild, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy
} from '@angular/core';
import { Events, Navbar } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { TrendHeadComponent } from '../../components/gametrend/trend-head/trend-head'
import { IonicPage, NavController, NavParams,  Slides } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util'
import { CommonProvider } from "../../providers/common/common";
import { WuxingComponent } from '../../components/gametrend/wuxing/wuxing'
import { config, judgeTrend } from '../../components/gameTrend.config'
import { BasketDataProvider } from '../../providers/basket-data/basket-data'
import * as ssc from '../../components/ssc-config'
import * as d5 from '../../components/115-config'
import * as $ from 'jquery'

const gameConfig = Object.assign(ssc.gameConfig, d5.gameConfig)

@IonicPage()
@Component({
  selector: 'page-game-trend',
  templateUrl: 'game-trend.html',
})
export class GameTrendPage {
  componentRef: ComponentRef<any>;
  @ViewChild('contentSlides') contentSlides: Slides;
  @ViewChild("gameTrendContainer", { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild("noshowContainer", { read: ViewContainerRef }) nocontainer: ViewContainerRef;
  @ViewChild(Navbar) navbar: Navbar;
  
  observable: Observable<any>;
  observer: Observer<any>;

 // @ViewChild("headContainer", { read: ViewContainerRef }) head: ViewContainerRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,public events:Events, public util:UtilProvider, public common:CommonProvider, public basket:BasketDataProvider,private resolver: ComponentFactoryResolver) {
    //this.head.clear()
    this.observable = new Observable((observer: Observer<any>) => {
      this.observer = observer;
    })
    this.common.getMissObservable()
    

    $('body').on('touchstart', '.ball-tap', function(){
  
       let text = $(this).find('#ball').text()
       let dom = $(this).hasClass('special') ? $('<span class="tips">'  + text + '</span>'): $('<span class="tip">'  + text + '</span>')
       $(this).append(dom)

    }).on('touchend', '.ball-tap', function(){
       $(this).find('.tip').remove()
       $(this).find('.tips').remove()
    })

    this.observable.subscribe((val:Promise<any>) => {
      val.then(() => {
          this.drawCanvas()
      })
    })

    this.events.subscribe('changeIndex', (val) => {
       this.segmentChanged(val)
    })

    this.common.fetchRecord()
  }

  ionViewWillEnter(){
     //传一个布尔值是否重新渲染组件
     this.drawTrend(true)
     //this.events.publish('getMethod')
  }

  ionViewDidLoad() {
    //当退回到游戏页面  需要重新加载玩法
    this.navbar.backButtonClick = (e)=>{
      this.navCtrl.pop()
      this.events.publish('reload')
    }
  }

  ionViewDidLeave(){
    this.container.clear()
   }

  drawCanvas(){
    let methodName = this.common.method + this.common.smallMethod

    if(this.common.method == '大小单双'){
      let container = document.getElementsByClassName('trend-container'),canvas 
      // 加载新数据后需要清楚canvas
     // for(let i = 0;i<containers.length;i++){
      for(let i = 0;i<container.length;i++){
          canvas = container[i].querySelector('canvas')
          if(canvas){
            let ctx = canvas.getContext('2d')
            ctx.clearRect(0,0,canvas.width,canvas.height)
            container[i].removeChild(canvas)
          } 

          canvas = document.createElement('canvas')
          canvas.width = container[i].offsetWidth
          canvas.height = container[i].offsetHeight
          canvas.setAttribute('id','canvas')
          container[i].appendChild(canvas)
          let ctx = canvas.getContext('2d')
          ctx.strokeStyle = '#f5d300'
          ctx.lineWidth = 1
          ctx.beginPath()


          let nodes = container[i].querySelectorAll('.highlight')

          let nodeOdd = [].slice.call(nodes).filter((ele,index) => index % 2 == 1)
          let nodeEven = [].slice.call(nodes).filter((ele,index) => index % 2 == 0)
          for(let i=0; i< nodeOdd.length; i++){
    
              if(i == 0)
                ctx.moveTo(nodeOdd[i].offsetLeft + 10,nodeOdd[i].offsetTop + 10)
              else
                ctx.lineTo(nodeOdd[i].offsetLeft + 10,nodeOdd[i].offsetTop + 10)
          }

          for(let i=0; i< nodeEven.length; i++){
              if(i == 0)
                ctx.moveTo(nodeEven[i].offsetLeft + 10,nodeEven[i].offsetTop + 10)
              else
                ctx.lineTo(nodeEven[i].offsetLeft + 10,nodeEven[i].offsetTop + 10)
          }
          ctx.stroke()
          ctx.closePath()
       }  
       return    
    }

    if(["前三直选和值", "前三组选和值", "中三直选和值", "中三组选和值", "后三直选和值", "后三组选和值", "二星后二和值", "二星前二和值"].indexOf(methodName) != -1){
    //if(this.common.smallMethod == '直选和值'){
      //let container = document.getElementsByClassName('trend-container')[0],canvas = container.getElementsByTagName('canvas')[0]
      let container = document.getElementById('trend-container'),canvas = container.querySelector('canvas')
      // 加载新数据后需要清楚canvas
     // for(let i = 0;i<containers.length;i++){
          
      if(canvas){
          let ctx = canvas.getContext('2d')
          ctx.clearRect(0,0,canvas.width,canvas.height)
          container.removeChild(canvas)
      } 
      canvas = document.createElement('canvas')
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
      canvas.setAttribute('id','canvas')
      container.appendChild(canvas)
      let ctx = canvas.getContext('2d')
      ctx.strokeStyle = '#7ED321'
      ctx.lineWidth = 1
      ctx.beginPath();
      let nodes = container.querySelectorAll('.highlight')
      for(let i=0; i< nodes.length; i++){

          if(i == 0)
            ctx.moveTo(nodes[i].offsetLeft + 10,nodes[i].offsetTop + 10)
          else
            ctx.lineTo(nodes[i].offsetLeft + 10,nodes[i].offsetTop + 10)
      }
      ctx.stroke()
      ctx.closePath()
    
   }else{
      let containers = document.getElementsByClassName('trend-container')
      // 加载新数据后需要清楚canvas
      for(let i = 0;i<containers.length;i++){
           let canvas = containers[i].querySelector('canvas')
           if(canvas){
              let ctx = canvas.getContext('2d')
              ctx.clearRect(0,0,canvas.width,canvas.height)
              containers[i].removeChild(canvas)
           }
      }
      console.log(containers.length)
              for(let i = 0;i<containers.length;i++){

              let container = document.getElementsByClassName('trend-container')[i]
              let canvas = document.createElement('canvas')
              canvas.width = container.offsetWidth
              canvas.height = container.offsetHeight
              container.appendChild(canvas)
              let ctx = canvas.getContext('2d')
              ctx.strokeStyle = '#7ED321'
              ctx.lineWidth = 1
              ctx.beginPath();
              let nodes = container.querySelectorAll('.highlight')
              for(let i=0; i< nodes.length; i++){
                  if(i == 0)
                    ctx.moveTo(nodes[i].offsetLeft + 10,nodes[i].offsetTop + 10)
                  else
                    ctx.lineTo(nodes[i].offsetLeft + 10,nodes[i].offsetTop + 10)
              }
              ctx.stroke()
              ctx.closePath()
            }
    }
}

  create(gameMethod:string, flag:boolean):Promise<any>{
    if(flag){
      let trendComponent:any;
          switch(+this.common.series_id){
              case 1:
                 trendComponent = judgeTrend('SSC', gameMethod)
                 break
              case 2:
                 trendComponent= judgeTrend('Xuan5', gameMethod)  
                 break
          }
          const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(trendComponent.component)
          this.componentRef = this.container.createComponent(factory)
          this.componentRef.instance.chooseIndex = this.navParams.get('index')
          this.componentRef.instance.menus = trendComponent.menus
          this.componentRef.instance.position = trendComponent.position
    }
   
    //上拉加载数据 canvas重回
    return new Promise((resolve,reject) => {
        setTimeout(resolve,0)
    })
}

  drawTrend(flag:boolean){
    if(flag)
        this.container.clear()

    this.observer.next(this.create(this.common.method + this.common.smallMethod, flag))
   
  }

  slideChanged(){
    let index = this.contentSlides.getActiveIndex();
    console.log(index)
   // this.util.choose = this.util.menus[index]
  }

  segmentChanged($event){
    console.log($event.value)
    this.contentSlides.slideTo(this.util.menus.indexOf($event.value))
  }

  goBasket(){
    if(!this.common.count)
      return
    this.basket.addBetData()
    this.navCtrl.push('BasketPage')
  }

  methodChange($event){
    console.log('trend change')
    console.log(gameConfig)
    let component = gameConfig[$event]
    console.log(component)
    this.nocontainer.clear()
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component)
    this.componentRef = this.nocontainer.createComponent(factory)
    this.common.componentRef = this.componentRef
    this.common.getMissObservable()
    this.drawTrend(true)
    //this.componentRef.instance.choose = this.haveChoosen
  }

  async doRefresh(refresher){
     console.log('ewfwfwf')
     setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
     }, 2000);
     let record = await this.common.fetchRecord()
     let miss = await this.common.getMissObservable()

     this.componentRef.instance.refreshData().then(() => {
          this.drawTrend(false)
     })  
  }
}
