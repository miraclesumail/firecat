import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController,
  LoadingController,
  ViewController
} from 'ionic-angular';
import {LoadingProvider} from '../../../providers/loading/loading';
import {HttpClientProvider} from '../../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-unbind-bank-card',
  templateUrl: './unbind-bank-card.html',
})
export class UnbindBankCardPage {

  userInfo;
  bankData = {
    bankStr: '**',
    bankName: '**',
    bankType: '**',
    bankNum: '*******************',
    userName: '***'
  }

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadPrd: LoadingProvider,
              public viewCtrl: ViewController,
              public http: HttpClientProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
    this.bankData = this.navParams.data
    console.log(this.bankData)
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  unBindCard() {
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '解绑后该卡银行服务将不可用,确定解绑该银行卡？',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '确定',
          handler: () => {
            // this.loadPrd.showLoading(this.loadingCtrl,'解绑中...')
            // setTimeout(()=>{
            //   this.showAlert()
            //   this.viewCtrl.dismiss()
            // },2000)
            this.inputPayPsw()
          }
        }
      ]
    });
    confirm.present();
  }


  showAlert() {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: '银行卡解绑成功！'
    });
    alert.present();
    setTimeout(() => {
      alert.dismiss()
    }, 1000)
  }

  formatBankNumber(bankNumber) {
    return bankNumber.substr(0, 4) + "********" + bankNumber.substr(-4);
  }


  //创建支付资金密码表单
  inputPayPsw() {
    let prompt = this.alertCtrl.create({
      title: '验证支付密码',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: '请输入支付密码'
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
            if (data.password.length == 0 || data.password.length < 6 || data.password.length > 16) {
              data.password = '';
              this.loadPrd.showToast(this.toastCtrl, '密码错误')
              return false
            } else {
              this.sendFoundPsw({psw1: data.password}).then(data1 => {
                this.http.checkUnjump(data1)

                if (data1.IsSuccess == 1) {
                  this.unbindAction().then(val => {
                    if (val.IsSuccess) {
                      this.loadPrd.showToast(this.toastCtrl, '解绑成功')
                      this.navCtrl.pop();
                    } else {
                      this.loadPrd.showToast(this.toastCtrl, '解绑失败，请重试')
                    }
                  })
                }
              })
            }

          }
        }
      ]
    });
    prompt.present();
  }


  //发送资金密码
  async sendFoundPsw(params) {
    return await this.http.postData('/h5api-users/checkfundpassword?_t=' + this.userInfo.auth_token, {
      'fund_password': params.psw1,
      '_token': this.userInfo.token
    })
  }

  async unbindAction() {
    return await this.http.postData('/h5api-bank-cards/destroy?_t=' + this.userInfo.auth_token, {
      '_token': this.userInfo.token,
      'id': this.bankData.id
    })
  }
}
