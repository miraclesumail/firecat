import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import * as $ from 'jquery';
import {BaseToolProvider} from '../../../providers/base-tool/base-tool';
// import {KsBasketPage} from '../ks-basket/ks-basket';
// import {ViewController} from "ionic-angular/navigation/view-controller";
// import {Tpl} from '../../../providers/base-tool/tpl';
// import {KstrendAction} from '../../../providers/base-tool/kstrend-action';
import {KstrendAction} from './kstrend-action';

@IonicPage()
@Component({
  selector: 'page-kstrend',
  templateUrl: 'kstrend.html',
})
export class KstrendPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public base: BaseToolProvider,
              public action: KstrendAction
  ) {
    // super();
  }

  arr = [9, 13, 14, 6, 10, 15, 16, 3, 8, 12, 17, 12, 15, 18, 5, 15];

  ngOnInit(): void {

    // this.initView(this.navParams.get('wanfa'),1);
    // this.base.requestJiangQiData('21', '3').then(() => {
    //     $('.alert-con').html(this.navParams.get('htm'));
    //     // $('.alert-con').html(localStorage.kshtml);
    //     console.log('请求结束～～～');
    //     // this.initView(this.navParams.get('wanfa'),1);
    //     this.changePlaySelect();
    //   }
    // );
    //  getPrevious
    // first
    // last
    // indexOf
    //  length(): number;

    // console.log('this.navCtrl.first()===' + this.navCtrl.first())
    // console.log('this.navCtrl.getPrevious==' + this.navCtrl.getPrevious())
    // console.log('this.navCtrl.last()==' + this.navCtrl.last())
    // console.log('this.navCtrl.length()==' + this.navCtrl.length())

    $('.alert-con').html(this.navParams.get('htm'));
    // this.initView(this.navParams.get('wanfa'),1);
    // this.changePlaySelect();
    this.action.initView(this.navParams.get('wanfa'), 1);
    this.action.changePlaySelect();

  }

  ionViewDidLoad() {

    // this.initView(this.navParams.get('wanfa'),1);
    console.log('this.navParams.get(\'wanfa\')====' + this.navParams.get('wanfa'));

    // $('.alert-con').html(this.navParams.get('htm'));
    // this.base.requestJiangQiData('21', '3', 'trend').then(() => {
    //   // $('.alert-con').html(this.navParams.get('htm'));
    //   // $('.alert-con').html(localStorage.kshtml);
    //   console.log('请求结束～～～');
    //   // this.initView(this.navParams.get('wanfa'),1);
    //   //   this.changePlaySelect();
    // });

    this.initany();

  }

  ionViewWillEnter() {
    // this.initView();
    // this.loadData();
    console.log('ionViewWillEnter')
    this.base.requestJiangQiData(localStorage.idstr, '3', 'trend').then(() => {
      // console.log(123232323)
    });
  }


  initany() {


    // var startx, starty, left;
    // document.getElementsByClassName('hmfb-container')[0].addEventListener("touchstart",
    //   function (e) {
    //     startx = e.touches[0].pageX;
    //     // starty = e.touches[0].pageY;
    //     // var obj =  $('.hzzs-container .t-3').eq(0);
    //     var obj = $('.hmfb-container');
    //     left = obj.scrollLeft();
    //     $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
    //   }, true);
    // document.getElementsByClassName('hmfb-container')[0].addEventListener("touchmove",
    //   function (e) {
    //     $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
    //     // $('.ks-tab-second').scrollLeft(left);
    //   }, true)
    // document.getElementsByClassName('hmfb-container')[0].addEventListener("touchend",
    //   function (e) {
    //     $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
    //     // $('.ks-tab-second').scrollLeft(left);
    //   }, true)


    var startx, starty, left;
    document.getElementsByClassName('ion-con')[0].addEventListener("touchstart",
      function (e) {
        startx = e.touches[0].pageX;
        // starty = e.touches[0].pageY;
        // var obj =  $('.hzzs-container .t-3').eq(0);
        var obj = $('.hzzs-container');
        left = obj.scrollLeft();
        $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
        $('.ks-tab-second').scrollLeft($('.hzzs-container').scrollLeft());
        $('.ks-bom-ul').scrollLeft($('.hzzs-container').scrollLeft());
        $('.ks-bom-ul').scrollLeft($('.hmfb-container').scrollLeft());

        $('.hzzs-container').scrollLeft($('.ks-bom-ul').scrollLeft());
      }, true);

    document.getElementsByClassName('ion-con')[0].addEventListener("touchmove",
      function (e) {
        $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
        $('.ks-tab-second').scrollLeft($('.hzzs-container').scrollLeft());
        $('.ks-bom-ul').scrollLeft($('.hzzs-container').scrollLeft());
        $('.ks-bom-ul').scrollLeft($('.hmfb-container').scrollLeft());

        $('.hzzs-container').scrollLeft($('.ks-bom-ul').scrollLeft());
        // $('.ks-tab-second').scrollLeft(left);
      }, true);

    document.getElementsByClassName('ion-con')[0].addEventListener("touchend",
      function (e) {
        $('.ks-tab-second').scrollLeft($('.hmfb-container').scrollLeft());
        $('.ks-tab-second').scrollLeft($('.hzzs-container').scrollLeft());
        $('.ks-bom-ul').scrollLeft($('.hzzs-container').scrollLeft());
        $('.ks-bom-ul').scrollLeft($('.hmfb-container').scrollLeft());

        $('.hzzs-container').scrollLeft($('.ks-bom-ul').scrollLeft());
        // $('.ks-tab-second').scrollLeft(left);
      }, true);



  }


  ionViewDidLeave() {
    clearInterval(this.base.timeIddd);
    //记录当前topselelctview
    // localStorage.kshtml = $('page-kstrend .alert-con').html();
    // console.log('localStorage.kshtml===' + localStorage.kshtml);

  }

  ionViewWillLeave() {
    clearInterval(this.base.timeIddd);
    //记录当前topselelctview
    localStorage.kshtml = $('page-kstrend .alert-con').html();
    localStorage.wanfa = $('page-kstrend .wanfa').text();
    // console.log('localStorage.kshtml===' + localStorage.kshtml);
  }


  pushToBasket() {


    // 未 选号 并且 缓存未空 -->  按钮灰色
    // 否则 -->  按钮亮色
    // localStorage.moneyunit;
    // var ballstr = localStorage.balls;
    //购彩蓝 balls 数组添加数据 ，然后push

    this.addOrderEvent();
    this.navCtrl.push("KsBasketPage")

  }

  addOrderEvent() {

    var zhu = $('.ks-bom-ul .active').length;
    // if (zhu === 0) return;
    if (zhu > 0) {
      let wanfa = $('page-kstrend .wanfa').text();
      if (wanfa.search('二同号') != -1) {
        zhu = zhu * 5;
      }
      // if (wanfa.search('二同号') != -1) {
      //   this.dealWithBallDataWithErth(zhu*5);
      // } else {
      this.dealWithBallData(zhu);
      // }
      let balll = JSON.parse(localStorage.balls);
      // $('.bottom-r').css('background', '');
      this.cleanBalls();
    } else {
      //弹框提示
      alert('请选号~');
    }

  }


  dealWithBallData(zhu) {

    let wayId = localStorage.wayId;
    let ballStr = this.getBallStr();
    let wanfa = $('page-kstrend .wanfa').text();
    var moneyunit = localStorage.moneyunit;
    var jsid = 1;
    if (localStorage.balls != null) {
      jsid = JSON.parse(localStorage.balls).length + 1;
    }
    let betinfo =
      {
        "jsId": jsid,
        "wayId": wayId,
        "ball": ballStr,
        "viewBalls": ballStr,
        "num": zhu,
        "moneyunit": moneyunit,
        "position": [],
        "multiple": 1,
        "onePrice": 2,
        "prize_group": localStorage.bet_max_prize_group,
        "wanfa": wanfa,
        "price": zhu * 2 * moneyunit
      };
    let balls = [];
    let ballsitem = "";
    let ball = localStorage.balls;
    console.log('添加号码时候localStorage.bal===' + localStorage.balls);
    // if (ball == null) {
    if (!localStorage.balls) {

      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    } else {
      let balldata = JSON.parse(ball);
      //检测号码重复性～～
      if (this.isNumDuplication(betinfo).j == 1) {

        ballsitem = JSON.stringify(this.isNumDuplication(betinfo).data);
      } else {

        balldata.push(betinfo);
        ballsitem = JSON.stringify(balldata);
      }
    }
    localStorage.balls = ballsitem;

  }


  isNumDuplication(betinfo) {
    // 先得到新增号码
    // 遍历 存在号码数组
    var j = 0;
    var ballstr = betinfo.ball;
    var balldata = JSON.parse(localStorage.balls);
    for (var i = 0; i < balldata.length; i++) {
      var str = balldata[i].ball;
      if (str == ballstr) {
        j++;
        balldata[i].multiple = parseInt(balldata[i].multiple) + parseInt(betinfo.multiple);
        balldata[i].price += betinfo.price;
      }
    }
    var result = {j: j, data: balldata};
    return result;
  }


  getBallStr() {
    // $('.ks-bom-ul .active').length;

    var len = $('.ks-bom-ul .active').length;
    var arr = [], str;

    let wanfa = $('page-kstrend .wanfa').text();
    if (wanfa.search('二同号') != -1) {
      for (var i = 0; i < len; i++) {
        var txt = $('.ks-bom-ul .active').eq(i).attr('data-index');
        arr.push(txt);
      }
      str = arr.join('|');
    } else {
      for (var i = 0; i < len; i++) {
        var txt = $('.ks-bom-ul .active').eq(i).text();
        arr.push(parseInt(txt));
      }
      str = arr.join('|');//112|223|334
    }

    return str;

  }


  cleanBalls() {

    $('.ks-bom-ul .active').removeClass('active');

  }

  addCover() {
    // let _this = this;
    // if ($('.header-top').hasClass('hide')) {
    //   _this.removeCover();
    //   return;
    // }
    $('.select-d').addClass('hide');
    $('.body-bg').removeClass('hide');
    $('.alert-con').removeClass('hide');
    $('.after-con').addClass('active');
  }


  // addCover() {
  //   let _this = this;
  //   if ($('.header-top').hasClass('hide')) {
  //     _this.removeCover();
  //     return;
  //   }
  //   $('.header-top').addClass('hide');
  //   $('.body-bg').removeClass('hide');
  //   $('.alert-con').removeClass('hide');
  //   $('.after-con').addClass('active');
  // }


  // removeCover() {
  //   $('.header-top').removeClass('hide');
  //   $('.body-bg').addClass('hide');
  //   $('.alert-con').addClass('hide');
  // }


}
