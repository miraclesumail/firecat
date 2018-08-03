import { Component } from '@angular/core';
import { IonicPage,ToastController,AlertController,LoadingController, NavController, NavParams } from 'ionic-angular';
import { HttpClientProvider } from '../../../providers/http-client/http-client'
import { LoadingProvider } from '../../../providers/loading/loading'
import {TabsPage} from '../../tabs/tabs'

@IonicPage()
@Component({
  selector: 'page-more-option',
  templateUrl: './more-option.html',
})
export class MoreOptionPage {

  userInfo = null
  constructor(public navCtrl: NavController,
              public loadingProd:LoadingProvider,
              public toastCtrl:ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl:LoadingController,
              public navParams: NavParams,public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  pushPage(page) {
    this.navCtrl.push(page)
  }

  async logout(){
    let loading = this.loadingProd.showLoading(this.loadingCtrl,'正在退出')
    await this.http.fetchData('/h5-api-auth/logout?_t='+ this.userInfo.auth_token).then(data=>{
      loading.dismissAll();
      this.http.checkUnjump(data)
      if(data.isSuccess){
        localStorage.removeItem('userInfo');
        this.loadingProd.showToast(this.toastCtrl,data.Msg)
        this.navCtrl.push(TabsPage, {
          pageIndex: 3
        });
      }else if(!data.isSuccess){
        this.loadingProd.showToast(this.toastCtrl,data.Msg)
      }
    })
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      cssClass:'quitModel',
      title: '确定退出吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            if(this.userInfo){
              this.logout();
            }else {
              this.loadingProd.showToast(this.toastCtrl,'您未登录，退出无效！')
            }

          }
        },
        {
          text: '取消',
          handler: () => {
            this.loadingProd.showToast(this.toastCtrl,'您已取消退出！')
          }
        }
      ]
    });
    confirm.present();
  }

}
