import { Component } from '@angular/core';
import { IonicPage, ToastController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { HttpClientProvider } from '../../../providers/http-client/http-client'
import { LoadingProvider } from '../../../providers/loading/loading'


@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: './feedback.html',
})
export class FeedbackPage {
  content=''
  contact=''
  userInfo = null
  constructor(
    public navCtrl: NavController,
    public http:HttpClientProvider,
    public toastCtrl:ToastController,
    public loadCtrl: LoadingController,
    public loadPrvd: LoadingProvider,
    public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  async postFeedBack() {
    let loading = this.loadPrvd.showLoading(this.loadCtrl, '意见提交中')
    await this.http.postData('/h5api-suggestion/0/addsuggestion?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      'comment': this.content,
      'contact': this.contact
    }).then(data => {
      loading.dismiss();
      this.content=''
      this.contact=''
      this.http.checkUnjump(data)
      if (data.isSuccess == 1) {
        this.loadPrvd.showToast(this.toastCtrl, '意见提交成功')
        this.navCtrl.pop()
      } else if(data.isSuccess == 0){
        this.loadPrvd.showToast(this.toastCtrl, data.type)
        this.navCtrl.pop()
      }
    })
  }

  feedBack(){
    if(this.content.length==0){
      this.loadPrvd.showToast(this.toastCtrl, '您还没有填写反馈的内容喔')
    }else if(this.contact.length==0){
      this.loadPrvd.showToast(this.toastCtrl, '麻烦留下您的联系方式')
    }else {
      this.postFeedBack();
    }
  }


}
