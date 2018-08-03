import {HttpClient} from '@angular/common/http';
import {ToastController,App} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {LoadingProvider} from '../loading/loading'
import {ModalController} from 'ionic-angular'


//let baseUrl = 'http://user.firecat.com'
let baseUrl = 'http://stg.zhenwin.com'

//let baseUrl = '/api'

@Injectable()
export class HttpClientProvider {

  plat = 'h5';

  constructor(public http: HttpClient,
              // public navCtrl: NavController,
              public load: LoadingProvider,
              private app: App,
              public toastCtrl:ToastController,
              public modalCtrl: ModalController) {
    console.log('Hello HttpClientProvider Provider');
  }

  public fetchData(url): Promise<any> {
    return new Promise((resolve, reject) => {
      //this.beforeRequest()
      this.http.get(baseUrl + url).subscribe((data: any) => {
        resolve(data)
      })
    })
  }

  public postData(url, params): Promise<any> {
    //return this.http.post(baseUrl + url,params)
    return new Promise((resolve, reject) => {
      this.http.post(baseUrl + url, params).subscribe((data: any) => {
        resolve(data)
      })
    })
  }






  checkPlatform() {
    let userAgent: any = navigator.userAgent.toLowerCase();
    this.plat = 'h5';
    if (userAgent.match(/iphone os/i) == "iphone os") {
      this.plat = 'ios';
    } else if (userAgent.match(/android/i) == "android") {
      this.plat = 'android';
    }
  }


  lineService(username) {
    this.checkPlatform();

    if (this.plat = 'ios') {
      window.open(`https://vp9.live800.com/live800/chatClient/chatbox.jsp?companyID=80000041&configID=2083&codeType=custom&info=loginname=${username}&name=${username}&hashCode=&amp;timestamp=${Date.now()}`, '_blank')
      return;
    }
    let profileModal = this.modalCtrl.create('Onlineservice', {data: {username: username}, title: ''});
    profileModal.present();
  }

  //超时验证到登陆
  checkTimeOut(data){
    if(data.IsSuccess==2){
      let nav = this.app.getActiveNav();
      localStorage.removeItem('userInfo');
      this.load.showMidToast(this.toastCtrl,'登陆超时，请重新登陆')
      nav.push('LoginPage')
    }else {
      return null;
    }
  }

  checkUnjump(data){
    if(data.IsSuccess==2){
      // let nav = this.app.getActiveNav();
      localStorage.removeItem('userInfo');
      this.load.showMidToast(this.toastCtrl,'登陆超时，请重新登陆')
    }else {
      return null;
    }
  }

}
