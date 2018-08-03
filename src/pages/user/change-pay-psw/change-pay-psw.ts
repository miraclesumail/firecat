import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';

import {LoadingProvider} from '../../../providers/loading/loading'
import {HttpClientProvider} from '../../../providers/http-client/http-client'
import {TabsPage} from '../../tabs/tabs'


@IonicPage()
@Component({
  selector: 'page-change-pay-psw',
  templateUrl: 'change-pay-psw.html',
})
export class ChangePayPswPage {

  pswData = {
    old_password:'',
    password:'',
    password_confirmation:''
  }
  constructor(
    public navCtrl: NavController,
    public http: HttpClientProvider,
    public loadPrd: LoadingProvider,
    public loadingCtrl: LoadingController,
    public ToastCtrl: ToastController,
    public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  submitPsw() {
    let toast = null;
    // let patt = /^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/g;


    if (this.pswData.password != this.pswData.password_confirmation) {
      this.pswData.password=''
      this.pswData.password_confirmation=''
      toast = this.loadPrd.showToast(this.ToastCtrl, '两次输入的新支付密码不一致');
    } else {
      toast = this.loadPrd.showLoading(this.loadingCtrl,'密码修改中');
      this.http.postData('/h5api-users/password-management/1?_t='+this.userInfo.auth_token, {
        'Content-Type': 'application/x-www-form-urlencoded',
        '_token': this.userInfo.token,
        'old_fund_password': this.pswData.old_password,
        'fund_password': this.pswData.password,
        'fund_password_confirmation': this.pswData.password_confirmation
      }).then(data => {
        toast.dismiss()


        if (data.isSuccess == 1) {
          toast = this.loadPrd.showToast(this.ToastCtrl, data.data.tplData.msg)
          localStorage.userInfo = null;
          this.navCtrl.push(TabsPage, {
            pageIndex: 3
          });
        }else if(data.IsSuccess==2){
          this.http.checkUnjump(data)
        } else if (data.isSuccess == 0) {

          this.pswData = {
            old_password:'',
            password:'',
            password_confirmation:''
          }
          toast = this.loadPrd.showToast(this.ToastCtrl, data.data.tplData.msg)
        }
      })
    }
  }
}
