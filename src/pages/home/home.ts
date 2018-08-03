import {Component} from '@angular/core';
import { IonicPage, NavController, ModalController} from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home'
import { CommonProvider } from "../../providers/common/common";
import { LoadingProvider } from '../../providers/loading/loading'

import { BasketDataProvider } from '../../providers/basket-data/basket-data'


declare var Swiper;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  userInfo:any = null;
  banner_swiper: any;
  info_swiper: any;
  showData = {'is_pop':0}
  homeData: any;
  infoData = {
    announcements: {data:['ddd']},
    letters: {data:['ddd']}
  }

  constructor(public navCtrl: NavController,
              public homePrv: HomeProvider,
              public modalCtrl: ModalController, public common:CommonProvider, public basket:BasketDataProvider, public loading:LoadingProvider) {

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

    this.homePrv.loadbanner();
    this.homePrv.loadannouncements();
    this.loadPop()

  }

  ionViewWillEnter(){
    this.homePrv.lottoryInfo();
    // this.homePrv.loadHotLottory();
    this.homePrv.announcementsUnreadnum();
  }

  ionViewDidEnter(){

    if(this.common.timer){
      clearInterval(this.common.timer)
      this.common.resetLotteryData()
    }

    this.basket.clearBasket()

  }

  ngAfterContentInit(){
    this.swiper_init()
  }

  swiper_init() {


    this.info_swiper = new Swiper('.info-slider', {
      direction: 'vertical',
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      }
    })

    setTimeout(()=>{
      this.banner_swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
      //  centeredSlides: true,
        spaceBetween: 5,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
        },
      });
    },800)
  }

  //页面跳转
  pushPage(pageName, data) {
    if (data) {
      this.navCtrl.push(pageName, data)
    } else {
      this.navCtrl.push(pageName)
    }
  }

  toLottory(lottory){

    if(lottory.redirect_url){
      this.common.gameId = lottory.id
      this.common.series_id = lottory.series_id
      localStorage.idstr = lottory.id

      

      if(this.common.hasLoad.indexOf(this.common.series_id) == -1){
         this.common.hasLoad.push(this.common.series_id)
         this.loading.showWarn('正在获取玩法配置')
      }
      this.navCtrl.push(lottory.redirect_url).then(aa => console.log('rwggweagsvsv'))
    }else{
      alert('no pages')
    }
  }

  closePop(){
    this.showData.is_pop=0;
  }

  async loadPop(){
    if(this.userInfo==null){

    }else {
      await this.homePrv.http.fetchData('/h5api-announcements/getalter?_t='+this.userInfo.auth_token).then(data=>{
        if(data.IsSuccess){
          this.showData = data.data
        }
      })
    }

  }

}
