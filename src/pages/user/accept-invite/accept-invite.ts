import { Component } from '@angular/core';
import { IonicPage,ToastController, LoadingController,NavController, NavParams } from 'ionic-angular';

import {LoadingProvider} from "../../../providers/loading/loading"
import {HttpClientProvider} from "../../../providers/http-client/http-client"
import {TabsPage} from '../../tabs/tabs'

@IonicPage()
@Component({
  selector: 'page-accept-invite',
  templateUrl: 'accept-invite.html',
})
export class AcceptInvitePage {

  signFormFlag = false;
  sign={
    username:'',
    psw:'',
    comfirm_psw:''
  }
  inviteData = {}
  constructor(public navCtrl: NavController,
              public toastCtrl:ToastController,
              public loadingCtrl:LoadingController,
              public loadPrd:LoadingProvider,
              public http:HttpClientProvider,
              public navParams: NavParams) {

    this.inviteData = this.navParams.get('invite')
  }



  acceptInvite(){
    this.signFormFlag = true
  }

  checkForm() {
    let patt = /^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/g;

    if (this.sign.username.length==0) {
      this.loadPrd.showToast(this.toastCtrl,'用户名不能为空')
      return false;
    } else if (this.sign.psw.length == 0) {
      this.loadPrd.showToast(this.toastCtrl,'密码不能为空')
      return false;
    } else if (this.sign.psw.length<6||this.sign.psw.length>16) {
      this.loadPrd.showToast(this.toastCtrl,'密码长度不对')
      return false;
    } else if (!patt.test(this.sign.psw)) {
      this.loadPrd.showToast(this.toastCtrl,'密码格式不对')
      return false;
    }  else if (this.sign.comfirm_psw.length == 0) {
      this.loadPrd.showToast(this.toastCtrl,'请再次输入密码确认')
      return false;
    }  else if (this.sign.comfirm_psw != this.sign.psw) {
      this.loadPrd.showToast(this.toastCtrl,'两次输入的密码不一样')
      return false;
    }else {
      // console.log(this.sign)
      return true;
    }
  }

  signAction() {
    if (!this.checkForm()) return;
    else {
      let loading = this.loadPrd.showLoading(this.loadingCtrl, '注册中...');

      this.http.postData('/h5-api-auth/invite?keyword=b733e908',{
        'Content-Type':          'application/x-www-form-urlencoded',
        username:                this.sign.username,
        password:                this.sign.psw,
        password_confirmation:   this.sign.comfirm_psw,
        source:                 'invite',
      }).then((data) => {
        loading.dismiss();
        this.http.checkUnjump(data)

        if (data.isSuccess) {
          this.loadPrd.showToast(this.toastCtrl, '注册成功');
          localStorage.userInfo = JSON.stringify(data['data']);
          this.navCtrl.push(TabsPage, {
            pageIndex: 0
          });
        } else {
          if (data.IsSuccess == 2) {
            return null
          } else {
            this.loadPrd.showToast(this.toastCtrl, data.Msg);
          }
        }
      })
    }
  }

}
