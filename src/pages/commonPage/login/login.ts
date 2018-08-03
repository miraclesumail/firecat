import {Component} from '@angular/core';
import {
  IonicPage,
  LoadingController,
  ToastController,
  NavController,
  NavParams, App
} from 'ionic-angular';

import {LoginProvider} from '../../../providers/login/login';
import {HttpClientProvider} from '../../../providers/http-client/http-client'
import {LoadingProvider} from '../../../providers/loading/loading'
import * as md5 from 'md5';
import {TabsPage} from '../../tabs/tabs'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl:'./login.html',
})
export class LoginPage {

  userInfo;
  username = '';
  password = '';
  loginData: any;
  nameInfoFlag: boolean = false
  pswInfoFlag: boolean = false;
  nameInfo: string = '';
  pswInfo: string = '';
  loading: any;
  tost: any;

  constructor(private logins: LoginProvider,
              public navCtrl: NavController,
              public http: HttpClientProvider,
              public loadPrd: LoadingProvider,
              public loadingCtrl: LoadingController,
              public ToastCtrl: ToastController,
              public navParams: NavParams,
              public appCtrl: App) {

  }

  ionViewDidLoad() {

  }

  login() {
    if (!this.checkForm()) return;
    else {
      this.nameInfoFlag = false;
      this.pswInfoFlag = false;
      this.loading = this.loadPrd.showLoading(this.loadingCtrl, '登录中...');
      this.http.postData('/h5-api-auth/login?_t=init',{
        'Content-Type':'application/x-www-form-urlencoded',
        username: this.username,
        password: md5(md5(md5(this.username + this.password)))
      }).then((data) => {
        if (data.isSuccess) {


          // this.storage.set('userInfo', data['data']);
          this.userInfo = data['data']

          // localStorage.userInfo = JSON.stringify(data['data']);

          // if(this.navParams.get('page')){
          //   //this.navCtrl.push(TabsPage)
          //   this.appCtrl.getRootNav().push(TabsPage)
          // }else
          //   this.navCtrl.setRoot(TabsPage, {
          //     pageIndex: 3
          //   })
          this.loadBalance().then(data=>{

            this.loading.dismiss();
            this.tost = this.loadPrd.showMidToast(this.ToastCtrl, data.Msg);
            this.userInfo.available = data.data.available;
            localStorage.userInfo = JSON.stringify(this.userInfo);

            this.navCtrl.push(TabsPage, {
              pageIndex: 3
            });
          })
        } else {
          this.username = ''
          this.password = ''
          // this.loading.dismiss();
          this.tost = this.loadPrd.showMidToast(this.ToastCtrl, data.Msg);
        }
      })
    }
  }

  async loadBalance(){
    return await this.http.fetchData('/h5api-users/user-account-info?_t='+this.userInfo.auth_token)
  }

  checkForm() {
    let patt = /^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/g;
    this.nameInfoFlag = false;
    this.pswInfoFlag = false;
    if (this.username.length == 0) {
      this.loadPrd.showMidToast(this.ToastCtrl, '用户名不能为空');
      // this.nameInfoFlag = true;
      // this.nameInfo = '用户名不能为空';

      return false;
    } else if (this.password.length == 0) {
      // this.pswInfoFlag = true;
      this.loadPrd.showMidToast(this.ToastCtrl, '密码不能为空');
      // this.pswInfo = '密码不能为空';
      return false;
    } else if (!patt.test(this.password)) {
      // this.pswInfoFlag = true;
      this.password = ''
      this.loadPrd.showMidToast(this.ToastCtrl, '密码格式不对');
      // this.pswInfo = '密码格式不对';
      return false;
    } else {
      return true;
    }
  }

}
