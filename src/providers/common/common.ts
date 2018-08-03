import { Injectable } from '@angular/core';
import { Subject} from 'rxjs/Subject';
import { ComponentRef} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ToolsProvider } from '../tools/tools'
import { Events } from 'ionic-angular';
import {ToastController, ModalController} from "ionic-angular";
import { CountTipComponent } from '../../components/count-tip/count-tip'
import { RestProvider } from '../../providers/rest/rest'
import { HttpClientProvider } from '../http-client/http-client'
import * as $ from 'jquery'
import {fakeData} from '../../yilou'
import {observe} from "../tools/observe";
let _ = new observe();
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class CommonProvider {
 // pid = new Subject();

  gameId:any;

  //ssc 115 系列
  series_id:any

  percent:any;

  bonus:number;
  open:boolean = false
  //倒计时
  timer:any;
  //用于存储现在游戏所有的玩法
  gameMethodConfig:Array<any> = [];
  data:any;
  ballData:any = [];

  //所有小种类
  small:any;

  //暂存小种类
  tempSmall:any;

  method:any;
  balance:any = '0';
  //xiao wan fa
  smallKind:any;

  //是否直选 组选
  bigKind:any;
  bigKindEn:any;

  //是否直选
  zhixuan:boolean = true

  //小玩法名称
  smallMethod:string;
  secondKind:string;
  bigIndex:any;

  //小玩法id
  smallId:any

  //小玩法id
  tempSmallId:any

  //大玩法id
  bigId:any

  //暂存大玩法id
  tempBigId:any;

  visible:string = 'invisable';
  tabYuan:string = "元";
  // 元 角 分
  tabVisible:string = 'invisable'

  //形成的注单数
  count:number = 0;
  betPrice:number = 0;

  profits:number;

  // 添加到购物篮数
  cartNumber:number = 0;
  // 随机注单的实例
  componentRef:ComponentRef<any>

  //历史开奖
  historyList:any[]

  missData:any = fakeData
      
  //倒计时是否结束
  countEnd:boolean = false

  //已经加载了的游戏
  hasLoad:number[] = [];

  // odd even big small
  btn:any[];
  singleBtn:Array<any>;

  prizeGroup:any[];

  chooseGroup:any = '1800-7.50%';

  currentNumber:any;
  countTime:any = {
    'total': '',
    'days': '',
    'hours': '',
    'minutes': '',
    'seconds': ''
  }
  trace_max_times:number;

  constructor(public tools:ToolsProvider, public http:HttpClientProvider,public modalCtrl: ModalController, public events:Events,private toastCtrl:ToastController) {
    console.log('Hello CommonProvider Provider');
    // this.pid.subscribe((val) => {
      
    //     this.gameId = val
    //     this.initData()
        
    // })
   
      this.events.subscribe('changeYuan',(val) => {
          console.log('wefwewf')
          //let origin = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
          let percent = this.percent = val == '元' ? 1 : val == '角' ? 0.1 : 0.01
          this.betPrice = this.count*2*percent
         
          console.log(val)
          console.log(percent)
          this.bonus = this.smallKind.prize*percent

          console.log(this.bonus)
          this.tabYuan = val
      })
  }

  //重设倒计时
  resetLotteryData(){
       this.countTime = {
        'total': '',
        'days': '',
        'hours': '',
        'minutes': '',
        'seconds': ''
      }
       this.currentNumber = ''
  }


    async initData():Promise<any>{
        let url = '/api-lotteries-h5/load-data/2/' + this.gameId
        this.gameMethodConfig = (await this.http.fetchData(url)).data.game_ways
        
        console.log(this.gameMethodConfig )
     
        this.bigKind = this.gameMethodConfig[0].children[0].name_cn
        this.bigKindEn = this.gameMethodConfig[0].children[0].name_en

        this.smallKind = this.gameMethodConfig[0].children[0].children[0]

        this.small = this.tempSmall = this.gameMethodConfig[0].children
        this.smallId = this.tempSmallId = this.smallKind.id
        this.bigId = this.tempBigId = this.gameMethodConfig[0].id
        
        console.log(this.smallKind)
        console.log(this.bigKind)
        console.log(this.smallId)
        let percent = this.percent = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
        this.bonus = this.smallKind.prize*percent

        if(this.small.length){
            if(this.small[0].children.length){
                this.ballData = this.tools.copy(
                    this.processBall(this.gameMethodConfig[0].children[0].children[0].bet_number), true)
                    console.log(this.ballData)
                this.secondKind = this.gameMethodConfig[0].children[0].name_cn
            }
        }
        this.method = this.gameMethodConfig[0].name_cn;

        if(this.small.length)
            this.smallMethod = this.small[0].children[0].name_cn;
        this.btn = this.ballData.map(ele => [{name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}])
        console.log(this.ballData)
        this.singleBtn = this.tools.copy([
            {name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}
            ],true)

        return new Promise((resolve,reject) =>{
            resolve()
        })
    }

    setGameConfig(i,j,k){
        let flag, tempMethod = this.method;
      
        this.ballData = this.tools.copy(this.processBall(this.gameMethodConfig[i].children[j].children[k].bet_number), true)
        this.btn = this.ballData.map(ele => [{name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}])
        
        console.log(this.ballData)

        this.singleBtn = this.tools.copy([
            {name:"全",flag:false},{name:"大",flag:false},{name:"小",flag:false},{name:"奇",flag:false},{name:"偶",flag:false},{name:"清",flag:false}
            ],true)
       
        this.method = this.gameMethodConfig[i].name_cn
        this.bigKind = this.gameMethodConfig[i].children[j].name_cn
        this.bigKindEn = this.gameMethodConfig[i].children[j].name_en
        console.log(this.small)
        console.log(this.bigKind)
        this.secondKind = this.gameMethodConfig[i].children[j].name_cn
      
        this.smallKind = this.gameMethodConfig[i].children[j].children[k]
        this.bigId = this.tempBigId = this.gameMethodConfig[i].id
        this.small = this.tempSmall = this.gameMethodConfig[i].children
        this.smallId = this.tempSmallId = this.gameMethodConfig[i].children[j].children[k].id
       
        console.log(this.smallKind)
        console.log(this.gameMethodConfig)
        let percent = this.percent = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
        this.bonus = this.smallKind.prize*percent
        this.smallMethod = this.gameMethodConfig[i].children[j].children[k].name_cn
    }

    create(aa){
        let [a,b] = aa.split('-'),qq = []
        for(let i = a;i<=b;i++){
            qq.push(0)
        }
        return qq
     }

     processBall(data){
           let arr = []
           for(let key in data){
               arr.push({key,value:this.create(data[key])})
           }
           return arr
     }


    //计算注单
    calculate(){
        let count = 1;
        this.ballData.forEach((item,index) => {
            count *=  item.value.filter(ele => ele == 1).length
        })
        this.count = count
        let percent = this.tabYuan == '元' ? 1 : this.tabYuan == '角' ? 0.1 : 0.01
        this.betPrice = this.count*2*percent
    }

    toggle(){
        console.log('dddd')
        $('.tri-arrow').toggleClass('current')
        this.small = this.tempSmall
        this.bigId = this.tempBigId
        this.visible = this.visible == 'invisable' ? 'visable':'invisable'
        this.visible == 'visable' ? $('.body-bg').fadeIn(300) : $('.body-bg').fadeOut(300)
    }

    openTab(){
        console.log('asss')
        if(this.tabVisible == 'invisible')
           this.tabVisible = 'visable'
        else
           this.tabVisible = 'invisible'
    }

  showToast(msg,time?,position?) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time?time:2000,
      position: position?position:'middle'
    });
    toast.present();
  }

  produce(){
    // console.log(this.common.getCountDownTime()['current_number_time'])
    this.getCountDownTime().then((data) => {
        if(data){
            this.currentNumber = data.current_number
            this.countDown(new Date(data['current_number_time']).getTime() - new Date(data['current_time']).getTime())
        }   
    })   
  }

    countDown(time){
        this.timer = setInterval(()=> {
            this.countEnd = false
            if(time <1000){
                this.countEnd = true
                clearInterval(this.timer)
                console.log('wwwevevevev')
                // let modal = this.modalCtrl.create(CountTipComponent, {qishu:this.currentNumber})
                // modal.present()
                // setTimeout(function(){
                //     modal.dismiss()
                // },3000)
                //this.global.showToast('进入新一期开奖',2000)
                this.showCountTip(this.currentNumber)
                this.produce()
                this.events.publish('changeRecord')
                return
            } 
            this.countTime = this.getTimeRemaining(time)
            time -= 1000
        },1000)
    }

    getTimeRemaining(t) {
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        let days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
        'total': '',
        'days': '',
        'hours': ('0' + hours).slice(-2),
        'minutes': ('0' + minutes).slice(-2),
        'seconds': ('0' + seconds).slice(-2)
        }
    } 

    async fetchRecord():Promise<any>{
        console.log('fetchdata')
        this.historyList = (await this.http.fetchData('/api-lotteries-h5/load-issues/' + this.gameId + '?count=90&sort=desc')).data
        return new Promise((resolve,reject) =>{
            resolve()
        })
    }
    
    async getCountDownTime():Promise<any>{
        //let data = (await this.http.postData('/api-lotteries-h5/load-data/1/' + this.gameId + '?_t=' + JSON.parse(localStorage.getItem('userInfo')).auth_token, {_token:JSON.parse(localStorage.getItem('userInfo')).token})).data
        let data = (await this.http.fetchData('/api-lotteries-h5/load-data/1/' + this.gameId)).data
        console.log(data)
        if(data){
            this.prizeGroup = []
            this.prizeGroup.push(data.bet_max_prize_group + '-' + Number((+data.user_prize_group - data.bet_max_prize_group)/data.series_amount*100).toFixed(2) + '%')
            this.prizeGroup.push(data.bet_min_prize_group + '-' + Number((+data.user_prize_group - data.bet_min_prize_group)/data.series_amount*100).toFixed(2) + '%')
            this.chooseGroup = this.prizeGroup[0]
            console.log(this.prizeGroup)
            this.trace_max_times = data.trace_max_times    
        }
       
        return new Promise((resolve,reject) =>{
            resolve(data)
        })
    }

    async getMissObservable(){
       let missData =  (await this.http.fetchData('/api-lotteries-h5/getnewlottterymissed/' + this.gameId + '/30')).data
       if(missData)
          this.missData = missData
       console.log(this.missData)
       console.log('sssefewf')

    }

    async getBalance(){
       this.balance =  (await this.http.fetchData('/h5api-withdrawals/withdraw?_t=' + JSON.parse(localStorage.getItem('userInfo')).auth_token)).data.accounts.available
    //    return balance
    }

    showCountTip(countNum){
        // <div>进入第<div style="color:#FD6000;line-height:20px">{{text}}</div>期</div>
        // <div>请留意期号变化( <div style="color:#FD6000;line-height:20px">{{count}}s</div>)</div>
        let tip = '<div class="count-tip">'+
        '<div>进入第<div style="color:#FD6000;line-height:20px">' + (countNum+1) + '</div>期</div>' + 
        '<div>请留意期号变化( <div id="count-time" style="color:#FD6000;line-height:20px">3s</div>)</div>'
        '</div>'

        $('body').append(tip)
        let count = 3
        let timer = setInterval(function(){
             count--
             $('#count-time').text(count + 's')
             if(count == 0){
                $('.count-tip').remove()
                clearInterval(timer)
             }          
        },1000)
    }
}
