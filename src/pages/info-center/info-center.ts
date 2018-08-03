import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams ,ToastController,LoadingController } from 'ionic-angular';

import { LoadingProvider } from '../../providers/loading/loading'
import { HttpClientProvider } from '../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-info-center',
  templateUrl: 'info-center.html',
})
export class InfoCenterPage {
  userInfo;
  infoData = {
    unreadLetter: 0,
    unreadAnnouncements: 0,
    announcements: {data:[]},
    letters: {data:[]},
    announcements_id:[],
    letters_id:[]
  };
  IcCenter = {
    unreadLetter:0,
    unreadAnnouncements:0
  }
  infoCenter:string = 'info';

  constructor(
    public navCtrl: NavController,
    public http:HttpClientProvider,
    public toastCtrl:ToastController,
    public loadCtrl:LoadingController,
    public LoadPrvd:LoadingProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  ionViewWillEnter(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.loadannouncements();
    this.announcementsUnreadnum();
    if(this.userInfo){
      this.letterUnreadnum();
      this.loadLetters();
    }
  }
  // ionViewDidEnter(){
  //   this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //   console.log(this.userInfo)
  // }


  showConfirm(group) {
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '确认删除所有消息？',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确认',
          handler: () => {
            if (this.infoCenter == 'info' && this.infoData.announcements_id.length !== 0) {
              this.announcementDelete(this.infoData.announcements_id)
            } else if (this.infoCenter == 'msg' && this.infoData.letters_id.length !== 0) {
              this.letterDelete(this.infoData.letters_id)
            } else if (this.infoCenter == 'info' && this.infoData.announcements_id.length == 0) {
              this.LoadPrvd.showToast(this.toastCtrl, '没有公告啦')
            } else if (this.infoCenter == 'msg' && this.infoData.letters_id.length == 0) {
              this.LoadPrvd.showToast(this.toastCtrl, '没有站内信啦')
            }

          }
        }
      ]
    });
    confirm.present();
  }


  delete(group, _index) {
    this.infoData[group].splice(_index, 1);
  }


  //页面跳转
  async pushPage(page, _id) {
    if (this.infoCenter == 'info') {
      if(this.userInfo){
        await this.http.fetchData('/h5api-announcements/view/' + _id +'?_t=' + this.userInfo.auth_token).then(data => {
          this.http.checkUnjump(data)
          if (data.IsSuccess == 1) {
            this.navCtrl.push(page, {
              title:'公告详情',
              detail:data.data
            });
          }
        })
      }else {
        await this.http.fetchData('/h5api-announcements/view/' + _id).then(data => {
          this.http.checkUnjump(data)
          if (data.IsSuccess == 1) {
            this.navCtrl.push(page, {
              title:'公告详情',
              detail:data.data
            });
          }
        })
      }
    } else {
      await this.http.fetchData('/h5api-station-letters/view/' + _id + '?_t=' + this.userInfo.auth_token).then(data => {
        this.http.checkUnjump(data)
        if (data.IsSuccess == 1) {
          this.navCtrl.push(page,{
            title:'站内信详情',
            detail:data.data
          });
        }
      })
    }
  }


  async letterUnreadnum() {
    await this.http.fetchData('/h5api-station-letters/unreadnum?_t=' + this.userInfo.auth_token).then(data=>{

      this.IcCenter.unreadLetter = data.data.num
    });
  }

  async loadLetters() {
    this.infoData.letters_id = [];
    await this.http.fetchData('/h5api-station-letters/?_t=' + this.userInfo.auth_token).then(data=>{
      this.http.checkTimeOut(data)
      this.infoData.letters.data = data.data
      if(this.infoData.letters.data.length!=0){
        for(let i=0,len=this.infoData.letters.data.length;i<len;i++){
          this.infoData.letters_id.push(this.infoData.letters.data[i].id)
        }
      }
    });


  }

  infoChanged(event){
    if(event._value == 'msg'){
      if(this.userInfo){
        this.letterUnreadnum();
        this.loadLetters();
      }else {
        this.LoadPrvd.showToast(this.toastCtrl,'获取站内信，请先登录')
      }
    }else {
      return false;
    }
  }


  async announcementsUnreadnum() {
    if(this.userInfo) {
      await this.http.fetchData('/h5api-announcements/unreadnum?_t='+this.userInfo.auth_token).then(data=>{
        this.IcCenter.unreadAnnouncements = data.data.num
      });
    }else {
      this.IcCenter.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum')).data.num;
      this.IcCenter.unreadAnnouncements = data.data.num
    }
  }
  async loadannouncements() {
    this.infoData.announcements_id = [];
    if(this.userInfo){
      await this.http.fetchData('/h5api-announcements?_t='+this.userInfo.auth_token).then(data=>{
        this.infoData.announcements.data = data.data
      });

    }else {
      await this.http.fetchData('/h5api-announcements').then(data=>{
        this.infoData.announcements.data = data.data
      });
    }

    if(this.infoData.announcements.data.length!=0){
      for(let i=0,len=this.infoData.announcements.data.length;i<len;i++){
        this.infoData.announcements_id.push(this.infoData.announcements.data[i].id)
      }
    }


  }



  //站内信置顶1/取消置顶2
  async letterSetTop(_id, _is_top) {
    await this.http.postData('/h5api-station-letters/settop?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      _token: this.userInfo.token,
      id: _id,
      is_top: _is_top
    }).then(data => {
      this.http.checkTimeOut(data)
      if (data.IsSuccess) {
        this.loadLetters()
      }
    })
  }


  //公告置顶1/取消置顶2
  async announcementsSetTop(_id, _is_top) {

    await this.http.postData('/h5api-announcements/settop?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      _token: this.userInfo.token,
      id: _id,
      is_top: _is_top
    }).then(data => {
      this.http.checkUnjump(data)
      if (data.IsSuccess) {
        this.loadannouncements()
      }
    })


  }


  //站内信删除
  async letterDelete(_id) {
    let loading = this.LoadPrvd.showLoading(this.loadCtrl, '删除中')
    await this.http.postData('/h5api-station-letters/setdelete?_t=' + this.userInfo.auth_token, {
      'Content-Type': 'application/x-www-form-urlencoded',
      '_token': this.userInfo.token,
      id: _id
    }).then(data => {
      this.http.checkUnjump(data)
      loading.dismiss()
      if (data.IsSuccess) {
        loading = this.LoadPrvd.showToast(this.toastCtrl, '删除成功')
        this.letterUnreadnum();
        this.loadLetters();
      }
    })
  }




  //公告删除
  async announcementDelete(_id) {
    if(this.userInfo){
      let loading = this.LoadPrvd.showLoading(this.loadCtrl,'删除中')
      await this.http.postData('/h5api-announcements/setdelete?_t=' + this.userInfo.auth_token, {
        'Content-Type': 'application/x-www-form-urlencoded',
        '_token': this.userInfo.token,
        id: _id
      }).then(data => {
        loading.dismiss()
        this.http.checkUnjump(data)
        if (data.IsSuccess) {
          loading = this.LoadPrvd.showToast(this.toastCtrl,'删除成功')
          this.loadannouncements();
          this.announcementsUnreadnum();
        }
      })
    }else {
      let loading = this.LoadPrvd.showToast(this.toastCtrl,'请先登录')
    }

  }
}
