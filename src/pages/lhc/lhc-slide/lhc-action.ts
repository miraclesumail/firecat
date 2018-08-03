import * as $ from 'jquery';
import {Tpl} from '../../../providers/base-tool/tpl';

export class LhcAction {

  // ani = {
  //   shu: ['10', '22', '34', '46'],
  //   niu: ['9', '21', '33', '45'],
  //   hu: ['8', '20', '32', '44'],
  //   tu: ['7', '19', '31', '43'],
  //   long: ['6', '18', '30', '42'],
  //   she: ['5', '17', '29', '41'],
  //   ma: ['4', '16', '28', '40'],
  //   yang: ['3', '15', '27', '39'],
  //   hou: ['2', '14', '26', '38'],
  //   ji: ['1', '13', '25', '37', '49'],
  //   gou: ['12', '24', '36', '48'],
  //   pig: ['11', '23', '35', '47']
  // };

  initView() {


    this.trendClick();
    this.tmBallClick();
    this.tmboxBtnClick();
    this.changePlaySelect();
    this.betBtnClick();

    this.alertCancelBtnClick();

    this.cleanBtnClick();
    this.bb_boxBtnClick();
    this.bb_BallClick();
    this.ani_BallClick();
    this.ws_BallClick();
    this.points_BallClick();
    this.calculateProfit();

    this.initClick();

  }

  initClick() {
    $('.r-input').on('input',function(){
      $(this).val( parseInt($(this).val()));
    })

    // $(".r-input").on("change",funciton(){
    //   console.log('$(this).index()==='+$(this).index())
    //   $(".r-input").eq($(this).index()).val(parseInt($(this).val()));
    // });
  }

  calculateProfit() {

    let _this = this;
    $('.buy-input').bind('input propertychange', function () {


      $(this).val($(this).val().replace(/[\'\"\\\/\b\f\n\r\t\-]/g, ''));

      if ($(this).val() == '') {
        $('.money-text').addClass('hide');
        return;
      }
      $('.money-text').removeClass('hide');
      var moneyunit = parseInt($(this).val());
      $('.zhu').text(_this.calculateNum().zhu);
      $('.money').text(_this.calculateNum().money * moneyunit + '元');
      var money = _this.calculateNum().money * moneyunit;

      //理论奖金=注单金额*赔率

      // var wanfa = $('.wanfa').text(), bonus = 0, profit;
      // if (wanfa.search('特码') != -1 || wanfa.search('正') != -1|| wanfa.search('不') != -1) {
      //   var balldata = JSON.parse(localStorage.balls);
      //   // console.log('balldata[0].odds=='+balldata[0].odds)
      //   bonus = money * balldata[0].odds;
      //   profit = bonus - money;
      //
      // } else if (wanfa.search('半波') != -1) {
      //
      //   var balldata = JSON.parse(localStorage.balls);
      //   for (var i = 0; i < balldata.length; i++) {
      //     bonus += (balldata[i].odds *balldata[i].multiple)* moneyunit;
      //   }
      //   profit = bonus - money;
      //
      // } else if (wanfa.search('肖') != -1) {
      //
      //   var balldata = JSON.parse(localStorage.balls);
      //   for (var i = 0; i < balldata.length; i++) {
      //     bonus += (balldata[i].odds *balldata[i].multiple)* moneyunit;
      //   }
      //   profit = bonus - money;
      //
      // } else if (wanfa.search('尾数') != -1) {
      //
      //   var balldata = JSON.parse(localStorage.balls);
      //   for (var i = 0; i < balldata.length; i++) {
      //     bonus += (balldata[i].odds*balldata[i].multiple) * moneyunit;
      //   }
      //   profit = bonus - money;
      //
      // } else if (wanfa.search('总分') != -1) {
      //
      //   var balldata = JSON.parse(localStorage.balls);
      //   for (var i = 0; i < balldata.length; i++) {
      //     bonus += (balldata[i].odds*balldata[i].multiple)  * moneyunit;
      //   }
      //   profit = bonus - money;
      //
      // }
      //
      // // else if (wanfa.search('不中') != -1) {
      // //   console.log('localStorage.balls==='+localStorage.balls);
      // //   var balldata = JSON.parse(localStorage.balls);
      // //   for (var i = 0; i < balldata.length; i++) {
      // //     bonus += balldata[i].odds * moneyunit;
      // //   }
      // //   profit = bonus - money;
      // // }
      //
      // $('.bonus').text(bonus.toFixed(2));
      // $('.profit').text(profit.toFixed(2));
      _this.executeProfit(moneyunit);
    })

  }

  executeProfit(moneyunit){
    let _this = this;
    var money = _this.calculateNum().money * moneyunit;

    var wanfa = $('.wanfa').text(), bonus = 0, profit;
    if (wanfa.search('特码') != -1 || wanfa.search('正') != -1|| wanfa.search('不') != -1) {

      var balldata = JSON.parse(localStorage.balls);

      // console.log('balldata[0].odds=='+balldata[0].odds)
      bonus = money * balldata[0].odds;
      profit = bonus - money;

    } else if (wanfa.search('半波') != -1) {

      var balldata = JSON.parse(localStorage.balls);
      for (var i = 0; i < balldata.length; i++) {
        bonus += (balldata[i].odds *balldata[i].multiple)* moneyunit;
      }
      profit = bonus - money;

    } else if (wanfa.search('肖') != -1) {

      var balldata = JSON.parse(localStorage.balls);
      for (var i = 0; i < balldata.length; i++) {
        bonus += (balldata[i].odds *balldata[i].multiple)* moneyunit;
      }
      profit = bonus - money;

    } else if (wanfa.search('尾数') != -1) {

      var balldata = JSON.parse(localStorage.balls);
      for (var i = 0; i < balldata.length; i++) {
        bonus += (balldata[i].odds*balldata[i].multiple) * moneyunit;
      }
      profit = bonus - money;

    } else if (wanfa.search('总分') != -1) {

      var balldata = JSON.parse(localStorage.balls);
      for (var i = 0; i < balldata.length; i++) {
        bonus += (balldata[i].odds*balldata[i].multiple)  * moneyunit;
      }
      profit = bonus - money;
    }

    $('.bonus').text(bonus.toFixed(2));
    $('.profit').text(profit.toFixed(2));

  }


  trendClick() {

    $('.trend-div').on('click', function () {
      $('.right-popover').css('height') == '200px' ? $('.right-popover').css('height', '0px') : $('.right-popover').css('height', '200px');
    })
    $('.side-nav a').on('click', function () {
      var index = $(this).index();
      switch (index) {
        case 0:
//走势图
          break;
        case 1:
//近期开奖
          break;
        case 2:
          //玩法说明
          break;
      }
      $('.right-popover').css('height', '0px');
      // $('.popover-wrapper').addClass('hide');
    })

  }


  dropdownClick() {



    $('.body-bg').css('display', 'block');
    $('.pageMenuSlides').css('display', 'none');
    $('.alert-con').css('display', 'block');

    $('.status-title').css('display', 'none');
    $('.status-time').css('display', 'none');
    $('.status-box').css('display', 'none');

  }

  changePlaySelect() {

    let _this = this;
    //主玩法选择
    $('.play-list .play-black').each(function () {
      $(this).on('click', function () {

        $('.play-list .play-black').removeClass('play-yellow');
        $(this).addClass('play-yellow');
        $('.after-select .after-con').removeClass('active');
        $('.after-select .after-con').eq($(this).parent().index()).addClass('active');
      })
    });

    //子玩法选择
    $('.after-list .play-black').each(function () {
      $(this).on('click', function () {
        //清空当前页面选中
        var wanfa = $('.wanfa').text();
        if (wanfa.search('半波') != -1) {

          $('.currunt .ball-box .red-active').removeClass('red-active');
          $('.currunt .ball-box .green-active').removeClass('green-active');
          $('.currunt .ball-box .blue-active').removeClass('blue-active');

        } else if (wanfa.search('肖') != -1) {
          $('.currunt .ball-box .red-active').removeClass('red-active');
          $('.currunt .ball-box .green-active').removeClass('green-active');
          $('.currunt .ball-box .blue-active').removeClass('blue-active');
          $('.currunt').removeClass('currunt');
          $('.red-active').removeClass('red-active');
          $('.green-active').removeClass('green-active');
          $('.blue-active').removeClass('blue-active');

        } else if (wanfa.search('尾数') != -1) {
          $('.currunt .ball-box .red-active').removeClass('red-active');
          $('.currunt .ball-box .green-active').removeClass('green-active');
          $('.currunt .ball-box .blue-active').removeClass('blue-active');
        }
        $('.r-input').val('');
        $('.currunt').removeClass('currunt');
        $('.after-list .play-black').removeClass('play-yellow');
        $(this).addClass('play-yellow');

        var title = $('.wanfa').text();

        if (title.search('不中') == -1 || title.search('六肖') == -1) {
          _this.recoverTopSlide();
          if (!_this.isfast()&& $('.slide_one .swiper-wrapper').css('transform')== 'matrix(1, 0, 0, 1, 0, 0)') {
            $('.slide_one .swiper-wrapper').css('transform', localStorage.transform);
          }
        }

        if (title.search('码') != -1) {
          $('.lhc-tm .t-box').removeClass('current');
          $('.peilv-tip').text('赔率 *' + localStorage.tm_prize);
          $('.self-tm .odds.animated').text(localStorage.tm_prize);
        }else if (title.search('不中') != -1) {
          $('.peilv-tip').text('赔率 *' + localStorage.bz_pirze);
        }


        var title1 = $('.play-list .play-yellow').text();
        var title2 = $('.after-list .play-yellow').text();
        $('.wanfa').text(title2);
        _this.changeBallUi(title1);

        $('.body-bg').css('display', 'none');
        $('.pageMenuSlides').css('display', 'block');
        $('.alert-con').css('display', 'none');
        $('.status-title').css('display', 'block');
        $('.status-time').css('display', 'block');
        $('.status-box').css('display', 'block');
        $('.buy-input').val('');
        $('.money-text').addClass('hide');


        var en_name1 = $('.play-list .play-yellow').next().val();
        var en_name2 = $('.after-select .play-yellow').parent().parent().prev().children('input').val();
        var str = $('.after-select .play-yellow').attr('data-index');
        var arr = str.split("|");
        var en_name3 = arr[1];
        var typeStr = en_name1 + '.' + en_name2 + '.' + en_name3;
        var wayId = arr[0];
        localStorage.typeStr = typeStr;
        localStorage.wayId = wayId;
        localStorage.price = arr[2];
        localStorage.bet_note = arr[3];
        localStorage.bonus_note = arr[4];
        localStorage.max_multiple = arr[5];
        localStorage.is_enable_extra = arr[6]
        localStorage.removeItem('balls');
        localStorage.removeItem('self_balls');
      })

    });
  }

  ui改变

  changeBallUi(title) {

    let _this = this;
    var wanfa = $('.wanfa').text();
    $('.section').removeClass('active');
    switch (title) {
      case '特码':
        $('.lhc-tm').addClass('active');
        $('.self-tm').addClass('active');
        $('.lhc-tm .t-box').removeClass('hide');
        break;
      case '正码':
        $('.lhc-tm').addClass('active');
        $('.self-tm').addClass('active');
        $('.lhc-tm .t-box').removeClass('hide');
        break;
      case '不中':
        $('.lhc-tm').addClass('active');
        $('.self-tm').addClass('active');
        _this.removeTopSlide();
        //matrix(1, 0, 0, 1, 0, 0),matrix(1, 0, 0, 1, -414, 0)
        if ($('.slide_one .swiper-wrapper').css('transform') != 'matrix(1, 0, 0, 1, 0, 0)') {
          // console.log('transform=='+$('.slide_one .swiper-wrapper').css('transform'));
          localStorage.transform = $('.slide_one .swiper-wrapper').css('transform');
          $('.slide_one .swiper-wrapper').css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
        }
        $('.lhc-tm .t-box').addClass('hide');
        break;
      case '半波':
        $('.lhc-bb').addClass('active');
        $('.self-bb').addClass('active');
        break;
      case '生肖':
        $('.lhc-sx').addClass('active');
        $('.self-sx').addClass('active');
        console.log(wanfa);
        if (wanfa.search('六肖') != -1) {
          _this.removeTopSlide();
          if ($('.slide_one .swiper-wrapper').css('transform') != 'matrix(1, 0, 0, 1, 0, 0)') {
            // console.log('transform=='+$('.slide_one .swiper-wrapper').css('transform'));
            localStorage.transform = $('.slide_one .swiper-wrapper').css('transform');
            $('.slide_one .swiper-wrapper').css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
          }
        }
        break;
      case '尾数':
        $('.lhc-ws').addClass('active');
        $('.self-ws').addClass('active');
        break;
      case '总分':
        $('.lhc-points').addClass('active');
        $('.self-points').addClass('active');
        break;

      default:
      // createlhc_tm();
      // tmboxBtnClick();
      // tmBallClick();
    }


    // localStorage.tx_prize = tex;
    // localStorage.tx_prize_dog = tex_dog;
    // localStorage.yx_prize = yix;
    // localStorage.yx_prize_dog = yix_dog;
    // localStorage.lx_prize = liux;
    // localStorage.tm_prize = tm_prize;

    if(wanfa.search('特肖') != -1){
      $('.lhc-sx .pl').text(' 赔率 '+localStorage.tx_prize);
      $('.self-sx .odds.animated').text(localStorage.tx_prize);
      $('.lhc-sx .pl').eq(10).text(' 赔率 '+localStorage.tx_prize_dog);
      $('.self-sx .odds.animated').eq(10).text(localStorage.tx_prize_dog);
    }else if(wanfa.search('一肖') != -1){
      $('.lhc-sx .pl').text(' 赔率 '+localStorage.yx_prize);
      $('.self-sx .odds.animated').text(localStorage.yx_prize);
      $('.lhc-sx .pl').eq(10).text(' 赔率 '+localStorage.yx_prize_dog);
      $('.self-sx .odds.animated').eq(10).text(localStorage.yx_prize_dog);
    }else if(wanfa.search('六肖') != -1){
      $('.lhc-sx .pl').text(' 赔率 '+localStorage.lx_prize);
      $('.self-sx .odds.animated').text(localStorage.lx_prize);
    }


    if (wanfa.search('码') != -1) {
      $('.peilv-tip').text('赔率 *' + localStorage.tm_prize);
      $('.self-tm .odds.animated').text(localStorage.tm_prize);

    }else if (wanfa.search('五不中') != -1) {

      $('.peilv-tip').text('赔率 *' + localStorage.bz_5);
    }else if (wanfa.search('六不中') != -1) {

      $('.peilv-tip').text('赔率 *' + localStorage.bz_6);
    }else if (wanfa.search('七不中') != -1) {

      $('.peilv-tip').text('赔率 *' + localStorage.bz_7);
    }else if (wanfa.search('八不中') != -1) {

      $('.peilv-tip').text('赔率 *' + localStorage.bz_8);
    }else if (wanfa.search('九不中') != -1) {

      $('.peilv-tip').text('赔率 *' + localStorage.bz_9);
    }else if (wanfa.search('十不中') != -1) {

      $('.peilv-tip').text('赔率 *' + localStorage.bz_10);
    }


  }


  tmBallClick() {

    $('.b-box .tm-unit').on('click', function () {
      $(this).toggleClass('currunt');
    });

    // var timeOutEvent = 0;
    // $(".b-box .tm-unit").on({
    //   touchstart: function (e) {
    //     timeOutEvent = setTimeout(function () {
    //       var clas = e.currentTarget.children[0].className;
    //       if (clas.search('red-ball') != -1) {
    //         e.currentTarget.children[0].className = 'topball red-ball';
    //       } else if (clas.search('blue-ball') != -1) {
    //         e.currentTarget.children[0].className = 'topball blue-ball';
    //       } else {
    //         e.currentTarget.children[0].className = 'topball green-ball';
    //       }
    //     }, 0);
    //     e.preventDefault();
    //   },
    //   touchend: function () {
    //     clearTimeout(timeOutEvent);
    //     // console.log('$(this).index()==='+$(this).index())
    //     if (timeOutEvent != 0) {
    //       $(".b-box .tm-unit").eq($(this).index()).find('.topball').addClass('hide');
    //       $(".b-box .tm-unit").eq($(this).index()).toggleClass('currunt');
    //     }
    //     return false;
    //   }
    // })
    // touchmove: function(){
    //   clearTimeout(timeOutEvent);
    //   timeOutEvent = 0;
    //   $(".b-box .tm-unit").eq($(this).index()).find('.topball').addClass('hide');
    //   $(".b-box .tm-unit").eq($(this).index()).toggleClass('currunt');
    // },
  }

  // console.log(e)
  // timeOutEvent = setTimeout(function () {
  //   var clas = e.currentTarget.parentElement.children[0].className
  //   console.log('clas==='+clas);
  //   if (clas.search('red-ball') != -1) {
  //     e.currentTarget.parentElement.children[0].className = 'topball red-ball';
  //   } else if (clas.search('blue-ball') != -1) {
  //     e.currentTarget.parentElement.children[0].className = 'topball blue-ball';
  //   } else {
  //     e.currentTarget.parentElement.children[0].className = 'topball green-ball';
  //   }
  // }, 0);


  tmboxBtnClick() {

    // 大小单双 和 生肖 互斥
    // 生肖 可以 多选
    // 大小单双
    let _this = this;
    $('.t-box .dxds').on('click', function () {

      $('.t-box li').removeClass('current');
      $(this).addClass('current');

      var obj = $('.b-box');
      obj.find('.tm-unit').removeClass('currunt');
      // obj.find('.confirm-number').remove();
      var clas = $(this).attr('class');
      console.log(clas);
      clas = clas.split(' ')[1];
      var len = obj.find('.ball').length;
      switch (clas) {
        case 'da':
          var num = Math.ceil(len / 2)-2 ;
          obj.find('.tm-unit:gt(' + num + ')').addClass('currunt');
          break;
        case 'xiao':
          var num = Math.ceil(len / 2)-1;
          obj.find('.tm-unit:lt(' + num + ')').addClass('currunt');
          break;
        case 'dan':
          obj.find('.tm-unit:even').addClass('currunt');
          break;
        case 'ou':
          obj.find('.tm-unit:odd').addClass('currunt');
          break;
      }
    });

    $('.t-box .ani').on('click', function () {

      //2在 生肖上  累加
      //1先清除 大小单双的选中 及球选中
      var flag = 1;
      var obj = $('.b-box');
      if ($('.t-box .dxds').hasClass('current')) {
        $('.t-box .dxds').removeClass('current');
        obj.find('.tm-unit').removeClass('currunt');
      }

      //3点击两次取消
      if ($(this).hasClass('current')) {
        flag = 2;
        $(this).removeClass('current');
      } else {
        $(this).addClass('current');
      }

      var clas = $(this).attr('class');
      console.log(clas);
      clas = clas.split(' ')[1];
      var ani = JSON.parse(localStorage.ani);
      var len = obj.find('.ball').length;
      console.log(ani);
      switch (clas) {
        case 'shu':
          _this.dealWithTmAniBoxClick(ani.shu, flag);
          break;
        case 'niu':
          _this.dealWithTmAniBoxClick(ani.niu, flag);
          break;
        case 'hu':
          _this.dealWithTmAniBoxClick(ani.hu, flag);
          break;
        case 'tu':
          _this.dealWithTmAniBoxClick(ani.tu, flag);
          break;
        case 'long':
          _this.dealWithTmAniBoxClick(ani.long, flag);
          break;
        case 'she':
          _this.dealWithTmAniBoxClick(ani.she, flag);
          break;
        case 'ma':
          _this.dealWithTmAniBoxClick(ani.ma, flag);
          break;
        case 'yang':
          _this.dealWithTmAniBoxClick(ani.yang, flag);
          break;
        case 'hou':
          _this.dealWithTmAniBoxClick(ani.hou, flag);
          break;
        case 'ji':
          _this.dealWithTmAniBoxClick(ani.ji, flag);
          break;
        case 'gou':
          _this.dealWithTmAniBoxClick(ani.gou, flag);
          break;
        case 'pig':
          _this.dealWithTmAniBoxClick(ani.zhu, flag);
          break;
      }

      // _this.dealWithManyBallData();
      // _this.calculateNum();
    });

  }

  /*大小单双生肖按钮点击*/
  dealWithManyBallData() {

    let _this = this;
    var type = $('.wanfa').text();

    if (_this.isfast()||type.search('不中')!=-1||type.search('六肖')!=-1) {

      var len;
      if (type.search('特码') != -1 || type.search('正') != -1) {

        len = $('.lhc-tm .b-box .currunt').length;
      } else if (type.search('波') != -1) {
        len = $('.lhc-bb .currunt').length;
      } else if (type.search('肖') != -1) {
        len = $('.lhc-sx .currunt').length;
      } else if (type.search('尾') != -1) {
        len = $('.lhc-ws .currunt').length;
      } else if (type.search('总') != -1) {
        len = $('.lhc-points .currunt').length;
      } else if (type.search('不') != -1) {
        len = $('.lhc-tm .currunt').length;
      }
      for (var i = 0; i < len; i++) {
        var str, zhu, odds, txt;
        if (type.search('特码') != -1 || type.search('正') != -1 || type.search('不') != -1) {
          str = $('.b-box .currunt').eq(i).find('span').eq(1).text();
          zhu = 1;
          odds =  $('.lhc-tm .peilv-tip').text().split(' ')[1].substr(1);
          txt = str;
        } else if (type.search('波') != -1) {

          str = $('.currunt').eq(i).attr('data-index');
          zhu = 1;
          odds = $('.currunt').eq(i).find('.pl').text().split(' ')[2];
          txt = $('.currunt').eq(i).find('h2').text().split(' ')[0];

        } else if (type.search('肖') != -1) {

          str = $('.currunt').eq(i).attr('data-index');
          zhu = 1;
          odds = $('.currunt').eq(i).find('h2').text().split(' ')[2];
          txt = $('.currunt').eq(i).find('h2').text().split(' ')[0];

        } else if (type.search('尾') != -1) {

          str = $('.currunt').eq(i).attr('data-index');
          zhu = 1;
          odds = $('.currunt').eq(i).find('h2').text().split(' ')[2];
          txt = $('.currunt').eq(i).find('h2').text().split(' ')[0];

        } else if (type.search('总') != -1) {

          str = $('.currunt').eq(i).attr('index');
          zhu = 1;
          odds = $('.currunt').eq(i).find('span').text().split(' ')[2];
          txt = $('.currunt').eq(i).find('h2').text();
        }


        _this.dealWithBallData(str, zhu, odds, txt);
      }


      //自选 ～
    } else {

      var odds;
      if (type.search('特码') != -1 || type.search('正') != -1) {

        odds =  $('.self-tm .odds.animated').eq(0).text();
        var obj = $('.self-tm .r-input');
        var length = obj.length;
        for (var i = 0; i < length; i++) {
          if (obj.eq(i).val() != '') {
            var str = $('.self-tm li').eq(i).find('h5').text();
            zhu = parseInt(obj.eq(i).val()); //mutiple
            _this.dealWithBallData(str, zhu, odds, str);
          }
        }

      } else if (type.search('波') != -1) {

        var obj = $('.self-bb .r-input');
        var length = obj.length;
        for (var i = 0; i < length; i++) {
          if (obj.eq(i).val() != '') {
            var str = $('.self-bb li').eq(i).find('h5').attr('index');
            var txt = $('.self-bb li').eq(i).find('h5').text();
            var odds = $('.self-bb li').eq(i).find('.odds').text();
            zhu = parseInt(obj.eq(i).val());
            _this.dealWithBallData(str, zhu, odds, txt);
          }
        }

      } else if (type.search('肖') != -1) {

        var obj = $('.self-sx .r-input');
        var length = obj.length;
        for (var i = 0; i < length; i++) {
          if (obj.eq(i).val() != '') {
            var str = $('.self-sx li').eq(i).find('h5').attr('index');
            var txt = $('.self-sx li').eq(i).find('h5').text();
            var odds = $('.self-sx li').eq(i).find('.odds').text();
            zhu = parseInt(obj.eq(i).val());
            _this.dealWithBallData(str, zhu, odds, txt);
          }
        }
      } else if (type.search('尾') != -1) {

        var obj = $('.self-ws .r-input');
        var length = obj.length;
        for (var i = 0; i < length; i++) {
          if (obj.eq(i).val() != '') {
            var str = $('.self-ws li').eq(i).find('h5').attr('index');
            var txt = $('.self-ws li').eq(i).find('h5').text();
            var odds = $('.self-ws li').eq(i).find('.odds').text();
            zhu = parseInt(obj.eq(i).val());
            _this.dealWithBallData(str, zhu, odds, txt);
          }
        }
      } else if (type.search('总') != -1) {

        var obj = $('.self-points .r-input');
        var length = obj.length;
        for (var i = 0; i < length; i++) {
          if (obj.eq(i).val() != '') {
            var str = $('.self-points li').eq(i).find('h5').attr('index');
            var txt = $('.self-points li').eq(i).find('h5').text();
            var odds = $('.self-points li').eq(i).find('.odds').text();
            zhu = parseInt(obj.eq(i).val());
            _this.dealWithBallData(str, zhu, odds, txt);
          }
        }
      }
      // console.log('odds==='+odds)
    }
  }

  dealWithBallData(str, num, odds, text) {

    var ballStr = str;
    // var multiple = num;
    var num = num;
    var wayId = localStorage.wayId;
    var prize_group;
    if(parseInt(localStorage.user_prize_group)>1950){
      prize_group=1950;
    }else{
      prize_group=localStorage.user_prize_group;
    }
    // var prize_group = localStorage.user_prize_group;//localStorage.bet_max_prize_group;
    // var price = localStorage.price;
    var jsid = 1;
    if (localStorage.balls != null) {
      jsid = JSON.parse(localStorage.balls).length + 1;
    }

    var betinfo =
      {
        "jsId": jsid,
        "wayId": wayId,
        "ball": ballStr,
        "multiple": num,
        "num": 1,
        "type": '',
        "onePrice": 1,
        "prize_group": prize_group,
        "moneyunit": 1,
        "viewBalls": ballStr,
        "position": [],
        // "max_multiple":localStorage.max_multiple,
        'odds': odds,
        'text': text
      };

    var balls = [];
    var ballsitem = "";
    var ball = localStorage.balls;
    if (ball == null) {
      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    } else {
      var balldata = JSON.parse(ball);
      balldata.push(betinfo);
      ballsitem = JSON.stringify(balldata);
    }
    localStorage.balls = ballsitem;

  }

  dealWitSelfBallData(str, num, odds, text) {

    var ballStr = str;
    // var multiple = num;
    var num = num;
    var wayId = localStorage.wayId;
    var prize_group = localStorage.bet_max_prize_group;
    // var price = localStorage.price;
    var jsid = 1;
    if (localStorage.self_balls != null) {
      jsid = JSON.parse(localStorage.self_balls).length + 1;
    }

    var betinfo =
      {
        "jsId": jsid,
        "wayId": wayId,
        "ball": ballStr,
        "multiple": 1,
        "num": num,
        "type": '',
        "onePrice": 1,
        "prize_group": prize_group,
        "moneyunit": 1,
        "viewBalls": ballStr,
        "position": [],
        // "max_multiple":localStorage.max_multiple,
        'odds': odds,
        'text': text
      };

    var balls = [];
    var ballsitem = "";
    var ball = localStorage.self_balls;
    if (ball == null) {
      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    } else {
      var balldata = JSON.parse(ball);
      balldata.push(betinfo);
      ballsitem = JSON.stringify(balldata);
    }
    localStorage.self_balls = ballsitem;

  }


  calculateNum() {

    let _this = this;
    var type = $('.wanfa').text();
    var zhu, money = 0;
    if (_this.isfast()) {

      // console.log('_this.isfast~~~~~')

      if (type.search('波') != -1) {
        zhu = $('.currunt').length;
      } else if ((type.search('肖') != -1 && type.search('六肖') == -1) || (type.search('尾数') != -1)) {
        zhu = $('.currunt').length;
      } else if (type.search('总分') != -1) {
        zhu = $('.currunt').length;
      } else {
        //特码
        zhu = $('.currunt').length;
      }
      money = zhu;

      //自选～
    } else {

      // console.log('//自选～~~~')
      if (type.search('波') != -1) {
        var obj = $('.self-bb .r-input');
        var len = obj.length;
        zhu = 0, money = 0;

        console.log('len=' + len);
        for (var i = 0; i < len; i++) {
          if (obj.eq(i).val() != '') {
            // console.log('obj=' + obj.eq(i).val());
            zhu += 1; //= zhu + parseInt(obj.eq(i).val());
            money += parseInt(obj.eq(i).val());
          }
        }
      } else if ((type.search('肖') != -1 && type.search('六肖') == -1)) {
        zhu = 0, obj = $('.self-sx .r-input');
        var len = obj.length;
        for (var i = 0; i < len; i++) {
          if (obj.eq(i).val() != '') {
            zhu += 1; //= zhu + parseInt(obj.eq(i).val());
            money += parseInt(obj.eq(i).val());
            // zhu = zhu + parseInt(obj.eq(i).val());
          }
        }
      } else if ((type.search('尾数') != -1)) {
        zhu = 0, obj = $('.self-ws .r-input');
        var len = obj.length;
        for (var i = 0; i < len; i++) {
          if (obj.eq(i).val() != '') {
            zhu += 1; //= zhu + parseInt(obj.eq(i).val());
            money += parseInt(obj.eq(i).val());
          }
        }
      } else if (type.search('总分') != -1) {
        zhu = 0, obj = $('.self-points .r-input');
        var len = obj.length;
        for (var i = 0; i < len; i++) {
          if (obj.eq(i).val() != '') {
            zhu += 1; //= zhu + parseInt(obj.eq(i).val());
            money += parseInt(obj.eq(i).val());
          }
        }
      } else {
        //特码 正码 遍历，累加
        zhu = 0, obj = $('.self-tm .r-input');
        var len = obj.length;
        // console.log('len='+len);
        for (var i = 0; i < len; i++) {
          if (obj.eq(i).val() != '') {
            zhu += 1; //= zhu + parseInt(obj.eq(i).val());
            money += parseInt(obj.eq(i).val());
          }
        }
        // console.log('zhu='+zhu);
      }
    }


    if (type.search('六肖') != -1) {
      //Cn6 遍历高亮数量
      var len = $('.currunt').length;
      zhu = _this.jc(len, 6);
      if (zhu < 0) {
        zhu = 0;
      } money = zhu;
    } else if (type.search('五不中') != -1) {
      var len = $('.currunt').length;
      zhu = _this.jc(len, 5);
      if (zhu < 0) {
        zhu = 0;
      } money = zhu;
    } else if (type.search('六不中') != -1) {
      var len = $('.currunt').length;
      zhu = _this.jc(len, 6);
      if (zhu < 0) {
        zhu = 0;
      } money = zhu;
    } else if (type.search('七不中') != -1) {
      var len = $('.currunt').length;
      zhu = _this.jc(len, 7);
      if (zhu < 0) {
        zhu = 0;
      } money = zhu;
    } else if (type.search('八不中') != -1) {
      var len = $('.currunt').length;
      zhu = _this.jc(len, 8);
      if (zhu < 0) {
        zhu = 0;
      } money = zhu;
    } else if (type.search('九不中') != -1) {
      var len = $('.currunt').length;
      zhu = _this.jc(len, 9);
      if (zhu < 0) {
        zhu = 0;
      } money = zhu;
    } else if (type.search('十不中') != -1) {
      var len = $('.currunt').length;
      zhu = _this.jc(len, 10);
      if (zhu < 0) {
        zhu = 0;
      } money = zhu;
    }

    return {zhu: zhu, money: money};
  }


  dealWithTmAniBoxClick(arr, flag) {

    console.log(arr);
    var obj = $('.b-box');
    var len = obj.find('.tm-unit').length;
    if (flag == 1) {
      for (var i = 0; i < len; i++) {
        var tt = obj.find('.tm-unit').eq(i).text();
        var v = parseInt(tt);
        if (arr.indexOf(v) != -1) {
          obj.find('.tm-unit').eq(i).addClass('currunt');
        }
      }
    } else {
      for (var i = 0; i < len; i++) {
        var tt = obj.find('.tm-unit').eq(i).text();
        var v = parseInt(tt);
        if (arr.indexOf(v) != -1) {
          obj.find('.tm-unit').eq(i).removeClass('currunt');
        }
      }
    }

  }


  cleanBtnClick() {

    $('#cleanBtn').on('click', function () {
      //1,快捷清空（球 和 按钮 都清空）
      //2,自选清空
      //3.缓存数据清空
      $('.current').removeClass('current');
      $('.currunt').removeClass('currunt');
      $('.r-input').val('');

      $('.red-active').removeClass('red-active');
      $('.green-active').removeClass('green-active');
      $('.blue-active').removeClass('blue-active');
    })
  }


  betBtnClick() {

    //阴影弹窗
    let _this = this;

    $('.confirm-btn').on('click', function () {

      $('.buy-input').val('');
      $('.money-text').addClass('hide');
      $('.money-text .zhu').text(_this.calculateNum().zhu);
      $('.money-text .money').text('0元');
      $('.money-text .bonus').text(0);
      $('.money-text .profit').text(0);
      var play = $('.wanfa').text();
      //快捷选号
      if (_this.isfast()||play.search('不中')!=-1||play.search('六肖')!=-1) {

        localStorage.removeItem('balls');//移除之前选择的数据
        // var arr = JSON.parse(localStorage.balls);
        // console.log('是否删除'+localStorage.balls);
        var zhu = _this.calculateNum().zhu;

        console.log('zhu===='+zhu);
        if (zhu < 1) {
          _this.failedTip();
          return;
        } else {
          _this.dealWithManyBallData();
          _this.initPopup();
        }

        //自选
      } else {

        // localStorage.removeItem('self_balls');//移除之前选择的数据
        localStorage.removeItem('balls');
        var zhu = _this.calculateNum().zhu;
        if (zhu < 1) {
          _this.failedTip();
          return;
        } else {
          _this.dealWithManyBallData();
          _this.initPopup();
        }
      }

    })
  }


  failedTip() {

    $('body').append(Tpl.fail_tip);
    $('#error-tip').text('请选则有效注单～');
    setTimeout(function () {
      $('.basket-pop').remove();
    }, 1500);

  }

  removeTopSlide() {
    $('.pageMenuSlides').addClass('hide');
    $('.lhc-content').children('.fixed-content').eq(0).next('.scroll-content').css('margin-top', '124px');
    $('.lhc-content .swiper-wrapper .swiper-slide').eq(0).addClass('swiper-no-swiping');
  }

  recoverTopSlide() {
    $('.pageMenuSlides').removeClass('hide');
    $('.lhc-content').children('.fixed-content').eq(0).next('.scroll-content').css('margin-top', '159px');
    $('.lhc-content .swiper-wrapper .swiper-slide').eq(0).removeClass('swiper-no-swiping');
  }


  initPopup() {

    let _this = this;
    var play = $('.wanfa').text();
    $('.lhc-popup').removeClass('hide');
    $('.money-text').addClass('hide');
    $('.yuan').removeClass('hide');
    $('#yue').text();
    if (_this.isfast()||play.search('不中')!=-1||play.search('六肖')!=-1) {
      //赋值
      console.log('报错localStorage.balls=='+localStorage.balls);
      $('.buy-input').removeClass('hide');
      var arr = JSON.parse(localStorage.balls);
      console.log(arr);
      var html = '';
      for (var i = 0; i < arr.length; i++) {
        html = html + '<li class="box-ball ">' + play + arr[i].text + '</li>';
      }
      $('.lhc-popup .box').html(html);

      //注数
      // $('.zhu').text(_this.calculateNum());
      // $('.money').text(_this.calculateNum() * 2 + '元');

    } else {

      //自选
      // var arr = JSON.parse(localStorage.self_balls);
      $('.buy-input').addClass('hide');
      $('.yuan').addClass('hide');
      $('.money-text').removeClass('hide')

      _this.executeProfit(1);

      var arr = JSON.parse(localStorage.balls);
      console.log(arr);
      var html = '';
      for (var i = 0; i < arr.length; i++) {
        html = html + '<li class="box-ball ">' + play + arr[i].text + '</li>';
      }
      $('.lhc-popup .box').html(html);

      //注数
      $('.zhu').text(_this.calculateNum().zhu);
      $('.money').text(_this.calculateNum().money * 1 + '元');
    }

  }


  alertCancelBtnClick() {
    $('.cancel-btn').on('click', function () {
      $('.lhc-popup').addClass('hide');
    })
  }


  bb_boxBtnClick() {

    $('.lhc-bb .green').addClass('hide');
    $('.lhc-bb .blue').addClass('hide');
    $('.lhc-bb .bb-tops li').on('click', function () {

      $('.lhc-bb .bb-unit').addClass('hide');
      if ($(this).index() == 0) {
        $(this).addClass('red-active');
        $('.bb-tops .green-active').removeClass('green-active');
        $('.bb-tops .blue-active').removeClass('blue-active');
        $('.lhc-bb .red').removeClass('hide');
      } else if ($(this).index() == 1) {
        $(this).toggleClass('green-active');
        $('.bb-tops .red-active').removeClass('red-active');
        $('.bb-tops .blue-active').removeClass('blue-active');
        $('.lhc-bb .green').removeClass('hide');
      } else {
        $(this).toggleClass('blue-active');
        $('.bb-tops .green-active').removeClass('green-active');
        $('.bb-tops .red-active').removeClass('red-active');
        $('.lhc-bb .blue').removeClass('hide');
      }
    });

  }

  bb_BallClick() {

    $('.lhc-bb .bb-unit').on('click', function () {
      $(this).toggleClass('currunt');
      if ($(this).hasClass('red')) {
        $(this).find('.red-ball').toggleClass('red-active');
      } else if ($(this).hasClass('green')) {
        $(this).find('.green-ball').toggleClass('green-active');
      } else {
        $(this).find('.blue-ball').toggleClass('blue-active');
      }
    })

  }

  ani_BallClick() {
    $('.lhc-sx .animals-unit').on('click', function () {
      $(this).toggleClass('currunt');
      $(this).find('.red-ball').toggleClass('red-active');
      $(this).find('.green-ball').toggleClass('green-active');
      $(this).find('.blue-ball').toggleClass('blue-active');
    })
  }

  ws_BallClick() {
    $('.lhc-ws .animals-unit').on('click', function () {
      $(this).toggleClass('currunt');
      $(this).find('.red-ball').toggleClass('red-active');
      $(this).find('.green-ball').toggleClass('green-active');
      $(this).find('.blue-ball').toggleClass('blue-active');
    })
  }

  points_BallClick() {
    $('.lhc-points .points-unit').on('click', function () {
      $(this).toggleClass('currunt');
    })
  }


  isfast() {
    var index = $('.bottomLine').index();
    if (index == 0) {
      return true;
    } else {
      return false;
    }
  }


//阶乘
  jc(n, m) {
    var re = this.factorial(n) / (this.factorial(m) * this.factorial(n - m));
    return re;
  }

  factorial(num) {
    if (num < 0) {
      return -1;
    } else if (num === 0 || num === 1) {
      return 1;
    } else {
      return (num * this.factorial(num - 1));
    }
  }


}
