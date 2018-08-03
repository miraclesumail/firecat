import { Component ,ComponentRef} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { BasketDataProvider } from '../../providers/basket-data/basket-data'
import { CommonProvider } from "../../providers/common/common";
import { trigger ,state,transition,animate,style} from "@angular/animations";
import {TabsPage} from '../tabs/tabs';
import * as $ from 'jquery'
import { UtilProvider } from '../../providers/util/util'
import { HttpClientProvider } from '../../providers/http-client/http-client'
import {Tpl} from '../../providers/base-tool/tpl'
// import { ChargePage } from '../user/charge/charge'
declare var encrypt
//import { encrypt } from '../../assets/js/Encrypt.js'
/**
 * Generated class for the BasketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
  animations:[
    trigger('show',[
       state('visable',style({
        display: 'block',
        // transform:'translate3d(0, 0, 0)'
       })),
       state('invisable', style({
         display: 'none',
       // transform:'translate3d(0, 100%, 0)'
       })),
       //transition('* => *',animate('.3s'))
    ])
   ]
})

export class BasketPage {
  show:string = "invisable"
  arr:any[] = []

  balance:any

  componentRef:ComponentRef<any>

  min_multiple:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public basket:BasketDataProvider, public common:CommonProvider, private alertCtrl: AlertController,public util:UtilProvider, public http:HttpClientProvider,public loadingCtrl:LoadingController) {
    for(let i = 0;i<30;i++){
       this.arr.push(i)
    }
    let self = this

    $(document).on('click','body',function(){
       if(self.show == 'visable' && !$(this).hasClass('fandian-number')){
         self.show = 'invisable'
         console.log('fffff')
       }  
    })

    if(JSON.parse(localStorage.getItem('userInfo'))){
        this.common.getBalance()
    }
      
    //算出总倍数限制

    // let tempData = this.basket.betData.sort((a,b) => a.max_multiple/a.beishu -  b.max_multiple/b.beishu)[0]

    // this.min_multiple = tempData.max_multiple/tempData.beishu

    // this.basket.statistic.multiple = this.basket.statistic.multiple > this.min_multiple ? this.min_multiple : this.basket.statistic.multiple

    // console.log(this.min_multiple)
    //此处获取需要机选注单的实例  
  
  }

  toggle(){
    this.show = this.show == 'invisable' ? 'visable' : 'invisable'
    if(this.show == 'visable')
       $('.l-triangle').hide()
    else
       $('.l-triangle').show()
  }

  change(number){
    if(number < 0 && this.basket.statistic.multiple == 1)
       return
    console.log(this.basket.statistic.multiple)
    let mutiple = this.basket.statistic.multiple + number
    console.log(mutiple)
    if(mutiple > this.basket.min_multiple)
        return

    if(this.basket.totalAmount*(mutiple/this.basket.statistic.multiple) > +JSON.parse(localStorage.getItem('userInfo')).available){
        this.presentRecharge()
        return 
    }
    this.basket.statistic.multiple += number

    // this.basket.betData = this.basket.betData.map(item => {
    //     return {...item, beishu:item.beishu*this.basket.statistic.multiple}
    // })
    console.log(this.basket.totalAmount)   
  }

  changeTrace(number){
    if(number < 0 && this.basket.statistic.trace == 1)
      return

   let trace = this.basket.statistic.trace + number

   if(trace > this.common.trace_max_times)
       return

   if(this.basket.totalAmount*(trace/this.basket.statistic.trace) > +JSON.parse(localStorage.getItem('userInfo')).available){
       this.presentRecharge()
       return 
   }
   this.basket.statistic.trace += number
   console.log(this.basket.totalAmount)   
  }

  // 机选一单
  randomChoose(number?){
     if(number){
         console.log('number == 5')
         this.common.componentRef.instance.randomChoose(number)

     }else{
         this.common.componentRef.instance.randomChoose(number)
         this.basket.addBetData()
     }  
  }

  ionViewWillLeave(){
     this.util.resetData()
  }

  checkMutiple(dom){
    console.log(dom.target.value)
    dom.target.value=dom.target.value.replace(/[^\d]/g,'')

    if(parseInt(dom.target.value) === 0){
       dom.target.value = 1
    }
   
   // dom.target.value = dom.target.value === 0 ? 1 : dom.target.value
    if(dom.target.value > this.basket.min_multiple)
       dom.target.value = this.basket.min_multiple

    this.basket.statistic.multiple = dom.target.value == '' ? '' : parseInt(dom.target.value)
  }

  checkTrace(dom){
    console.log(dom.target.value)
    dom.target.value=dom.target.value.replace(/[^\d]/g,'')

    if(parseInt(dom.target.value) === 0){
      dom.target.value = 1
    }

    if(dom.target.value > this.common.trace_max_times)
       dom.target.value = this.common.trace_max_times

    this.basket.statistic.trace = dom.target.value == '' ? '' : parseInt(dom.target.value)
  }

  onBlurMethod(dom,key){
    if(dom.target.value == ''){
        dom.target.value = 1
        this.basket.statistic[key] = 1
    }    

    console.log(this.basket.statistic)
  }

  presentConfirm() {
    if(!this.basket.betData.length)
       return 
    let alert = this.alertCtrl.create({
      message: '<div class="not-enough">确认清空所有注单</div>',
      cssClass:'my-alert',
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
               this.basket.clearBasket()
          }
        }
      ]
    });
    alert.present();
 }

 presentRecharge() {
  console.log('ssss')
  let alert = this.alertCtrl.create({
    message: '<div class="not-enough">您的余额不足，请先去充值</div>',
    cssClass:'my-alert',
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
            this.navCtrl.push('ChargePage')
        }
      }
    ]
  })
  alert.present();
}

  confirmBet(){ 
    if(!JSON.parse(localStorage.getItem('userInfo'))){
      //this.navCtrl.parent.select(3);
      this.navCtrl.push('LoginPage',{page:'SscPage'})
      return
    }

    if(this.basket.totalAmount > +JSON.parse(localStorage.getItem('userInfo')).available){
      this.presentRecharge()
      return false
    }
      
    
     this.basket.betData = this.basket.betData.map(ele => {return {...ele,prize_group:this.common.chooseGroup.split('-')[0]}})
     console.log(this.basket.betData)
     console.log($('#trace').is(':checked'))
     if($('#trace').is(':checked')){
         console.log('ooooo')
     }

     //$('#checkbox-id').is(':checked')

     let result = {}, ballsData = this.basket.betData, len = ballsData.length, i = 0, total = [];
     result['gameId'] = this.common.gameId
     result['isTrace'] = this.basket.statistic.trace > 1 ? 1 : 0
     result['traceStopValue'] = 1
     result['traceWinStop'] = $('#trace').is(':checked') ? 1 : 0
     result['orders'] = {}
     
     for(let i = 0; i < this.basket.statistic.trace; i++){
            let commonNumber = this.common.currentNumber
            let key =  +this.common.gameId != 8 ? +commonNumber + i + '' : commonNumber.split('-')[0] + '-' + ('0' + '' + (+commonNumber.split('-')[1] + i)).slice(-2) 
            let qq = {[key]:1}
            result['orders'] = {...result['orders'],[key]:1}
     }

     console.log(result)
     result['amount'] = this.basket.totalAmount
     result['is_encoded'] = 1
     result['bet_source'] = 'h5'
     result['_token'] = JSON.parse(localStorage.getItem('userInfo')).token
     console.log(result)
     result['balls'] = []
     for (; i < len; i++){
       console.log(ballsData[i]['prize_group'])
       console.log(ballsData[i]['viewBalls'])
        result['balls'].push({
          'jsId': ballsData[i]['jsId'],
          'wayId': ballsData[i]['mid'],
          'ball':  ballsData[i].gameName.indexOf('大小单双') != -1 || ballsData[i].gameName.indexOf('特殊号码') != -1 ? ballsData[i]['lotterysText'] : ballsData[i]['viewBalls'],
          'position':ballsData[i]['position'],
           //'viewBalls': ballsData[i].gameName.indexOf('大小单双') != -1 ?  ballsData[i]['lotterysText'] :ballsData[i]['viewBalls'],
          'viewBalls': '',
          //'viewBalls':ballsData[i]['viewBalls'],
          'num': ballsData[i]['num'],
          'type': ballsData[i]['gameName'],
          'onePrice': ballsData[i]['onePrice'],
          'prize_group':ballsData[i]['prize_group'],
          'moneyunit': ballsData[i]['moneyUnit'],
          'multiple': this.basket.statistic.multiple*ballsData[i].beishu
        })
      }

      console.log(result)
      console.log(encrypt(JSON.stringify(result['balls'])))
      result['balls'] = encrypt(JSON.stringify(result['balls']))

      let url = '/api-lotteries-h5/h5apibet/' + this.common.gameId + '?_t=' + JSON.parse(localStorage.getItem('userInfo')).auth_token

      let loading = this.loadingCtrl.create({
        content: '投注中...'
      });
      loading.present()
      
      this.http.postData(url,result).then(data => {
        console.log(data)
        loading.dismiss()
        if(data.isSuccess == 1){
          this.basket.clearBasket()

          this.balance = this.common.getBalance()

          $('body').append(Tpl.success_tip1)
          setTimeout(function () {
            $('.basket-pop').remove();
          }, 1500);
          // let alert = this.alertCtrl.create({
          //   title: '恭喜您',
          //   message: '投注已成功，祝你好运!',
          // });
          // alert.present();
          }else{
            $('body').append(Tpl.fail_tip);
            $('#error-tip').text(data.Msg);
            setTimeout(function () {
              $('.basket-pop').remove()
            }, 1500)
          }    
        }
      )
    }

    replace(ele){
       return ele.split('|').map(item => {
           if(item == '小')
              return 0
           if(item == '大')
              return 1
           if(item == '双')
              return 2
           if(item == '单')
              return 3
       }).join('|')
    }
}
