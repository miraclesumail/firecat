import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, ToastController, AlertController, NavParams} from 'ionic-angular';
import {LoadingProvider} from '../../../providers/loading/loading';

import {flyUp} from '../../../animation/flyUp'
// import {BankCardProvider} from '../../../providers/bank-card/bank-card'
import {HttpClientProvider} from '../../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-bank-card',
  templateUrl: './bank-card.html',
  animations: [
    flyUp
  ]
})
export class BankCardPage {

  bcData = {
    authToken: 'init',
    toast: null,
    idArr:[],
    fund_password: false,
    isLocked: false,
    userInfo: null,
    bankList: []
  }

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadPrd: LoadingProvider,
              public http: HttpClientProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public navParams: NavParams) {

    this.bcData.userInfo = JSON.parse(localStorage.getItem('userInfo'));

  }


  ionViewWillEnter() {
    this.getBankCard().then((data) => {
      this.http.checkUnjump(data)
      if(data.isSuccess==1){
        this.bcData.bankList = data.data.bank_cards
        this.bcData.fund_password = data.data.fund_password
        for (let i=0,len=this.bcData.bankList.length;i<len;i++){
          this.bcData.idArr.push(this.bcData.bankList[i].id)
          if(this.bcData.bankList[i].islock==1){
            this.bcData.isLocked = true;
          }else {
            continue
          }
        }
      }else if(data.isSuccess==0){
        this.loadPrd.showToast(this.toastCtrl, data.Msg)
      }
    })
  }

  //获取用户银行卡列表信息状态等
  async getBankCard() {
    return await this.http.fetchData('/h5api-withdrawals/withdraw?_t=' + this.bcData.userInfo.auth_token)
  }


  //*************************************添加银行卡*****************************************
  addBankCard() {
    if(this.bcData.isLocked){
      this.bcData.toast = this.loadPrd.showToast(this.toastCtrl, '卡片已锁，添加银行卡功能关闭')
    }
    else {
      if (this.bcData.fund_password) {
        this.inputPayPsw()

      } else {

        this.setPayPsw()

      }
    }

  }

  //*************************************设置支付密码****************************************
  setPayPsw() {
    let prompt = this.alertCtrl.create({
      title: '设置支付密码',
      cssClass:'bankCardModel',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: '至少6位，字母和数字组合'
        },
        {
          name: 'comfirmPsw',
          type: 'password',
          placeholder: '重复输入支付密码'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log(data)

          }
        },
        {
          text: '确认',
          handler: data => {

            if (data.password != data.comfirmPsw) {
              data.comfirmPsw = ''
              data.password = ''
              this.bcData.toast = this.loadPrd.showMidToast(this.toastCtrl, '两次输入的密码不一致');
              return false
            } else if (data.password.length < 6 || data.password.length > 16) {
              data.comfirmPsw = ''
              data.password = ''
              this.bcData.toast = this.loadPrd.showMidToast(this.toastCtrl, '输入的密码长度不对');
              return false
            } else {
              this.bcData.toast = this.loadPrd.showLoading(this.loadingCtrl, '资金密码设置中')
              this.postFoundPsw({psw1: data.password, psw2: data.comfirmPsw}).then(data1 => {
                this.bcData.toast.dismiss()
                this.http.checkUnjump(data1)
                if (data1.isSuccess == 1) {
                  this.bcData.toast = this.loadPrd.showMidToast(this.toastCtrl, data1.Msg);
                  this.navCtrl.push('AddBankCardPage')
                } else {
                  if(data1.isSuccess == 2){
                    this.http.checkUnjump(data1)
                    return null;
                  }else {
                    this.bcData.toast = this.loadPrd.showMidToast(this.toastCtrl, data1.Msg);
                  }
                }
              })
              // this.navCtrl.push('CommonStatusPage',{
              //   title:'银行卡',
              //   status:'succeed',
              //   text:'恭喜你！支付密码设置成功'
              // })
            }
          }
        }
      ]
    });
    prompt.present();
  }

  //发送设置的资金密码
  async postFoundPsw(params) {
    return await this.http.postData('/h5api-users/safe-reset-fund-password?_t=' + this.bcData.userInfo.auth_token, {
      // 'fund_password':data.password,
      'fund_password': params.psw1,
      // 'fund_password_confirmation':data.comfirmPsw,
      'fund_password_confirmation': params.psw2,
      '_token': this.bcData.userInfo.token
    })
  }

  //发送资金密码
  async sendFoundPsw(params) {
    return await this.http.postData('/h5api-users/checkfundpassword?_t=' + this.bcData.userInfo.auth_token, {
      'fund_password': params.psw1,
      '_token': this.bcData.userInfo.token
    })
  }


  //创建支付资金密码表单
  inputPayPsw() {
    let prompt = this.alertCtrl.create({
      title: '验证支付密码',
      cssClass:'bankCardModel',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: '请输入您的支付密码'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {

          }
        },
        {
          text: '确认',
          handler: data => {
            if (data.password == '' || data.password.length < 6 || data.password.length > 16) {
              this.toast = this.loadPrd.showToast(this.toastCtrl, '支付密码不正确')
              return false
            } else {
              this.sendFoundPsw({psw1: data.password}).then(data1 => {
                this.http.checkUnjump(data1)
                if (data1.IsSuccess) {
                  this.navCtrl.push('AddBankCardPage')
                } else {
                  if(data1.IsSuccess==2){
                    return null
                  }else {
                    this.bcData.toast = this.loadPrd.showMidToast(this.toastCtrl, data1.Msg);
                  }
                }
              })
            }
          }
        }
      ]
    });
    prompt.present();
  }

  //*************************************用户锁卡操作****************************************
  toggleLockCard() {
    if (this.bcData.isLocked) {
      return false;
    } else {
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '锁卡后所有银行卡将被锁定，不能再进行所有卡片操作！',
        buttons: [
          {
            text: '取消',
            handler: () => {

            }
          },
          {
            text: '确定',
            handler: () => {
              // await this.http.postData()
              this.bcData.toast = this.loadPrd.showLoading(this.loadingCtrl, '锁卡中')
              this.postLock().then(data => {
                this.bcData.toast.dismiss()
                this.http.checkUnjump(data)
                if (data.isSuccess == 1) {
                  this.bcData.isLocked = true;
                  this.bcData.toast = this.loadPrd.showToast(this.toastCtrl, '锁卡成功')

                  this.getBankCard().then((data1) => {
                    this.bcData.bankList = data1.data.bank_cards
                    this.bcData.fund_password = data1.data.fund_password
                  })
                } else if(data.isSuccess == 0){
                  this.bcData.toast = this.loadPrd.showToast(this.toastCtrl, '锁卡失败，请重试')
                }
              })
            }
          }
        ]
      });
      confirm.present();
    }

  }

  //发送一键锁卡请求
  async postLock() {
    return await this.http.postData('/h5api-bank-cards/0/card-lock?_t=' + this.bcData.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.bcData.userInfo.token,
      'id':this.bcData.idArr,
      'status': 1
    })
  }

  //*************************************用户进入解绑银行卡页面********************************
  enterUnbindCard(bank) {
    if (bank.islock) return false;
    else {
      this.navCtrl.push('UnbindBankCardPage', bank)
    }
  }

  formatBankNumber(bankNumber) {
    return bankNumber.substr(0, 4) + "********" + bankNumber.substr(-4);
  }

}
