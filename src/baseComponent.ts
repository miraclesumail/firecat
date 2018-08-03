import * as $ from 'jquery';
import {
    Component, ViewChild, ViewContainerRef, ComponentFactory,
    ComponentRef, ComponentFactoryResolver, OnDestroy
  } from '@angular/core';
import { CommonProvider } from './providers/common/common'
import { GamemenuComponent } from './components/gamemenu/gamemenu'
import { ModalController,NavController } from 'ionic-angular';
import { CountTipComponent } from './components/count-tip/count-tip'
import { Events } from 'ionic-angular';

import * as ssc from './components/ssc-config'
import * as d5 from './components/115-config'

const gameConfig = Object.assign(ssc.gameConfig, d5.gameConfig)

let tt = 0;

function easeOutCubic(t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
}

export class Effect{
    @ViewChild("gameContainer", { read: ViewContainerRef }) gameContainer: ViewContainerRef;
    
    timer:any;
    componentRef: ComponentRef<any>;
    haveChoosen:any[] = ['当前遗漏']

    gameConfig:any;
    list: any ;

    canDrag:boolean = true

    maxNumber:number;
    
    countTime:any = {
        'total': '',
        'days': '',
        'hours': '',
        'minutes': '',
        'seconds': ''
    }

    constructor(public common:CommonProvider, public gamemenu:GamemenuComponent, public modalCtrl: ModalController,public navCtrl:NavController,public resolver: ComponentFactoryResolver,public events:Events){
        let self = this;

        //拉去倒计时
        this.common.produce()
        
        $(document).on('click','.body-bg',function(){
            if(self.common.visible = 'visable'){
                console.log('fff');self.gamemenu.toggle()
            }
            self.common.small = self.common.tempSmall
            self.common.bigId = self.common.tempBigId
           // self.common.smallId = self.common.tempBigId
            $('.modal').removeClass('active')
            $('.tri-arrow').removeClass('current')
        });

        this.fetchListData()

        this.events.subscribe('changeRecord', () => {
            //新一期倒计时开始
            this.fetchListData()

        //     let length = this.common.historyList.length, historyList = this.common.historyList, number     
        //    this.list = this.list.slice(0,this.list.length - 2)
        //    if(this.common.series_id == 1)
        //        number =  (+(historyList[0].number) + 1 +'').slice(-7)
        //    else if(this.common.series_id == 2){
        //        let splitArr = historyList[0].number.substr(5,historyList[0].number.length).split('-')
        //        number = splitArr[0] + '-' + (+splitArr[1] + 1) 
        //    }         
        //    this.list.unshift({number:number,balls:'',time:''})     
        //     if(this.list.length > 2){
        //         this.maxNumber = Math.ceil(this.list.length/5)
        //     }else{
        //         this.maxNumber = 0
        //     }
        //    console.log(this.list)
        //    this.timer =  setInterval(() => {
        //         this.common.fetchRecord().then(() => {
        //              console.log('fetch arrive')
        //              if(this.common.historyList[0].number.slice(-7) == this.list[0].number){
        //                 this.list = this.common.historyList.map(this.handleBall).slice(0,10)
        //                 if(this.list.length > 2){
        //                     this.maxNumber = Math.ceil(this.list.length/5)
        //                 }else{
        //                     this.maxNumber = 0
        //                 }
        //                 clearInterval(this.timer)
        //              }
        //         })
        //     },10000)
        })
    }

    //抓取历史开奖进行处理
    fetchListData(){
        this.common.fetchRecord().then(() => {
            this.list = this.common.historyList.slice(-10).map(this.handleBall).reverse()
            if(this.list.length > 2){
                this.maxNumber = Math.ceil(this.list.length/5)
            }else{
                this.maxNumber = 0
            }

            if(this.list.filter(item => !item.balls).length){
                this.timer = setInterval(() => {
                    this.common.fetchRecord().then(() => {
                        this.list = this.common.historyList.slice(-10).map(this.handleBall).reverse()
                        if(this.list.length > 2){
                            this.maxNumber = Math.ceil(this.list.length/5)
                        }else{
                            this.maxNumber = 0
                        }

                        if(!this.list.filter(item => !item.balls).length)
                            clearInterval(this.timer)
                    })
                },10000)
            }
        })  
    }

    renderMethodContainer(){
        this.gameContainer.clear()
        let method
        if(this.common.method == '二星' || this.common.method == '任选'){
            method = this.common.method + this.common.secondKind + this.common.smallMethod
        }else{
            method = this.common.method + this.common.smallMethod
        }
        console.log(method)
        
        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(gameConfig[method])
        this.componentRef = this.gameContainer.createComponent(factory)
        this.componentRef.instance.choose = this.haveChoosen
        this.common.componentRef = this.componentRef
    }

    move(){
        tt += 1000/60;
        let width = document.getElementById('bet-statistic').offsetWidth
        let ball = document.getElementById('ball');
        if(tt < 600){
            let left = Math.ceil(easeOutCubic(tt,50,width,600))
            ball.style.left = left + 'px'

            // let high = -(width*(left - 150 ) -((left - 150)*(left - 150)))/500;
            let high = width*width/1200
            let top = -(width - left + 50)*(left -50)/200
            // y = -(x- width)x/300 = (width - left + 150)(left -150)/300   high = width*width/1200
            ball.style.top =  top  + 'px'
            if(Math.abs(top)>=high){
                let time = 600 - tt
                $('#ball').animate({width:0,height:0},time,function(){
                    console.log('finish')
                })
            }
            top = Math.abs(high)

            requestAnimationFrame(this.move.bind(this))
        }else{
            this.common.cartNumber++
            $('#ball').remove()
            tt = 0
        }
    }

    goToBasket(){
        console.log('gobasket')
        this.navCtrl.push('BasketPage',{'index':this.componentRef})
    }

    goKaiJiang(){
        this.navCtrl.push('GameTrendPage',{'index':0})   
    }

    changeMenu(val){
        // if(this.haveChoosen.indexOf(val) > -1){
        //      let index = this.haveChoosen.indexOf(val)
        //      this.haveChoosen.splice(index,1)
        // }else{
        //      this.haveChoosen.push(val)
        //      // 判断是否冷热  this.util.fetch('lengre')
        // }
        for(let j = 0;j<this.haveChoosen.length;j++){
            if(val.indexOf(this.haveChoosen[j] == -1)){
                this.haveChoosen.splice(this.haveChoosen[j],1)
                j--
            }      
        }

        for(let i =0;i<val.length;i++){
            if(this.haveChoosen.indexOf(val[i]) == -1)
               this.haveChoosen.push(val[i])    
        }
        console.log(val)
        console.log(this.haveChoosen)
        this.componentRef.instance.choose = this.haveChoosen
   }

   
   check(choice){
       return this.haveChoosen.indexOf(choice) > -1
   }

   //切换小玩法
   methodChange($event){
    //    this.haveChoosen = ['当前遗漏']
       console.log($event)
       let component = gameConfig[$event]
       this.gameContainer.clear()
       const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component)
       this.componentRef = this.gameContainer.createComponent(factory)
       this.common.componentRef = this.componentRef
       console.log(this.haveChoosen)
       this.componentRef.instance.choose = this.haveChoosen
   }

   handleBall(ele){}

  

   getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  }

   getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }
    var angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    }
    return result;
  }

  initHisBox(idstr) {
    let self = this;
    var startx, starty;
    console.log($('.bet-box').offset().top)
    console.log(document.getElementById('qq'))
   
    document.getElementById('qq').addEventListener("click", function(e){
        var obj = $(".his-box"),his = obj.css('height');
        if(parseInt(his) > 54){
            obj.animate({height: "54px"}, 100)
            $('.modify').css('height', (parseInt($('body').css('height')) - 202) + 'px')
            $('.modify').css('top',  '152px')
            $('.modify').addClass('scroll')
        }         
    },true)
  
    document.getElementById(idstr).addEventListener("touchstart",
      function (e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
      }, false);
    document.getElementById(idstr).addEventListener("touchend",
      function (e) {
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        // var kscroll = $('#ks-content .scroll-content');
        // var lscroll = $('.lhc-content-child .scroll-content');
        var direction = self.getDirection(startx, starty, endx, endy);
        var len = $('.his-box .his-line').length;
        var obj = $(".his-box");
        var his = obj.css('height');
        console.log(his)
        switch (direction) {
          case 0:
            break;
          case 1:
            console.log('vgwgwgwgwegw')
            console.log($('.bet-box').offset().top)
            if (parseInt(his) <= 135 && parseInt(his) > 54) {
              obj.animate({height: "54px"}, 100);
              var h = len >= 5 ? 135 : (len - 2)*27 + 54  
              var top = parseInt($('.modify').css('top'))
              var height = parseInt($('.modify').css('height'))
              $('.modify').css('top', top + 54 - h + 'px')
              $('.modify').css('height', height + h - 54 + 'px')
              $('.modify').addClass('scroll')

            } else if (parseInt(his) > 135 && parseInt(his) <= len*27) {
                obj.stop().animate({height: "135px"}, 100)
                var top = parseInt($('.modify').css('top'))
                var height = parseInt($('.modify').css('height'))
                $('.modify').css('top', top + 135 - len*27 + 'px')
                $('.modify').css('height', height + len*27 - 135 + 'px')

            } else if (parseInt(his) == (len*27 + 30)){
                console.log('ednd')
                obj.stop().animate({height: (parseInt(his) - 30) + 'px'}, 100)
                var top = parseInt($('.modify').css('top'))
                var height = parseInt($('.modify').css('height'))
                $('.modify').css('top', top - 30 + 'px')
                $('.modify').css('height', height + 30 + 'px')
            }
            break;
          case 2:
            if (his == '54px' && len > 2){
                console.log('frggrweg') 
                console.log($('.bet-box').offset().top)
                if($('.bet-box').offset().top < 151)
                    break
                var h = len >= 5 ? 135 : (len - 2)*27 + 54  
                obj.animate({height:h + 'px'}, 100)   
                var top = parseInt($('.modify').css('top'))
                var height = parseInt($('.modify').css('height'))
                $('.modify').css('top', top + h - 54 + 'px')
                $('.modify').css('height', height + 54 - h + 'px')
                $('.modify').removeClass('scroll')
                 
            } else if (obj.css('height') == '135px' && len > 5) {
              var h = len >= 10 ? 270 : (len - 5)*27 + 135
              obj.animate({height: h + 'px'}, 100);
              var top = parseInt($('.modify').css('top'))
              var height = parseInt($('.modify').css('height'))
              $('.modify').css('top', top + h - 135 + 'px')
              $('.modify').css('height', height + 135 - h + 'px')

            } else if (parseInt(his) == len*27){
                var h = parseInt(his) + 30
                obj.animate({height: h + 'px'}, 100)
                var top = parseInt($('.modify').css('top'))
                var height = parseInt($('.modify').css('height'))
                $('.modify').css('top', top + 30 + 'px')
                $('.modify').css('height', height - 30 + 'px')
            }
            break;
        }
      }, false);
  }
}