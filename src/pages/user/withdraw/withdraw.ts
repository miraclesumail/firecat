import {Component} from '@angular/core';
import {IonicPage, NavController, LoadingController, ToastController, NavParams, AlertController} from 'ionic-angular';

import {HttpClientProvider} from '../../../providers/http-client/http-client';
import {LoadingProvider} from '../../../providers/loading/loading'


@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: './withdraw.html',
})
export class WithdrawPage {

  toast;
  userInfo
  withDrawMoney = 0.00;
  formateNum = null;
  currentBank = null;
  // receiveChargeData = {}
  withdrewApiData = {data: {accounts: {withdrawable: null, balance: null}}}

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public http: HttpClientProvider,
              public loadPrd: LoadingProvider,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.withdrewBankApi()

  }


  //提现
  //银行卡接口
  async withdrewBankApi() {
    await this.http.fetchData('/h5api-withdrawals/withdraw?_t=' + this.userInfo.auth_token).then(data => {

      if (data.isSuccess == 0) {
        this.loadPrd.showToast(this.toastCtrl, data.Msg)
        this.navCtrl.pop()
      }else if(data.IsSuccess==2){
        this.http.checkUnjump(data)
      } else {
        this.withdrewApiData = data
        for (let i = 0; i < this.withdrewApiData.data.bank_cards.length; i++) {
          this.withdrewApiData.data.bank_cards[i].flag = false
        }
      }
    })


    // console.log(this.withdrewApiData.data)
  }

  formateMoney() {
    this.formateNum = parseFloat(this.withDrawMoney).toFixed(2)
    this.withDrawMoney = this.formateNum;
  }

  checkWithdraw() {

    if (this.withdrewApiData.data.fund_password) {
      if (parseFloat(this.withDrawMoney) > parseFloat(this.withdrewApiData.data.accounts.withdrawable)) {
        this.loadPrd.showToast(this.toastCtrl, '可提现额度不够')
      } else if (parseFloat(this.withDrawMoney) < parseFloat(this.withdrewApiData.data.min_withdraw_amount)) {
        this.loadPrd.showToast(this.toastCtrl, '提现金额不得低于' + this.withdrewApiData.data.min_withdraw_amount + '元')
      } else if (parseFloat(this.withDrawMoney) > parseFloat(this.withdrewApiData.data.max_withdraw_amount)) {
        this.loadPrd.showToast(this.toastCtrl, '提现金额不得高于' + this.withdrewApiData.data.max_withdraw_amount + '元')
      } else {
        this.showPrompt()
      }
    } else {
      this.setPayPsw();
    }


  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '验证支付密码',
      cssClass: 'inputPayModel',
      inputs: [
        {
          name: 'psw',
          type: 'password',
          placeholder: '请输入支付密码'
        },
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: data => {
            // this.http.postData('')
            console.log(data.psw)
            if (data.psw == '' || data.psw.length < 6 || data.psw.length > 16) {
              this.toast = this.loadPrd.showToast(this.toastCtrl, '支付密码不正确')
              return false
            } else {
              this.sendFoundPsw({psw1: data.psw}).then(val => {
                if (val.IsSuccess) {
                  this.toast = this.loadPrd.showLoading(this.loadingCtrl, '提现中')
                  this.postWithReq().then(val1 => {
                    this.http.checkUnjump(data)
                    this.toast.dismiss()
                    if (val1.isSuccess == 1) {
                      this.navCtrl.push('CommonStatusPage', {
                        'status': 'succeed',
                        'text': '提现审核中'
                      })
                    } else {
                      this.navCtrl.push('CommonStatusPage', {
                        'status': 'fail',
                        'text': val1.Msg
                      })
                    }
                    console.log(val1)
                  })
                } else {
                  this.toast = this.loadPrd.showToast(this.toastCtrl, val.Msg)
                }
              })
            }


          }
        }
      ]
    });
    prompt.present();
  }

  async postWithReq() {
    return await this.http.postData('/h5api-withdrawals/withdraw/1?_t=' + this.userInfo.auth_token, {
      'id': this.currentBank.id,
      'account': this.currentBank.account,
      'account_name': this.currentBank.account_name,
      'Content-Type': 'application/x-www-form-urlencoded',
      'amount': this.withDrawMoney,
      '_token': this.userInfo.token
    })
  }


  selectBank(bank) {
    for (let i = 0, len = this.withdrewApiData.data.bank_cards.length; i < len; i++) {
      this.withdrewApiData.data.bank_cards[i].flag = false
    }
    bank.flag = true;
    this.currentBank = bank;
  }

  addBankCard() {
    if (this.withdrewApiData.data.fund_password) {
      let prompt = this.alertCtrl.create({
        title: '验证支付密码',
        cssClass: 'inputPayModel',
        inputs: [
          {
            name: 'psw',
            type: 'password',
            placeholder: '请输入支付密码'
          },
        ],
        buttons: [
          {
            text: '取消'
          },
          {
            text: '确定',
            handler: data => {
              if (data.psw == '' || data.psw.length < 6 || data.psw.length > 16) {
                this.toast = this.loadPrd.showToast(this.toastCtrl, '支付密码不正确')
                return false
              } else {
                this.sendFoundPsw({psw1: data.psw}).then(val => {
                  if (val.IsSuccess) {
                    this.navCtrl.push('AddBankCardPage')
                  } else {
                    this.toast = this.loadPrd.showToast(this.toastCtrl, '资金密码有误')
                  }
                })
              }

            }
          }
        ]
      });
      prompt.present();
    } else {
      this.setPayPsw();
    }

  }

  //发送资金密码
  async sendFoundPsw(params) {
    return await this.http.postData('/h5api-users/checkfundpassword?_t=' + this.userInfo.auth_token, {
      'fund_password': params.psw1,
      '_token': this.userInfo.token
    })
  }

  formatBankNumber(bankNumber) {
    return bankNumber.substr(0, 4) + "********" + bankNumber.substr(-4);
  }

  formatMoney(num) {
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

  //*************************************设置支付密码****************************************
  setPayPsw() {
    let prompt = this.alertCtrl.create({
      title: '请设置支付密码',
      cssClass: 'bankCardModel',
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
              this.toast = this.loadPrd.showMidToast(this.toastCtrl, '两次输入的密码不一致');
              return false
            } else if (data.password.length < 6 || data.password.length > 16) {
              data.comfirmPsw = ''
              data.password = ''
              this.toast = this.loadPrd.showMidToast(this.toastCtrl, '输入的密码长度不对');
              return false
            } else {
              this.toast = this.loadPrd.showLoading(this.loadingCtrl, '资金密码设置中')
              this.postFoundPsw({psw1: data.password, psw2: data.comfirmPsw}).then(data => {
                this.toast.dismiss()
                if (data.isSuccess == 1) {
                  this.toast = this.loadPrd.showMidToast(this.toastCtrl, data.Msg);

                  this.postWithReq().then(val1 => {
                    this.toast.dismiss()
                    if (val1.isSuccess == 1) {
                      this.navCtrl.push('CommonStatusPage', {
                        'status': 'succeed',
                        'text': '提现审核中'
                      })
                    } else {
                      this.navCtrl.push('CommonStatusPage', {
                        'status': 'fail',
                        'text': val1.Msg
                      })
                    }
                    console.log(val1)
                  })


                } else {
                  this.toast = this.loadPrd.showMidToast(this.toastCtrl, data.Msg);
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
    return await this.http.postData('/h5api-users/safe-reset-fund-password?_t=' + this.userInfo.auth_token, {

      'fund_password': params.psw1,
      'fund_password_confirmation': params.psw2,
      '_token': this.userInfo.token
    })
  }


}
