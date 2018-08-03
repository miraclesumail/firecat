import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Loading, LoadingController, ToastController, Toast} from 'ionic-angular'



@Injectable()
export class LoadingProvider {

  loader:any;
  toast:any;
  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {

  }

  //通用 loading 组件
  showLoading(loadingCtrl: LoadingController,
                        message: string): Loading {
    this.loader = loadingCtrl.create({
      content: message,
      duration: 2000,
      dismissOnPageChange: true
    });
    this.loader.present();
    return this.loader;
  }

   //通用 loading 组件
   showLoadingDefault(loadingCtrl: LoadingController,
    message: string): Loading {
    this.loader = loadingCtrl.create({
    content: message
    });
    this.loader.present();
    return this.loader;
    }


    showTip(message,time?){
        let loader = this.loadingCtrl.create({
          content: message,
          duration: time || 2000,
          dismissOnPageChange: true
        });
        loader.present()
        
    }

    showWarn(message){
      let loader = this.loadingCtrl.create({
        content: message,
        dismissOnPageChange: true
      });
      loader.present()
      return loader
   }
  //通用 loading 组件
  showMidToast(toastCtrl: ToastController, massage: string): Toast {
    this.toast = toastCtrl.create({
      message: massage,
      duration:1500,
      position: 'middle'
    })
    this.toast.present();
    return this.toast;
  }


  //通用 toast 组件
  showToast(toastCtrl: ToastController, massage: string): Toast {
    this.toast = toastCtrl.create({
      message: massage,
      duration:2000,
      position: 'bottom'
    })
    this.toast.present();
    return this.toast;
  }
}
