import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  ToastController,
  NavParams } from 'ionic-angular';
import {TabsPage} from '../../tabs/tabs';
import {LoadingProvider} from '../../../providers/loading/loading'
import {SignupProvider} from '../../../providers/signup/signup';
import {LoginPage} from '../login/login'

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: './signup.html',
})
export class SignupPage {

  signData = {
    nameInfoText: '',
    pswInfoText: '',
    checkInfoText: '',
    nameInfoFlag: false,
    pswInfoFlag: false,
    checkInfoFlag: false,
    signInitParam:{keyword:'',token:''},
    loading:null,
    toast:null,
    data: {
      username: '',
      password: '',
      confirmPsw: '',
    }
  }


  constructor(
    public navCtrl: NavController,
    public signupPrd:SignupProvider,
    public loadPrd: LoadingProvider,
    public loadingCtrl: LoadingController,
    public ToastCtrl: ToastController,
    public navParams: NavParams) {

    this.getRegister()
  }

  getRegister(){
    if(this.navParams.data.keyword){
      this.signupPrd.getRegisterParam('&keyword='+this.navParams.data.keyword)
        .subscribe((data)=>{
        if(data.isSuccess==1){
          this.signData.signInitParam = data.data.tplData.successful;
          // this.storage.set('signParam',data.data.tplData.successful)
        }
      })
    }else {
      // this.signupPrd.getRegisterParam().subscribe((data)=>{
      //   if(data.isSuccess==1){
      //     this.signData.signInitParam = data.data.tplData.successful;
      //     // this.storage.set('signParam',data.data.tplData.successful)
      //   }
      // })
    }

  }

  checkForm() {
    let patt = /^[a-zA-Z0-9`\-=\[\];,./~!@#$%^*()_+}{:?]{6,16}$/g;

    this.clearInfo();
    if (this.signData.data.username.length==0) {
      this.signData.nameInfoFlag = true;
      this.signData.nameInfoText = '用户名不能为空';
      return false;
    } else if (this.signData.data.password.length == 0) {
      this.signData.pswInfoFlag = true;
      this.signData.data.password = ''
      this.signData.pswInfoText = '密码不能为空';
      return false;
    } else if (this.signData.data.password.length<6||this.signData.data.password.length>16) {
      this.signData.data.password = ''
      this.signData.pswInfoFlag = true;
      this.signData.pswInfoText = '密码长度不对';
      return false;
    } else if (!patt.test(this.signData.data.password)) {
      this.signData.data.password = ''
      this.signData.pswInfoFlag = true;
      this.signData.pswInfoText = '密码格式不对';
      return false;
    }  else if (this.signData.data.confirmPsw.length == 0) {
      this.signData.data.confirmPsw= ''
      this.signData.checkInfoFlag = true;
      this.signData.checkInfoText = '请再次输入密码确认';
      return false;
    }  else if (this.signData.data.confirmPsw != this.signData.data.password) {
      this.signData.checkInfoFlag = true;
      this.signData.data.confirmPsw = ''
      this.signData.checkInfoText = '两次输入的密码不一样';
      return false;
    }else {
      // console.log(this.signData.data)
      return true;
    }
  }

  clearItemInfo(_flag){
    return this.signData[_flag] = false;
  }

  clearInfo(){
    this.signData.nameInfoFlag = false;
    this.signData.pswInfoFlag = false;
    this.signData.checkInfoFlag = false;
    return
  }

  signAction() {
    if (!this.checkForm()) return;
    else {
      this.signData.loading = this.loadPrd.showLoading(this.loadingCtrl, '注册中...');

      this.signupPrd.postRegisterData({
        'Content-Type':          'application/x-www-form-urlencoded',
        username:                this.signData.data.username,
        password:                this.signData.data.password,
        password_confirmation:   this.signData.data.confirmPsw,
        keyword:                 this.signData.signInitParam.keyword,
        _token:                  this.signData.signInitParam.token,
      }).subscribe((data) => {

        if (data.isSuccess) {
          this.signData.loading.dismiss();
          this.signData.toast = this.loadPrd.showToast(this.ToastCtrl, '注册成功');
          //this.storage.set('userInfo', data['data']);

          localStorage.userInfo = JSON.stringify(data['data']);
          this.navCtrl.push(TabsPage, {
            pageIndex: 0
          });
        } else {
          this.signData.data.username = ''
          this.signData.data.password = ''
          this.signData.data.confirmPsw = ''

          this.signData.loading.dismiss();
          this.signData.toast = this.loadPrd.showToast(this.ToastCtrl, data.Msg);
        }

      })
    }
  }

  toLogin() {
      this.navCtrl.push('LoginPage');
  }

}





