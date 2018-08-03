import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import {LoadingProvider} from '../../../providers/loading/loading'
import {TabsPage} from '../../tabs/tabs'
import { HttpClientProvider } from '../../../providers/http-client/http-client'


@IonicPage()
@Component({
  selector: 'page-change-login-psw',
  templateUrl: './change-login-psw.html',
})
export class ChangeLoginPswPage {

  userInfo;
  pswData = {
    old_password:'',
    password:'',
    password_confirmation:''
  }
  constructor(
    public navCtrl: NavController,
    public loadPrd: LoadingProvider,
    public http: HttpClientProvider,
    public loadingCtrl: LoadingController,
    public ToastCtrl: ToastController,
    public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  submitPsw() {
    let toast = null;
    let patt = /^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/g;

    if (!patt.test(this.pswData.old_password)) {
      this.pswData.old_password = '';
      toast = this.loadPrd.showToast(this.ToastCtrl, '原登录密码不正确');
    } else if (this.pswData.password != this.pswData.password_confirmation) {
      this.pswData.password=''
      this.pswData.password_confirmation=''
      toast = this.loadPrd.showToast(this.ToastCtrl, '两次输入的新登录密码不一致');
    } else if (this.pswData.old_password == this.pswData.password) {
      this.pswData.password=''
      this.pswData.password_confirmation=''
      toast = this.loadPrd.showToast(this.ToastCtrl, '新登录密码不能与旧登录密码相同');
    }else {
      toast = this.loadPrd.showLoading(this.loadingCtrl,'密码修改中');

      this.http.postData('/h5api-users/password-management/0?_t='+this.userInfo.auth_token, {
        'Content-Type': 'application/x-www-form-urlencoded',
        '_token': this.userInfo.token,
        'old_password': this.pswData.old_password,
        'password': this.pswData.password,
        'password_confirmation': this.pswData.password_confirmation
      }).then(data => {
        toast.dismiss()

        if (data.isSuccess == 1) {
          toast = this.loadPrd.showToast(this.ToastCtrl,data.data.tplData.msg+'请重新登录')
          localStorage.userInfo = null;
          this.navCtrl.push(TabsPage,{
            pageIndex: 3
          });
        }else if(data.IsSuccess==2){
          this.http.checkUnjump(data)
        } else if(data.isSuccess == 0) {
          this.pswData.old_password='';
          this.pswData.password='';
          this.pswData.password_confirmation='';
          toast = this.loadPrd.showToast(this.ToastCtrl,data.data.tplData.msg)
        }
      })
    }


  }
//
//   else if (this.pswData.old_password == this.pswData.password) {
//   toast = this.loadPrd.showToast(this.ToastCtrl, '新登录密码不能与旧登录密码相同');
// }
}
