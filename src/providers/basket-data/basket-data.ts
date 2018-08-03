import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { CommonProvider } from '../common/common'
import { UtilProvider } from '../util/util'
import { LoadingProvider } from '../../providers/loading/loading'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { observe } from "../tools/observe";
import * as $ from 'jquery'

let _ = new observe();

/*
  Generated class for the BasketDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BasketDataProvider {
  betData:Array<any> = []
  totalAmount:number;
  totalCount:number;
  balance:number = 10000
  min_multiple:number;
  /**
   *  {
   *    amount: ,
   *    lotterys: ,
   *    lotterysText:,
   *    mid:,
   *    moneyUnit:1,
   *    mutiple, 倍数
   *    number, 注数,
   *    origin:
   *    postParameter,  "3|4|5"
   *    prize_group,
   *    type:"qiansan.zhixuan.fushi"
   *    typeText:"前三,直选,直选复式"
   *  }
   */
  statistic:any = {
     multiple: 1,
     trace:1
  }
  
  observable: Observable<any>;
  observer: Observer<any>;
  changeDetect:(option:any) => void;


  constructor(public http: HttpClient, public util:UtilProvider, public common:CommonProvider, private alertCtrl: AlertController, public loading:LoadingProvider) {
    console.log('Hello BasketDataProvider Provider');
    this.observable = new Observable((observer: Observer<any>) => {
         this.observer = observer;
         this.changeDetect = (option) => {
                
                this.observer.next('')
         }
    });
    _.observe([this.betData,this.statistic],()=> this.calculateTotal())
  }

  calculateTotal(){
    console.log('change') 

    if(this.statistic.trace == 1)
       $('#trace').prop('disabled', true)
    else
       $('#trace').prop('disabled', false)

    /**
     * 1  判断购彩蓝能够添加的最大倍数
     * 2  计算当前购彩蓝总金额
     */
    if(this.betData.length>0){
        console.log(this.betData)

        let tempData = this.betData.sort((a,b) => a.max_multiple/a.beishu -  b.max_multiple/b.beishu)[0]
        
        this.min_multiple = tempData.max_multiple/tempData.beishu
        
        // if(this.common.smallKind.max_multiple == this.min_multiple)
        this.statistic.multiple = this.statistic.multiple > this.min_multiple ? this.min_multiple : this.statistic.multiple

        this.totalAmount = this.betData.reduce((r1,r2) => {
          return {...r1, amount:r1.amount + r2.amount}
      }).amount*this.statistic.multiple*this.statistic.trace

      this.totalCount = this.betData.reduce((a,b) => {
            return a + b.num
      },0)
      console.log(this.totalAmount)
  
     } else{
          this.totalAmount = 0   
          this.totalCount = 0   
     }
        
  }

  addBetData(betData?){
    let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01, flag = true;

    if(betData){
      // if(this.totalAmount + this.statistic.multiple*this.statistic.trace*percent*2*betData.length > +JSON.parse(localStorage.getItem('userInfo')).available){
      //   this.presentRecharge()
      //   return false
      // }
      betData.forEach(ele => {
          if(this.checkRepeat(ele))
             this.addToExist(ele)
          else
             this.betData.push(ele)
      })
     
    }else{
      let processData = this.processOrder()

     // console.log(+JSON.parse(localStorage.getItem('userInfo')).available)
      // if(this.totalAmount + this.statistic.multiple*this.statistic.trace*percent*processData.amount > +JSON.parse(localStorage.getItem('userInfo')).available){
      //     this.presentRecharge()
      //     return false
      // }
      if(this.checkRepeat(processData)){
         flag = this.addToExist(processData)
      }else{
         console.log('wccruruurur')
         this.betData.push(processData)
         console.log(this.betData)
      }
    }  
    this.calculateTotal()
    if(!flag)
        return false
    return true
  }

  //添加至已存在的注单
  addToExist(processData){
    let flag = true
    this.betData = this.betData.map(item => {
      if(item.wayId == processData.wayId && item.lotterysText == processData.lotterysText){
          if((item.beishu + 1)*this.statistic.multiple > item.max_multiple){
               flag = false
               console.log('超过倍数限制')
               
               return item
          }else{
            console.log(processData)
            return {...item, jsId:item.jsId, beishu:item.beishu + 1, amount:(item.amount +  processData.amount)}
          }     
      }else{
          return item
      }
    }) 

    if(flag)
       this.calculateTotal()
    else 
       this.loading.showTip('当前投注超过最大倍数')
    return flag
  }

  checkRepeat(processData){
    //let names = name?name:this.common.method + this.common.secondKind + this.common.smallMethod
    let totalData = this.betData.filter(ele => ele.wayId == processData.wayId)
  
    //检测重复
    if(totalData.filter(item => item.lotterysText == processData.lotterysText && item.moneyUnit == processData.moneyUnit).length > 0)
       return true
  }

  processOrder(){
    let dataArr = []
    /**
     * lotterysText:this.common.componentRef.getLotteryText(), 
     * 
     */
    console.log(dataArr)
    console.log(this.common.componentRef.instance.getLotteryText())
    console.log(this.common.componentRef.instance.getPositionArr())

    return {
         jsId:this.betData.length + 1,
         mid:this.common.smallId,
         amount:this.common.betPrice,
        
         //amountText:'',
         //lotterys:this.common.componentRef.instance.getLotteryData(),
         lotterysText:this.common.componentRef.instance.getLotteryText(), 
         wayId:this.common.smallId,
        // type:names,
         gameName:this.common.method == '二星' ? this.common.method + this.common.secondKind + this.common.smallMethod : this.common.method + this.common.smallMethod,
         position:this.common.componentRef.instance.getPositionArr(),    
         num:this.common.count,
         onePrice:2,
         moneyUnit:this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01,
         prize_group:this.common.chooseGroup,
         beishu:1,
         multiple:this.statistic.multiple,
         max_multiple:this.common.smallKind.max_multiple,
        // postParameter: this.common.componentRef.instance.getLotteryText(),
         viewBalls:this.common.componentRef.instance.getOriginLotteryText(),
             
    }
  }

  judge(number){
    switch(number){
      case 0:
          return '大'
      case 1:
          return '小'
      case 2:
          return '单'  
      case 3:
          return '双'           
   }
  }

  clearBasket(){
  //   this.statistic = {
  //     multiple: 1,
  //     trace:1
  //  }
   this.common.cartNumber = 0
   this.common.count = 0
   this.common.betPrice = 0
   for(let i in this.statistic){
           this.statistic[i] = 1 
   }
   if(!this.betData.length)
      return
    console.log('dwefewfeqf')
   // this.betData = []
    for(let i = 0;i<this.betData.length;i++){
        this.betData.splice(i,1)
        i--
    }
   
    this.calculateTotal()
    this.totalCount = 0
   
  }

  removeByIndex(index:number){
    this.betData.splice(index,1)
    this.calculateTotal()
    this.common.cartNumber--
  }

  // randomChoose(number){
  //   //  let randomData = this.common.ballData.map(item => {
  //   //     let random = Math.floor(Math.random()*10)
  //   //     let balls = item.ball.map((ele,index) => index == random ? 1 : 0)
  //   //     item.ball = balls
  //   //     return item
  //   // })
  //   for(let i=0;i<number;i++){
  //     this.util.randomChoose(number)
  //     this.betData.push(this.util.processOrder())
  //   }
  //   this.common.cartNumber += number
  //   //this.calculateTotal()
   
  //   this.util.resetData()
  // }

  presentRecharge() {
    console.log('ssss')
    let alert = this.alertCtrl.create({
      message: '您的余额不足，请先去充值',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
          }
        }
      ]
    })
    alert.present();
  }
 
}
