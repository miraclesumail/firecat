import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading'

@IonicPage()
@Component({
  selector: 'page-hot-gmage-list',
  templateUrl: 'hot-gmage-list.html',
})
export class HotGmageListPage {

  lottorys = {
    editable:false,
    data:{
      hot: [{friend_name:"",identifier:''}],
      more:[{friend_name:"",identifier:''}]
    }
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadPrd:LoadingProvider,
    public ViewCtrl: ViewController) {

    this.lottorys.data.hot = JSON.parse(localStorage.getItem('lottorys')).hot;
    this.lottorys.data.more = JSON.parse(localStorage.getItem('lottorys')).more;

  }

  ionViewDidLoad() {
    console.log(this.navParams)
  }


  decreament(_lottory,_index){
    if(this.lottorys.editable){
      if(this.lottorys.data.hot.length>3){
        this.lottorys.data.more.push(_lottory)
        this.lottorys.data.hot.splice(_index,1)
      }else{
        this.loadPrd.showMidToast(this.toastCtrl,'最少保留3个彩种')
      }
    }


  }

  increament(_lottory,_index){
    if(this.lottorys.editable){
      this.lottorys.data.hot.push(_lottory)
      this.lottorys.data.more.splice(_index,1)
    }

  }

  toggleEdit(){

    if(this.lottorys.editable){
      localStorage.lottorys = JSON.stringify(this.lottorys.data)

    }
    this.lottorys.editable =!this.lottorys.editable;
  }
}
