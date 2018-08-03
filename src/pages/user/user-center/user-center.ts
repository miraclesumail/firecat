import {Component} from '@angular/core';
import {IonicPage,ToastController, LoadingController,NavController, NavParams, Platform} from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading'
import {ActionSheetController} from 'ionic-angular';
import { HttpClientProvider } from '../../../providers/http-client/http-client'

//camara
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {stringify} from 'qs';



declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: './user-center.html',
})
export class UserCenterPage {

  imgPath = '';
  fileTransfer: FileTransferObject = this.transfer.create();

  defaultAvator = 'data:image/png;base64,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'
  unreadAnnouncements:number=0;
  userInfo: any = null;
  toast:any = null;
  timer = null;

  constructor(
              public platform: Platform,

              private camera: Camera,
              private transfer: FileTransfer,
              private file: File,
              public http: HttpClientProvider,
              public toastCtrl: ToastController,
              public loadPrd:LoadingProvider,
              public LoadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  async announcementsUnreadnum() {
    if(this.userInfo!=null){
      this.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum?_t=' + this.userInfo.auth_token)).data.num;
    }else {
      this.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum')).data.num;
    }
  }

  //实时获取余额
  getBalance(){
    if(this.userInfo!=null){
      this.timer = setInterval(()=>{
        this.http.fetchData('/h5api-users/user-account-info?_t='+this.userInfo.auth_token).then(data=>{
          this.http.checkUnjump(data)

          this.userInfo.available = data.data.available;
          localStorage.userInfo = JSON.stringify(this.userInfo);
        })
      },10000)

    }else {
      clearInterval(this.timer)
    }

  }




  //头像更换
  changePic() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '从相册中选择',
          // role: 'destructive',
          handler: () => {
            this.openCamera('PHOTOLIBRARY')
          }
        }, {
          text: '拍照',
          handler: () => {
            this.openCamera('CAMERA')
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }


  ionViewDidEnter(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.announcementsUnreadnum();
    this.getBalance()
  }

  ionViewWillLeave(){
    clearInterval(this.timer)
  }

  /**
   * 打开摄像头
   */
  openCamera(opt) {
    const options: CameraOptions = {
      quality: 60,                                                   //相片质量 0 -100
      destinationType: this.camera.DestinationType.DATA_URL,        //DATA_URL 是 base64   FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,                                       //是否保存到相册
      allowEdit:true,
      sourceType: this.camera.PictureSourceType[opt],         //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.userInfo.avatar = base64Image;

      localStorage.userInfo = JSON.stringify(this.userInfo);
      this.upload();

    }, (err) => {
      // Handle error
      this.toast = this.loadPrd.showMidToast(this.toastCtrl,'请在博猫app中使用该功能')
    });
  }

  /**
   * 文件上传
   */
  upload() {
    let loading = this.loadPrd.showLoading(this.LoadingCtrl,'头像上传中')
    this.http.postData('/h5api-users/setavatar?_t=' + this.userInfo.auth_token,{
      'Content-Type':'application/x-www-form-urlencoded',
      'avatar':this.userInfo.avatar,
      '_token':this.userInfo.token
    }).then(data=>{
      loading.dismiss()
      this.http.checkUnjump(data)
      if(data.IsSuccess){
        this.toast = this.loadPrd.showMidToast(this.toastCtrl,'哎呦喂！好棒，头像上传成功！')
      }else {
        this.toast = this.loadPrd.showMidToast(this.toastCtrl,'哎呦喂！上传失败了，再试一次呗！')
      }

    })
  }





  //页面跳转
  pushPage(page,needLogin,isOpen) {
    if(isOpen){
      if(needLogin){
        if(this.userInfo==null){
          this.toast = this.loadPrd.showToast(this.toastCtrl, '请先登录');
        }else {
          this.navCtrl.push(page);
        }
      }else {
        this.navCtrl.push(page);
      }
    }else {
      this.toast = this.loadPrd.showToast(this.toastCtrl, '功能逐步开放中，敬请期待！');
    }
  }


  toScanQRCode(){
    this.navCtrl.push('ScanQrPage',null,{'animate':false})
  }

  formatMoney(num){
    let re = /(-?\d+)(\d{3})/;
    if (Number.prototype.toFixed) {
      num = (+num).toFixed(2)
    } else {
      num = Math.round(+num * 100) / 100
    }
    num = '' + num;
    while (re.test(num)) {
      num = num.replace(re, "$1,$2")
    }
    return num
  }

}
