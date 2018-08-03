import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClientProvider } from '../../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-trans-detail',
  templateUrl: './trans-detail.html',
})
export class TransDetailPage {

  userInfo;
  isNomore = false;
  loadmore = false;
  lottorys=[{'cn_title':''}];
  currentLottory={'cn_title':'全部记录'};
  transData={
    timeStarts:new Date().getFullYear()+'-',
    timeEnds:new Date().getFullYear()+'-',
    page:1,
    data:[]
  }


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.transData.timeStarts += (new Date().getMonth())>9?(new Date().getMonth()):((new Date().getMonth())==0?12:('0'+(new Date().getMonth())))+'-'+((new Date().getDate())>9?(new Date().getDate()):('0'+new Date().getDate()))
    this.transData.timeEnds += (new Date().getMonth()+1)>9?(new Date().getMonth()+1):('0'+(new Date().getMonth()+1))+'-'+((new Date().getDate())>9?(new Date().getDate()):('0'+new Date().getDate()))
    this.loadLottory()
  }




  //所有帐变类型列表
  async loadLottory(){
    await this.http.fetchData('/h5api-reports/0/gettransfertypes?_t='+this.userInfo.auth_token).then(data=>{
      if(data.isSuccess==1){
        this.lottorys = []
        for(let item in data.data){
          if(item=='tplData'){
            continue ;
          }else {
            this.lottorys[parseInt(item)] = data.data[item]
          }

        }
        // this.currentLottory = this.lottorys[0]
        this.selectChange(this.currentLottory,this.transData.page,true)
      }
    })
  }

  selectDate(){
    this.selectChange(this.currentLottory,this.transData.page,true)
  }

  async selectChange(_lottory,page,isChange){
    this.transData.data = []
    await this.http.postData('/h5api-reports/0/getmobileusertransaction/?_t='+this.userInfo.auth_token,{
      'Content-Type':'application/x-www-form-urlencoded',
      '_token':this.userInfo.token,
      'page':page,
      'start_time':this.transData.timeStarts+' 00:00:00',
      'end_time':this.transData.timeEnds+' 23:59:59',
      'bet_status':1,
      'transTypeId':_lottory.id?_lottory.id:null
    }).then(data=>{
      this.transData.data = data.data.data;
      console.log(this.transData.data)

      if(isChange){
        if(data.data.data.length<20){
          if(data.data.data.length==0){
            this.isNomore = false;
            this.loadmore = false;
          }else {
            this.isNomore = true;
            this.loadmore = false;
          }

        }else {
          this.isNomore = false;
          this.loadmore = true;
        }
        this.transData.data = data.data.data;
        for (let i = 0, len = this.transData.data.length; i < len; i++) {
          this.transData.data[i].isSlide = false;
        }

      }else {
        if(data.data.data.length!=0){
          if(data.data.length<20){
            this.isNomore = true;
            this.loadmore = false;
          }else {
            this.isNomore = false;
            this.loadmore = true;
          }

          let len = this.transData.data.length
          this.transData.data.push(...data.data.data);
          for (let i = len, len1 = this.transData.data.length; i < len1; i++) {
            this.transData.data[i].isSlide = false;
          }
        }else {
          this.isNomore = true;
          this.loadmore = false;
        }

      }


    })
  }

  changeCurrent(lottory) {
    this.currentLottory = lottory
  }


  doInfinite(infiniteScroll): Promise<any> {
    this.transData.currentpage++
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.selectChange(this.transData.currentLottory, this.transData.page, false)
        resolve()
        infiniteScroll.complete();
        infiniteScroll.state = 'enabled'
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
