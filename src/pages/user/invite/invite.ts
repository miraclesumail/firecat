import {Component} from '@angular/core';
import {IonicPage, ToastController, LoadingController, NavController, NavParams} from 'ionic-angular';

import {HttpClientProvider} from '../../../providers/http-client/http-client'
import {LoadingProvider} from '../../../providers/loading/loading'

@IonicPage()
@Component({
  selector: 'page-invite',
  templateUrl: './invite.html',
})
export class InvitePage {

  userInfo;
  loading= null;
  win_group = {
    current: {a: 18, b: 50},
    max:{a:18,b:60},
    min:{a:18,b:50}
  }
  invitedata = {
    listPosition: -187,
    showList: false,
    showQrcode: false,
    rewardPoint: 0,
    iAgentMaxPrizeGroup: 1800,
    iAgentMinPrizeGroup: 1800,
    iCurrentUserPrizeGroup: 1800,
    iPlayerMaxPrizeGroup: 1800,
    iPlayerMinPrizeGroup: 1800,
    qrCodeUrl: ''
  }


  constructor(public http: HttpClientProvider,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public loadingPrvd: LoadingProvider,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    this.invitedata.rewardPoint = (this.invitedata.iCurrentUserPrizeGroup - 1800) * 0.05
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

    this.getcreateprize()
  }


  toRule() {
    this.navCtrl.push('InviteRulePage')
  }

  dragRange() {
    this.invitedata.rewardPoint = ((this.invitedata.iCurrentUserPrizeGroup - 1800) * 0.05).toFixed(2)
  }

  async getQRCode() {
    let loading = this.loadingPrvd.showLoading(this.loadingCtrl, '正在生成邀请链接')
    await this.http.postData('/h5api-users/createinvitelink?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      'prize_group': this.invitedata.iCurrentUserPrizeGroup
    }).then(data => {
      loading.dismiss();
      this.http.checkUnjump(data)
      if (data.IsSuccess) {
        this.loadingPrvd.showToast(this.toastCtrl, '恭喜你！生成邀请链接成功！')
        this.invitedata.qrCodeUrl = data.data
        this.invitedata.showQrcode = true
      } else if(!data.IsSuccess){
        this.loadingPrvd.showToast(this.toastCtrl, '生成邀请链接失败,请重试')
      }
    })
  }

  async getcreateprize() {
    this.loading = this.loadingPrvd.showLoading(this.loadingCtrl, '正在获取用户奖金组')
    await this.http.fetchData('/h5api-users/getcreateprize?_t=' + this.userInfo.auth_token).then(data => {
      this.http.checkUnjump(data)
      this.loading.dismiss()
      if (data.IsSuccess) {
        this.invitedata.iAgentMaxPrizeGroup = data.data.iAgentMaxPrizeGroup
        this.invitedata.iAgentMinPrizeGroup = data.data.iAgentMinPrizeGroup
        // this.invitedata.iCurrentUserPrizeGroup = data.data.iCurrentUserPrizeGroup
        this.invitedata.iCurrentUserPrizeGroup = data.data.iAgentMaxPrizeGroup
        this.invitedata.iPlayerMaxPrizeGroup = data.data.iPlayerMaxPrizeGroup
        this.invitedata.iPlayerMinPrizeGroup = data.data.iPlayerMinPrizeGroup
        this.dragRange()
      } else if(!data.IsSuccess){
        this.loadingPrvd.showToast(this.toastCtrl, '获取用户奖金组失败,请返回重试')
      }
    })
  }

  shareQRCode() {
    this.invitedata.showList = true;
    let timer = setInterval(() => {
      if (this.invitedata.listPosition > -2) {
        clearInterval(timer)

      }
      this.invitedata.listPosition++;
    }, 1)
  }

  concelShare() {
    let timer = setInterval(() => {
      if (this.invitedata.listPosition < -187) {
        this.invitedata.showList = false;
        clearInterval(timer)

      }
      this.invitedata.listPosition--;
    }, 1)
  }


  selecGroup(){
    console.log(this.invitedata.iCurrentUserPrizeGroup)
  }
}
