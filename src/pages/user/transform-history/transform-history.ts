import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {HttpClientProvider} from '../../../providers/http-client/http-client'

import * as Hammer from  'hammerjs';
import * as $ from 'jquery'

@IonicPage()
@Component({
  selector: 'page-transform-history',
  templateUrl: './transform-history.html',
})
export class TransformHistoryPage {

  userInfo;
  allcurrentPage=1;
  chargecurrentPage=1;
  withcurrentPage=1;
  isSlide:boolean = false;
  segmentsArray = ['all','charge','withdraw'];
  transformHistory: string = this.segmentsArray[0];

  transData = {
    all:[],
    charge:[],
    withdraw:[],
    withDrawStatus: {
      '0': '待审核',
      '1': '客服待定',
      '2': '审核通过, 待处理',
      '3': '失败',
      // '3': '未通过审核',
      '4': '成功',
      '5': '失败',
      '6': '扣游戏币异常失败',
      '7': 'mc部分成功, 扣减部分游戏币',
      '8': '已退款',
      '9': 'MC处理中',
      '10': '失败',
      // '10': 'MC异常返回',
      '12': '已认领'
    }
  }



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.getChargeHis(3,this.allcurrentPage)
    this.getChargeHis(1,this.chargecurrentPage)
    this.getChargeHis(2,this.withcurrentPage)

  }

  ionViewDidLoad() {
    this.swipeEvent()
    // this.swiperUpEvent()
  }

  swipeEvent(){

    var switchBody = document.getElementById('switchBody');
    var hammertime = new Hammer(switchBody);

    hammertime.on('swiperight', () => {
      if (this.segmentsArray.indexOf(this.transformHistory) > 0) {
        this.transformHistory = this.segmentsArray[this.segmentsArray.indexOf(this.transformHistory) - 1];
      }
    })
    hammertime.on('swipeleft', () => {
      if (this.segmentsArray.indexOf(this.transformHistory) < 2) {
        this.transformHistory = this.segmentsArray[this.segmentsArray.indexOf(this.transformHistory) + 1];
      }
    })

  }

  toggleDetail(data){
    data.flag = !data.flag
  }

  //获取充值历史
  async getChargeHis(type ,_page){
    await this.http.postData('/h5api-reports/0/getmydeposits?_t='+this.userInfo.auth_token,{
      'Content-Type':'application/x-www-form-urlencoded',
      '_token':this.userInfo.token,
      'page':_page,
      'type':type
    }).then(data=>{
      this.http.checkUnjump(data)
      if(data.isSuccess==1){
        switch (type){
          case 1:
            this.transData.charge.push(...data.data.data);
            break;
          case 2:
            this.transData.withdraw.push(...data.data.data);
            for(let item of this.transData.withdraw){
              item.flag = false
            }
            console.log(this.transData.withdraw)
            break;
          default:
            this.transData.all.push(...data.data[0]);
            for(let item of this.transData.all){
              item.flag = false
            }
            console.log(this.transData.all)
        }
      }

    })
  }

  switchTab(_case){
    // switch (_case){
    //   case 'all':
    //     this.getChargeHis(3)
    //     break;
    //
    //   case 'charge':
    //     this.getChargeHis(1)
    //     break;
    //
    //   default:
    //     this.getChargeHis(2)
    //     break;
    // }
  }

  //页面跳转
  pushPage(page, param) {
    if (param) {
      this.navCtrl.push(page, param);
    } else {
      this.navCtrl.push(page);
    }
  }

  swiperUpEvent(){
    $('body').on('scroll','#allContent',function () {
      console.log(2)
    })
  }


  doInfinite(item): Promise<any>{
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        switch (item){
          case 'all':
            this.allcurrentPage ++
            this.getChargeHis(3,this.allcurrentPage)
            break;

          case 'charge':
            this.chargecurrentPage ++
            this.getChargeHis(1,this.chargecurrentPage)
            break;

          default:
            this.withcurrentPage ++
            this.getChargeHis(2,this.withcurrentPage)
            break;
        }
        resolve();

      }, 1500);
    })
  }

  formatMoney(num){
    let re = /(-?\d+)(\d{3})/;
    if (Number.prototype.toFixed) {
      num = (+num).toFixed(2)
    } else {
      num = Math.round(+num * 100) / 100
    }
    num = '' + num;
    while (re.test(num)) {
      num = num.replace(re, "$1,$2")
    }
    return num
  }

}
