import { Component } from '@angular/core';
import { IonicPage, ToastController,LoadingController,NavController, NavParams } from 'ionic-angular';
import {HttpClientProvider} from '../../../providers/http-client/http-client'
import { LoadingProvider } from '../../../providers/loading/loading'

import { TabsPage } from '../../tabs/tabs'

@IonicPage()
@Component({
  selector: 'page-follow-history',
  templateUrl: './follow-history.html',
})
export class FollowHistoryPage {
  userInfo;
  isNomore = false;
  loadmore = false;
  followData ={
    today:new Date(),
    currentLottory: {friend_name: '全部游戏'},
    bet_model: {'1.00': '元', '0.10': '角', '0.01': '分'},
    statusName: {'0': '进行中','1':'已完成', '2': '用户终止', '3': '管理员终止', '4': '系统终止'},
    lottorys: [{friend_name: ''}],
    timeStarts:new Date().getFullYear()+'-',
    timeEnds:new Date().getFullYear()+'-',
    currentpage:1,
    datas:[]
  }

  constructor(public http:HttpClientProvider,
              public loadingPrvd: LoadingProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.followData.timeStarts += (new Date().getMonth())>9?(new Date().getMonth()):((new Date().getMonth())==0?12:('0'+(new Date().getMonth())))+'-'+((new Date().getDate())>9?(new Date().getDate()):('0'+new Date().getDate()))
    this.followData.timeEnds += (new Date().getMonth()+1)>9?(new Date().getMonth()+1):('0'+(new Date().getMonth()+1))+'-'+((new Date().getDate())>9?(new Date().getDate()):('0'+new Date().getDate()))
    this.loadLottory()
    console.log(this.followData.timeEnds)
  }

  toggleDetail(follow){
    follow.isSlide = !follow.isSlide
  }


  //所有游戏列表
  async loadLottory() {
    await this.http.fetchData('/api-lotteries-h5/lottery-info?_t=' + this.userInfo.auth_token).then(data => {
      this.followData.lottorys = []
      for (let item in data.data) {
        this.followData.lottorys.push(...data.data[item])
      }
      this.selectLottory(this.followData.currentLottory,this.followData.currentpage,true)

    })
  }

  selectDate(){
    this.selectLottory(this.followData.currentLottory,this.followData.currentpage,true)
  }

  //选择彩种
  async selectLottory(_lottory,page,isChange) {
    await this.http.postData('/h5api-traces/0/getalltransations?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      'start_time': this.followData.timeStarts+' 00:00:00',
      'end_time': this.followData.timeEnds+' 23:59:59',
      'page':page,
      'lottery_id': _lottory.id?_lottory.id:null
    }).then(data => {
        this.http.checkUnjump(data)
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
          this.followData.datas = data.data.data;
          for (let i = 0, len = this.followData.datas.length; i < len; i++) {
            this.followData.datas[i].isSlide = false;
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

            let len = this.followData.datas.length
            this.followData.datas.push(...data.data.data);
            for (let i = len, len1 = this.followData.datas.length; i < len1; i++) {
              this.followData.datas[i].isSlide = false;
            }
          }else {
            this.isNomore = true;
            this.loadmore = false;
          }

        }




    })
  }

  changeCurrent(lottory) {
    this.followData.currentLottory = lottory
  }

  async stopFollow(follow){
    await this.http.postData('/h5api-traces/0/droptransation?_t='+this.userInfo.auth_token,{
      'Content-Type':'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      'tid':follow.id
    }).then(data=>{
      this.http.checkUnjump(data)
      if(data.isSuccess==1){
        this.loadingPrvd.showToast(this.toastCtrl,data.Msg)
        follow.status = 2
      }else if(data.isSuccess==0){
        this.loadingPrvd.showToast(this.toastCtrl,data.Msg)
      }
    })
  }


  doInfinite(infiniteScroll): Promise<any>{
    this.followData.currentpage ++
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        this.selectLottory(this.followData.currentLottory,this.followData.currentpage,false)
        resolve()
        infiniteScroll.complete();
        infiniteScroll.state = 'enabled'
      }, 500);
    })
  }


  toHome(){
    this.navCtrl.push(TabsPage, {
      pageIndex: 0
    });
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
