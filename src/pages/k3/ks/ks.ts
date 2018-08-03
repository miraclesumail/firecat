import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Navbar} from 'ionic-angular';
import {KsAction} from "./ks-action";
// import {KsBasketPage} from '../ks-basket/ks-basket';
import {PopoverController} from "ionic-angular";

import {UtilProvider} from '../../../providers/util/util'
import * as $ from 'jquery';
import {RestProvider} from '../../../providers/rest/rest';
import {BaseToolProvider} from '../../../providers/base-tool/base-tool';
import {IntroducePage} from "../introduce/introduce";


@IonicPage()
@Component({
  selector: 'page-ks',
  templateUrl: 'ks.html',
})
export class KsPage extends KsAction {

  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public util: UtilProvider,
              public base: BaseToolProvider,
              public rest: RestProvider) {
    super();
  }

  backButtonClick = (e: UIEvent) => {

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      console.log(key);
    }
    clearInterval(this.base.timeIddd);
    localStorage.removeItem('balls');
    localStorage.removeItem('wanfa');
    localStorage.removeItem('wayId');
    localStorage.removeItem('typeStr');
    localStorage.removeItem('nextDate');
    localStorage.removeItem('kshtml');
    localStorage.removeItem('bet_max_prize_group');
    localStorage.removeItem('bet_min_prize_group');
    localStorage.removeItem('bet_note');
    localStorage.removeItem('bonus_note');
    localStorage.removeItem('moneyunit');
    localStorage.removeItem('max_multiple');
    //暂时不清除这些
    // localStorage.removeItem('hisissue');
    // localStorage.removeItem('yldata60');
    // localStorage.removeItem('yldata60');
    // localStorage.removeItem('yldata90');
    // localStorage.removeItem('yldata');
    this.navCtrl.pop();
  }

  ionViewDidLoad() {

    let that = this;
    // this.util.shakePhone(() => {
    //   this.shakeClick();
    // })
    this.navBar.backButtonClick = this.backButtonClick;
    this.initView();
    // this.requestHisData();
    // 获取遗漏
    // this.getnewlotterymissed30();
    // this.getnewlotterymissed60();
    // this.getnewlotterymissed90();
    this.base.requestPlayData(localStorage.idstr, '3').then((response) => {
      // console.log('2222233333' + JSON.stringify(response))
      that.initOdds(response,1);
      localStorage.prizedata = JSON.stringify(response);
      this.changePlaySelect();
      // localStorage.kshtml = $('.alert-con').html();
    });
    this.initAny();

  }

  ionViewWillEnter() {
    this.requestHisData();
    this.getnewlotterymissed30();
    this.getnewlotterymissed60();
    this.getnewlotterymissed90();

    this.base.requestJiangQiData(localStorage.idstr, '3', 'play').then(() => {
      console.log('k3333333333')
    });

    // console.log('重新进入初始化 页面～～～')
    //初始化 顶部 选择按钮
    this.resetTopSelectView();

    if (localStorage.balls == null) {
      console.log('----WillEnter');
      $('.confirm-number').addClass('hide');
      $('.bottom-r').css('background', 'grey');
      return;
    }
    let balll = JSON.parse(localStorage.balls);
    if (balll.length > 0) {
      $('.confirm-number').removeClass('hide');
      $('.confirm-number').text(balll.length);
    } else {
      $('.confirm-number').addClass('hide');
    }

  }

  ionViewDidLeave() {
    // clearInterval(this.base.timeIddd);
  }

  ionViewWillLeave() {
    $('.ks-footer').css('background', '#ececec')
    clearInterval(this.base.timeIddd);
    // localStorage.removeItem('balls');放这里有问题，去购彩蓝戒面会
    //记录当前topselelctview
    localStorage.removeItem('kshtml');
    if(this.util.listeners.length){
          this.util.listeners.forEach(element => {
            window.removeEventListener('devicemotion',element,false)
          })
        }
    this.util.listeners = []

  }

  ionViewDidEnter(){
    this.util.shakePhone(() => {
      this.shakeClick();
    })
  }



  getnewlotterymissed60() {
    var url = '/api-lotteries-h5/getnewlottterymissed/' + localStorage.idstr + '/60?_t=';// + userInfo.auth_token;
    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        if (data.IsSuccess) {
          localStorage.yldata60 = JSON.stringify(data.data);
        }
      });
  }
  getnewlotterymissed90() {

    var url = '/api-lotteries-h5/getnewlottterymissed/' + localStorage.idstr + '/90?_t=';
    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        if (data.IsSuccess) {
          localStorage.yldata90 = JSON.stringify(data.data);
        }
      });
  }
  getnewlotterymissed30() {
    var url = '/api-lotteries-h5/getnewlottterymissed/' + localStorage.idstr + '/30?_t=';
    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        if (data.IsSuccess) {
          localStorage.yldata30 = JSON.stringify(data.data);
          var hzarr = JSON.parse(localStorage.yldata30).hz;
          var k3sth = JSON.parse(localStorage.yldata30).k3sth;
          var k3eth = JSON.parse(localStorage.yldata30).k3eth;
          var k3sbth = JSON.parse(localStorage.yldata30).k3sbth;
          var k3ebth = JSON.parse(localStorage.yldata30).k3ebth;
          var k3slh  = JSON.parse(localStorage.yldata30).k3slh;
          var k3dtys = JSON.parse(localStorage.yldata30).k3dtys;

          for (var k = 0; k < 20; k++) {

            //和值  18
            var inx = k + 3;
            $('.hz-section').find('.total.loss').eq(k).text(hzarr['current'][inx]);
            $('.hz-section').find('.total.cold').eq(k).text(hzarr['hot'][inx]);
            $('.hz-section').find('.total.aver').eq(k).text(hzarr['average'][inx]);
            $('.hz-section').find('.total.most').eq(k).text(hzarr['max'][inx]);

            //三同号   6
            var innx = $('.santh-section  .ball-num').eq(k).find('span').text();
            $('.santh-section').find('.total.loss').eq(k).text(k3sth['current'][innx]);
            $('.santh-section').find('.total.cold').eq(k).text(k3sth['hot'][innx]);
            $('.santh-section').find('.total.aver').eq(k).text(k3sth['average'][innx]);
            $('.santh-section').find('.total.most').eq(k).text(k3sth['max'][innx]);

            // 二同号 tonghao
            var innx = $('.ert-section .tonghao  .ball-num').eq(k).find('span').text();
            $('.ert-section .tonghao').find('.total.loss').eq(k).text(k3eth['current']['eth'][innx]);
            $('.ert-section .tonghao').find('.total.cold').eq(k).text(k3eth['hot']['eth'][innx]);
            $('.ert-section .tonghao').find('.total.aver').eq(k).text(k3eth['average']['eth'][innx]);
            $('.ert-section .tonghao').find('.total.most').eq(k).text(k3eth['max']['eth'][innx]);

            //三不同号 20
            var inx_txt = $('.sanbth-section  .ball-num').eq(k).find('span').text();
            $('.sanbth-section').find('.total.loss').eq(k).text(k3sbth['current'][inx_txt]);
            $('.sanbth-section').find('.total.cold').eq(k).text(k3sbth['hot'][inx_txt]);
            $('.sanbth-section').find('.total.aver').eq(k).text(k3sbth['average'][inx_txt]);
            $('.sanbth-section').find('.total.most').eq(k).text(k3sbth['max'][inx_txt]);

            //二不同号 15
            var inx_txt = parseInt($('.erbth-section  .ball-num').eq(k).find('span').text());
            $('.erbth-section').find('.total.loss').eq(k).text(k3ebth['current']['ebth'][inx_txt]);
            $('.erbth-section').find('.total.cold').eq(k).text(k3ebth['hot']['ebth'][inx_txt]);
            $('.erbth-section').find('.total.aver').eq(k).text(k3ebth['average']['ebth'][inx_txt]);
            $('.erbth-section').find('.total.most').eq(k).text(k3ebth['max']['ebth'][inx_txt]);

            //三连号  4
            var inx_txt = parseInt($('.sanlh-section  .ball-num').eq(k).find('span').text());
            $('.sanlh-section').find('.total.loss').eq(k).text(k3slh['current'][inx_txt]);
            $('.sanlh-section').find('.total.cold').eq(k).text(k3slh['hot'][inx_txt]);
            $('.sanlh-section').find('.total.aver').eq(k).text(k3slh['average'][inx_txt]);
            $('.sanlh-section').find('.total.most').eq(k).text(k3slh['max'][inx_txt]);

            //单挑  6
            var inx_txt = parseInt($('.dtys-section  .ball-num').eq(k).find('span').text());
            $('.dtys-section').find('.total.loss').eq(k).text(k3dtys['current'][inx_txt]);
            $('.dtys-section').find('.total.cold').eq(k).text(k3dtys['hot'][inx_txt]);
            $('.dtys-section').find('.total.aver').eq(k).text(k3dtys['average'][inx_txt]);
            $('.dtys-section').find('.total.most').eq(k).text(k3dtys['max'][inx_txt]);

          }
        }
      });

  }

  requestHisData() {

    // var userInfo = JSON.parse(localStorage.userInfo);
    var url, data;
    url = '/api-lotteries-h5/load-issues/' + localStorage.idstr + '?count=90&sort=desc&_t=';

    this.rest.getUrlReturn(url)
      .subscribe((data) => {
        // console.log(data);
        if (data.IsSuccess) {

          localStorage.hisissue = JSON.stringify(data.data);
          // console.log('localStorage.hisissue===' + JSON.parse(localStorage.hisissue));
          var htm = '', newary = [];
          if (data.data.length > 10) {
            newary = data.data.reverse().slice(0, 9);
          } else {
            newary = data.data.reverse();
          }
          console.log('nweary===' + newary);
          var code0, code1, code2, toltal, dx, jo, item;
          for (var i = 0; i < newary.length; i++) {
            code0 = newary[i].code.split('')[0];
            code1 = newary[i].code.split('')[1];
            code2 = newary[i].code.split('')[2];
            toltal = parseInt(code0) + parseInt(code1) + parseInt(code2);
            toltal > 10 ? dx = '大' : dx = '小';
            toltal % 2 == 0 ? jo = '偶' : jo = '奇';
            //20180602015  20180602015--  0602015期
            if (newary[i].code == '') {
              item = '<li class="his-line">\n' +
                '        <p class="t-issue">' + newary[i].number.slice(4) + '期</p>\n' +
                '        <p class="cutline"><span class="dom"></span></p>\n' +
                '        <p class="kj-ing">等待开奖...</p>\n' +
                '      </li>';
            } else {
              item = '<li class="his-line">\n' +
                // '        <p class="t-issue">' + newary[i].number + '期</p>\n' +
                '        <p class="t-issue">' + newary[i].number.slice(4) + '期</p>\n' +
                '        <p class="cutline"><span class="dom"></span></p>\n' +
                '        <p class="t-num">\n' +
                '           <span class="saizi-span">\n' +
                '        <i class="saizi saizi-' + code0 + '"></i>\n' +
                '        <i class="saizi saizi-' + code1 + '"></i>\n' +
                '        <i class="saizi saizi-' + code2 + '"></i>\n' +
                '      </span>\n' +
                '          ' + newary[i].code + ' </p>\n' +
                '        <p class="t-total"> ' + toltal + '</p>\n' +
                '        <p class="t-big">' + dx + '</p>\n' +
                '        <p class="t-odd">' + jo + '</p>\n' +
                '      </li>';
            }
            htm = htm + item;
          }
          $('.his-ul').html(htm);

        }
      });

  }


  resetTopSelectView() {

    if (localStorage.kshtml != null) {

      $('page-ks .alert-con').html(localStorage.kshtml);
      console.log('resetTopSel---ocalStorage.kshtml==' + localStorage.kshtml);
      this.changePlaySelect();
    }

    //2 ，页面返回根据玩法切换ui
    if (localStorage.wanfa) {

      console.log('localStorage.wanfa==' + localStorage.wanfa);
      $('page-ks .section').addClass('hide');
      if (localStorage.wanfa.search('和值') != -1) {
        $('.hz-section').removeClass('hide');
        $('.hz-section').addClass('current');
      } else if (localStorage.wanfa.search('三同') != -1) {
        $('.santh-section').removeClass('hide');
        $('.santh-section').addClass('current');
      } else if (localStorage.wanfa.search('二同') != -1) {
        $('.ert-section').removeClass('hide');
        $('.ert-section').addClass('current');
      } else if (localStorage.wanfa.search('三不同') != -1) {
        $('.sanbth-section').removeClass('hide');
        $('.sanbth-section').addClass('current');
      } else if (localStorage.wanfa.search('二不同') != -1) {
        $('.erbth-section').removeClass('hide');
        $('.erbth-section').addClass('current');
      } else if (localStorage.wanfa.search('三连') != -1) {
        $('.sanlh-section').removeClass('hide');
        $('.sanlh-section').addClass('current');
      } else if (localStorage.wanfa.search('单挑') != -1) {
        $('.dtys-section').removeClass('hide');
        $('.dtys-section').addClass('current');
      }

    }

  }


  initAny() {
    // let that = this;
    // $('.his-box').on('click', function () {
    //   that.pushToTrend();
    // });
    localStorage.wayId = 237;
    localStorage.moneyunit = 1;
    localStorage.wanfa = '和值';
    localStorage.max_multiple = 949;
    this.base.initHisBox('ks-content');
    // if ($('#ks-content .section.current').offset().top < 97) {
    //   $(".his-box").stop().animate({height: "0px"}, 0);
    //   return;
    // }


  }


  pushToBasket() {


    var moneyunit = 1;
    var txt = $('.money-btn i').text();
    if (txt == '元') {
      moneyunit = 1;
    } else if (txt == '角') {
      moneyunit = 0.1;
    } else if (txt == '分') {
      moneyunit = 0.01;
    }
    localStorage.moneyunit = moneyunit;

    var ballstr = localStorage.balls;
    var zhu = $('.total-num').text();
    //1 当前选择注数为空 但选球不为空
    if (parseInt(zhu) == 0 && ballstr != null && ballstr != '[]') {
      // clearInterval(timeIddd);
      this.navCtrl.push("KsBasketPage");
      return;
    } else if (  //2 当前选择注数为空 并且 选球为空
      (parseInt(zhu) == 0 && ballstr == null) ||
      (parseInt(zhu) == 0 && ballstr == '[]')) {

      // var content = localStorage.bet_note;
      // alert("请选号～～～"); //或者机选
      this.shakeClick();
      return;
    }

// 当前选择注数不为空
    this.addOrderEvent();

    this.navCtrl.push("KsBasketPage")

  }

  pushToTrend() {
    //判断当前 玩法  -- 》 传参 ， 对应的 不同  走势图页面
    this.navCtrl.push("KstrendPage", {wanfa: $('.wanfa').text(), htm: $('.alert-con').html()});

  }

  pushToIntroduce(){
    localStorage.which = 3;
    this.navCtrl.push("IntroducePage");

  }

}
