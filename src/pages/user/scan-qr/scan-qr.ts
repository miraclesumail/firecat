import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams,AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { LoadingProvider } from '../../../providers/loading/loading'
import {HttpClient} from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {

  userInfo: any = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:HttpClient,
              private qrScanner: QRScanner,
              public loadPrd:LoadingProvider,
              public toast:ToastController,
              public alertCtrl: AlertController,) {

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  ionViewDidEnter() {
    this.checkUsr()
  }

  checkUsr(){
    if(this.userInfo!=null){
      this.loadPrd.showToast(this.toast,'哎呦喂，老用户不能参与该活动喔！')
      setTimeout(()=>{
        this.navCtrl.pop()
      },500)

    }else {
      this.scanQrcode()
    }
  }

  //scan qrCode
  scanQrcode(){
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show();
          window.document.querySelector('body').classList.add('transparent-body');
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {

            scanSub.unsubscribe();

            this.http.get(text).subscribe(data=>{
              this.qrScanner.destroy();
              this.loadPrd.showToast(this.toast,data.Msg)

              this.navCtrl.push('AcceptInvitePage',{invite:data.data})

            })

          });



        }
        else if (status.denied) {
          this.loadPrd.showToast(this.toast,'请打开相机权限')
          this.navCtrl.pop()
        }
        else {

        }
      })
      .catch((e: any) => {
        this.loadPrd.showToast(this.toast,'请在app中扫描二维码')
      });
  }
}
