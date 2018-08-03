import {Component} from '@angular/core';
import {IonicPage,LoadingController, ToastController, NavController, NavParams} from 'ionic-angular';

import {HttpClientProvider} from '../../../providers/http-client/http-client'
import { LoadingProvider } from '../../../providers/loading/loading'
import Clipboard from 'clipboard'
import {TabsPage} from '../../tabs/tabs'

@IonicPage()
@Component({
  selector: 'page-lottory-history',
  templateUrl: './lottory-history.html',
})
export class LottoryHistoryPage {

  // _index = -1;
  userInfo = null;

  isNomore = false;
  loadmore = false;

  lrecord = {
    currentpage:1,
    currentLottory: {friend_name: '全部游戏'},
    bet_model: {'1.00': '元', '0.10': '角', '0.01': '分'},
    statusName: {'0': '待开奖', '1': '已撤销', '2': '未中奖', '3': '已中奖', '4': '已派奖', '5': '系统撤销'},
    lottorys: [{friend_name: ''}],
    timeStarts:new Date().getFullYear()+'-',
    timeEnds:new Date().getFullYear()+'-',
    data: []
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingPrvd: LoadingProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public http: HttpClientProvider) {
    this.lrecord.timeStarts += (new Date().getMonth())>9?(new Date().getMonth()):((new Date().getMonth())==0?12:('0'+(new Date().getMonth())))+'-'+((new Date().getDate())>9?(new Date().getDate()):('0'+new Date().getDate()))

    this.lrecord.timeEnds += (new Date().getMonth()+1)>9?(new Date().getMonth()+1):('0'+(new Date().getMonth()+1))+'-'+((new Date().getDate())>9?(new Date().getDate()):('0'+new Date().getDate()))
    console.log(this.lrecord.timeEnds)
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.loadLottory()

  }

  toggleDetail(record) {
    record.isSlide = !record.isSlide
  }

  //所有游戏列表
  async loadLottory() {
    this._index++
    await this.http.fetchData('/api-lotteries-h5/lottery-info?_t=' + this.userInfo.auth_token).then(data => {
      this.http.checkUnjump(data)
      this.lrecord.lottorys = []
      for (let item in data.data) {
        this.lrecord.lottorys.push(...data.data[item])
      }
      // this.lrecord.currentLottory = this.lrecord.lottorys[0]
      // if (this._index == 0) {
      this.selectLottory(this.lrecord.currentLottory)
      // }
    })
  }

  selectDate(){
    this.selectLottory(this.lrecord.currentLottory, this.lrecord.currentpage, true)
  }

  async selectLottory(_lottory,page,isChange) {
    await this.http.postData('/h5api-projects?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      'start_time': this.lrecord.timeStarts+' 00:00:00',
      'end_time': this.lrecord.timeEnds+' 23:59:59',
      'page':this.lrecord.currentpage,
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
        this.lrecord.data = data.data.data;
        for (let i = 0, len = this.lrecord.data.length; i < len; i++) {
          this.lrecord.data[i].isSlide = false;
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

          let len = this.lrecord.data.length
          this.lrecord.data.push(...data.data.data);
          for (let i = len, len1 = this.lrecord.data.length; i < len1; i++) {
            this.lrecord.data[i].isSlide = false;
          }
        }else {
          this.isNomore = true;
          this.loadmore = false;
        }

      }


    })
  }

  changeCurrent(lottory) {
    this.lrecord.currentLottory = lottory
  }


  async concelBill(record) {
    let loading = this.loadingPrvd.showLoading(this.loadingCtrl, '撤单中')
    await this.http.postData('/h5api-projects/0/drop?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      project_id: record.id
    }).then(data => {
      this.http.checkUnjump(data)
      loading.dismiss()
      if (data.isSuccess == 1) {
        record.status = 1;
        this.loadingPrvd.showToast(this.toastCtrl, data.Msg)
      } else {
        this.loadingPrvd.showToast(this.toastCtrl, data.Msg)
      }
    })
  }


  doInfinite(infiniteScroll): Promise<any> {

    this.lrecord.currentpage++
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.selectLottory(this.lrecord.currentLottory, this.lrecord.currentpage, false)
        resolve()
        infiniteScroll.complete();
        infiniteScroll.state = 'enabled'
      }, 1500);

    })
  }


  copyText(e:event) {
    // const _input = document.querySelector(txt);
    // console.log(_input.value)
    // _input.setAttribute('value',_input.value)
    // _input.select();
    // if (document.execCommand('copy')) {
    //   document.execCommand('copy');
    //
    //   console.log('复制成功');
    // }
    // })
    // window.clipboardData.setData('text',t.value);

    console.log(e)

    var cpTxt = '22';
    var clipboardData = window.clipboardData; //for IE
    if (!clipboardData) { // for chrome
      console.log(e.originalEvent)
      clipboardData = e.originalEvent.clipboardData;
    }
    //e.clipboardData.getData('text');//可以获取用户选中复制的数据
    clipboardData.setData('Text', cpTxt);
    // alert(cpTxt);
    // $('#message').text('Copy Data : ' + cpTxt);
    return false;//否则设不生效
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
