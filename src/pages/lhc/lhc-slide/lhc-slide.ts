import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, LoadingController, Navbar} from 'ionic-angular';
import {LhcAction} from "./lhc-action";

import {HttpClient} from '@angular/common/http';
import {RestProvider} from '../../../providers/rest/rest';
import {BaseToolProvider} from '../../../providers/base-tool/base-tool';
// import {LhctrendPage} from '../lhctrend/lhctrend';
import * as $ from 'jquery';
import {Tpl} from "../../../providers/base-tool/tpl";

declare var Swiper;
declare var encrypt;

@IonicPage()
@Component({
  selector: 'page-lhc-slide',
  templateUrl: 'lhc-slide.html',
})
export class LhcSlidePage extends LhcAction {
  @ViewChild(Navbar) navBar: Navbar;
  color = {
    red: ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'],
    blue: ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48']
  };
  menus: Array<string> = ["快捷下注", "自选下注"];
  @ViewChild('contentSlides') contentSlides: Slides;

  swiper: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public rest: RestProvider,
              public base: BaseToolProvider,
              public loading: LoadingController) {

    super();
  }

//   玩法            最大奖金            奖金组
//   特码            49                 2000
//   正码            49                 2000
//   半波

//   6.8571              2000　          红大，绿双，绿合单，蓝小，绿小

//   ４．８               2000           红小

//   ６                  2000            红单，绿合双，红和双，蓝单，绿大，蓝双，绿单，蓝合双

//   5.3333              2000           红双，蓝大，红合单

//   生肖

//   特肖               12.2500          2000
// 其他，

//   9.8000             2000            ｄｏｇ

//   ６肖               2.0000           2000

//   １肖               2.1199           2000        其他

//   1.8054             2000            ｄｏｇ

//   尾数              2.1199              2000       0尾

//   1.8054              2000           其他尾数

//   总分              2.0000              2000         大小单双

//   4.0000             2000           大单，大双，小单，小双

//   不中
//   2.2416            2000            ５不中
//   2.6657             2000            ６不中
//   3.1841             2000            ７不中
//   3.8209             2000            ８不中
//   4.6075             2000            ９不中
//   5.5849             2000            １０不中

//   用户奖金组×最大奖金即为赔率
//   用户奖金组大鱼1950的按1950计算
//   小于１９５０的按实际奖金组计算


  backButtonClick = (e: UIEvent) => {

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      console.log(key);
    }

    localStorage.removeItem('balls');
    // localStorage.removeItem('self_balls');
    localStorage.removeItem('wanfa');
    localStorage.removeItem('wayId');
    localStorage.removeItem('typeStr');
    localStorage.removeItem('nextDate');
    localStorage.removeItem('bet_max_prize_group');
    localStorage.removeItem('bet_min_prize_group');
    localStorage.removeItem('bet_note');
    localStorage.removeItem('bonus_note');
    localStorage.removeItem('lhchisdata');
    localStorage.removeItem('moneyunit');
    localStorage.removeItem('max_multiple');

    // localStorage.removeItem('hisissue');
    this.navCtrl.pop({animate: false});
  }

  pushToTrend() {

    this.navCtrl.push("LhctrendPage");
    $('.right-popover').css('height', '0px')
  }
  pushToIntroduce(){
    localStorage.which = 6;
    $('.right-popover').css('height', '0px')
    this.navCtrl.push("IntroducePage");

  }

  ionViewDidLoad() {

    this.initSwiper();
    this.navBar.backButtonClick = this.backButtonClick;
    // this.initView();
    this.base.requestPlayData(localStorage.idstr, '6').then((response) => {
        // this.initOdds(response);
        this.changePlaySelect();
      }
    );

    this.initAny();
  }

  ionViewWillEnter() {
    this.initView();
    this.requestHisData();
    this.base.requestJiangQiData(localStorage.idstr, '6', 'play').then(() => {
      this.initOdds();
    });
  }

  calculatePrize(prize, user_prize) {
    return new Number(prize * parseInt(user_prize) / 2000).toFixed(2);
  }

  prize = {
    tema: 49,
    zhma: 49,

    bb_hd_ls_lhd_lx: 6.8571,
    bb_1: 4.8,
    bb_25681114151617: 6,
    bb_3412: 5.3333,

    tex: 12.25,
    tex_dog: 9.8,
    liux: 2,

    yix: 2.11,
    yix_dog: 1.8054,

    ws_0: 2.1199,
    ws: 1.8054,

    zf_1: 2,
    zf_2: 4,

    bz_5: 2.2416,
    bz_6: 2.6657,
    bz_7: 3.1841,
    bz_8: 3.8209,
    bz_9: 4.6075,
    bz_10: 5.5849

  };

  initOdds() {
    var user_prize = localStorage.user_prize_group;
    if (parseInt(user_prize) > 1950) {
      user_prize = 1950;
    }

    var tm_prize, bb_prize, tx_prize, yx_prize, lx_prize, ws_prize, zf_prize, bz_pirze;

    var bb_0791013,bb_1,bb_25681114151617,bb_3412 ,
      tex,tex_dog,liux ,yix,yix_dog ,ws_0,ws,zf_1,zf_2 ,
      bz_5,bz_6,bz_7,bz_8,bz_9,bz_10;

    tm_prize = this.calculatePrize(this.prize.tema, user_prize);
    bb_0791013 = this.calculatePrize(this.prize.bb_hd_ls_lhd_lx, user_prize);
    bb_1 = this.calculatePrize(this.prize.bb_1, user_prize);
    bb_25681114151617 = this.calculatePrize(this.prize.bb_25681114151617, user_prize);
    bb_3412 = this.calculatePrize(this.prize.bb_3412, user_prize);

    tex = this.calculatePrize(this.prize.tex, user_prize);
    tex_dog = this.calculatePrize(this.prize.tex_dog, user_prize);

    liux = this.calculatePrize(this.prize.liux, user_prize);

    yix = this.calculatePrize(this.prize.yix, user_prize);
    yix_dog = this.calculatePrize(this.prize.yix_dog, user_prize);

    ws_0 = this.calculatePrize(this.prize.ws_0, user_prize);
    ws = this.calculatePrize(this.prize.ws, user_prize);

    zf_1 = this.calculatePrize(this.prize.zf_1, user_prize);
    zf_2 = this.calculatePrize(this.prize.zf_2, user_prize);

    bz_5 = this.calculatePrize(this.prize.bz_5, user_prize);
    bz_6 = this.calculatePrize(this.prize.bz_6, user_prize);
    bz_7 = this.calculatePrize(this.prize.bz_7, user_prize);
    bz_8 = this.calculatePrize(this.prize.bz_8, user_prize);
    bz_9 = this.calculatePrize(this.prize.bz_9, user_prize);
    bz_10 = this.calculatePrize(this.prize.bz_10, user_prize);


    $('.peilv-tip').text('赔率 *' + tm_prize);

    $('.lhc-bb').find('.pl:eq(0),.pl:eq(7),.pl:eq(9),.pl:eq(10),.pl:eq(13)').text(' 赔率 ' + bb_0791013);
    $('.lhc-bb .pl').eq(1).text(' 赔率 ' + bb_1);
    $('.lhc-bb').find('.pl:eq(2),.pl:eq(5),.pl:eq(6),.pl:eq(8),.pl:eq(11),.pl:eq(14),.pl:eq(15),.pl:eq(16),.pl:eq(17)').text(' 赔率 ' + bb_25681114151617);
    $('.lhc-bb').find('.pl:eq(3),.pl:eq(4),.pl:eq(12)').text(' 赔率 ' + bb_3412);


    $('.lhc-ws .pl').text(' 赔率 ' + ws);
    $('.lhc-ws .pl').eq(0).text(' 赔率 ' + ws_0);

    $('.lhc-points').find('.pl:eq(0),.pl:eq(1),.pl:eq(2),.pl:eq(3)').text(' 赔率 ' + zf_1);
    $('.lhc-points').find('.pl:eq(4),.pl:eq(5),.pl:eq(6),.pl:eq(7)').text(' 赔率 ' + zf_2);

    $('.self-points').find('.odds:eq(0),.odds:eq(1),.odds:eq(2),.odds:eq(3)').text(zf_1);
    $('.self-points').find('.odds:eq(4),.odds:eq(5),.odds:eq(6),.odds:eq(7)').text(zf_2);

    $('.self-ws .odds.animated').text(ws);
    $('.self-ws .odds.animated').eq(0).text(ws_0);

    $('.self-bb').find('.odds:eq(0),.odds:eq(7),.odds:eq(9),.odds:eq(10),.odds:eq(13)').text(bb_0791013);
    $('.self-bb .odds').eq(1).text(bb_1);
    $('.self-bb').find('.odds:eq(2),.odds:eq(5),.odds:eq(6),.odds:eq(8),.odds:eq(11),.odds:eq(14),.odds:eq(15),.odds:eq(16),.odds:eq(17)').text(bb_25681114151617);
    $('.self-bb').find('.odds:eq(3),.odds:eq(4),.odds:eq(12)').text(bb_3412);


    $('.self-tm .odds.animated').text(tm_prize);

    localStorage.tx_prize = tex;
    localStorage.tx_prize_dog = tex_dog;

    localStorage.yx_prize = yix;
    localStorage.yx_prize_dog = yix_dog;

    localStorage.lx_prize = liux;

    localStorage.tm_prize = tm_prize;

    localStorage.bz_5 = bz_5;
    localStorage.bz_6 = bz_6;
    localStorage.bz_7 = bz_7;
    localStorage.bz_8 = bz_8;
    localStorage.bz_9 = bz_9;
    localStorage.bz_10 = bz_10;

    // console.log('localStorage.bz_6===='+localStorage.bz_6);
    // console.log('localStorage.bz_7===='+localStorage.bz_7);
    // console.log('localStorage.bz_8===='+localStorage.bz_8);
    // console.log('localStorage.bz_9===='+localStorage.bz_9);
  }

  ionViewDidLeave() {
    clearInterval(this.base.timeIddd);
  }
  ionViewWillLeave() {
    clearInterval(this.base.timeIddd);
  }
  dealWithBallMultiple() {

    var moneyunit = parseInt($('.buy-input').val());
    if (moneyunit > 1) {
      var ballarr = JSON.parse(localStorage.balls);
      console.log('balls====' + ballarr)
      for (var i = 0; i < ballarr.length; i++) {
        ballarr[i].multiple = parseInt(ballarr[i].multiple) * moneyunit;
      }
      localStorage.balls = JSON.stringify(ballarr);
    }
  }

  betClick() {

    const that = this;
    // console.log('localStorage.userInfo=='+localStorage.userInfo)
    if (localStorage.userInfo == null||!localStorage.userInfo) {
      $('body').append(Tpl.fail_tip);
      $('#error-tip').text('您还未登录～');
      setTimeout(function () {
        $('.basket-pop').remove();
        localStorage.clear();
        // that.navCtrl.push("LoginPage");
      }, 1000);
      return;
    }

    this.dealWithBallMultiple();
    // console.log('localStorage.balls==' + localStorage.balls)
    const loader = this.loading.create({});
    loader.present();

    var gameId = localStorage.idstr;
    var obj = {};
    obj['gameId'] = gameId;
    obj['isTrace'] = "0";
    obj['traceWinStop'] = "1";
    obj['traceStopValue'] = "1";
    var balls = localStorage.balls;
    console.log('balls====' + balls)
    obj['balls'] = encrypt(balls);

    var ballarr = JSON.parse(balls);
    var type = $('.wanfa').text();
    if (type.search('不中') != -1 || type.search('六肖') != -1) {
      // 01|02|03|04|05
      var ballstr = [];
      for (var i = 0; i < ballarr.length; i++) {
        ballstr.push(ballarr[i].ball);
      }
      var ball = ballstr.join('|');
      ballarr[0].ball = ball;
      ballarr[0].moneyunit = 1;
      ballarr[0].num = $('.money-text .zhu').text();
      ballarr[0].multiple = 1;
      ballarr[0].viewBalls = '';
      console.log('ballarr[0]====' + ballarr[0]);
      ballstr = [];
      ballstr.push(ballarr[0]);
      balls = JSON.stringify(ballstr);
      console.log('balls====' + balls);
      obj['balls'] = encrypt(balls);
    }

    var nextDat = localStorage.nextDate;
    obj['orders'] = {}
    obj['orders'][nextDat] = 1;
    obj['is_encoded'] = 1;
    obj['bet_source'] = "h5";
    obj['multiple'] = 1;
    obj['amount'] = parseInt($('.money').text());

    obj['_token'] = JSON.parse(localStorage.getItem('userInfo')).token;

    let url = '/api-lotteries-h5/h5apibet/' + gameId + '?_t=' + JSON.parse(localStorage.getItem('userInfo')).auth_token;

    this.rest.postUrlReturn(url, obj)
      .subscribe((data) => {
        loader.dismiss();
        console.log('data～～～～～' + JSON.stringify(data));
        if (data.isSuccess) {
          // JSON.parse(localStorage.getItem('userInfo'))['available'] = data.data.available;

          var arr = JSON.parse(localStorage.userInfo);
          arr['available'] = data.data.available;
          localStorage.userInfo = JSON.stringify(arr);
          $('.lhc-popup').addClass('hide');
          $('.current').removeClass('current');
          $('.currunt').removeClass('currunt');
          $('.red-active').removeClass('red-active');
          $('.green-active').removeClass('green-active');
          $('.blue-active').removeClass('blue-active');
          $('.r-input').val('');
          $('#yue').text(data.data.available);
          $('body').append(Tpl.success_tip);
          setTimeout(function () {
            $('.basket-pop').remove();
          }, 1500);

        } else {

          // $('body').append(Tpl.fail_tip);
          // $('#error-tip').text('请重新登陆！');
          // setTimeout(function () {
          //   $('.basket-pop').remove();
          // }, 1500);


          if (data.type == 'loginTimeout') {
            $('body').append(Tpl.fail_tip);
            $('#error-tip').text('请重新登陆！');
            setTimeout(function () {
              $('.basket-pop').remove();
              clearInterval(that.base.timeIddd);
              // that.navCtrl.push("LoginPage");
            }, 1500);
          } else {
            $('body').append(Tpl.fail_tip);
            $('#error-tip').text(data.Msg);
            setTimeout(function () {
              $('.basket-pop').remove();
            }, 1500);
          }

        }
      });
  }


  requestHisData() {

    var url = '/api-lotteries-h5/load-issues/' + localStorage.idstr+'?count=90&sort=desc&_t=';
    // url = '/api-lotteries-h5/load-issues/' + localStorage.idstr + '?count=90&sort=desc_t=';
    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        // console.log(data);
        if (data.IsSuccess) {
          localStorage.lhchisdata = JSON.stringify(data.data);
          var htm = '', it;
          var arr = [];
          if (data.data.length > 10) {
            arr = data.data.reverse().slice(0, 9);
          } else {
            arr = data.data.reverse();
          }
          for (var i = 0; i < arr.length; i++) {
            if (data.data[i].code == '') {
              it = '<li class="his-line">\n' +
                '        <span class="kj-issue">' + data.data[i].number + '</span>\n' +
                '        <span class="kj-ing">等待开奖...</span>\n' +
                '      </li>';
            } else {
              it = '<li class="his-line">\n' +
                '              <span>' + data.data[i].number + '</span>\n' +
                '              <span>' + data.data[i].code.split(' ')[0] + '</span>\n' +
                '              <span>' + data.data[i].code.split(' ')[1] + '</span>\n' +
                '              <span>' + data.data[i].code.split(' ')[2] + '</span>\n' +
                '              <span>' + data.data[i].code.split(' ')[3] + '</span>\n' +
                '              <span>' + data.data[i].code.split(' ')[4] + '</span>\n' +
                '              <span>' + data.data[i].code.split(' ')[5] + '</span>\n' +
                '              <span>' + data.data[i].code.split(' ')[6] + '</span>\n' +
                '            </li>';
            }
            htm = htm + it;
          }
          $('.his-ul').html(htm);
        }
      });
  }

  initAny() {

    localStorage.wayId = 290;
    if (localStorage.userInfo) {
      $('#yue').text(JSON.parse(localStorage.getItem('userInfo')).available);
    } else {
      $('#yue').text(0);
    }
    this.base.initHisBox('lhc-content-child');
    // if ($('.lhc-content-child .section.active').offset().top < 156) {
    //   $(".his-box").stop().animate({height: "0px"}, 0);
    //   return;
    // }

  }


  initViewData() {
  }

  initSwiper() {
    this.swiper = new Swiper('.pageMenuSlides .swiper-container', {
      slidesPerView: this.menus.length,
      spaceBetween: 0,
      breakpoints: {
        1024: {
          slidesPerView: this.menus.length,
          spaceBetween: 0
        },
        768: {
          slidesPerView: this.menus.length,
          spaceBetween: 0
        },
        640: {
          slidesPerView: this.menus.length,
          spaceBetween: 0
        },
        320: {
          slidesPerView: this.menus.length,
          spaceBetween: 0
        }
      }
    });
  }

  selectPageMenu($event, index) {
    this.setStyle(index);
    this.contentSlides.slideTo(index);
  }

  slideChanged() {
    let index = this.contentSlides.getActiveIndex();
    this.setStyle(index);
    this.swiper.slideTo(index, 300);
  }

  setStyle(index) {
    var slides = document.getElementsByClassName('pageMenuSlides')[0].getElementsByClassName('swiper-slide');
    if (index < slides.length) {
      for (var i = 0; i < slides.length; i++) {
        var s = slides[i];
        s.className = "swiper-slide";
      }
      slides[index].className = "swiper-slide bottomLine";
    }
  }


}
