import * as $ from 'jquery';
import {Observable} from "rxjs/Observable";


export class KsAction {

  timeIddd;

  initView() {

    this.initClick();
    this.changePlaySelect();
    this.ballClick();
    this.fastBtnDxds123();
    this.moneyUnitChange();
    this.cleanBalls();
    this.trendClick();
    this.addOrder();

    // this.calculateNumOfBet();
  }


  /**
   * 添加注单
   */
  addOrder() {

    let _this = this;
    // $('.bottom-m ion-icon').on('click', function () {
      $('.bottom-m').on('click', function () {
      _this.addOrderEvent();
        $('.ks-footer').css('background', '#ececec')
      // localStorage.removeItem("balls");
      // var zhu = $('.total-num').text();
      // // if (zhu === 0) return;
      // if (zhu > 0) {
      //   _this.dealWithBallData(zhu);
      //   // alert(localStorage.balls);
      //   let balll = JSON.parse(localStorage.balls);
      //   $('.confirm-number').removeClass('hide');
      //   $('.confirm-number').text(balll.length);
      //   // var  htl =  '<span class="confirm-number">'+ balll.length +'</span>';
      //   // $('.confirm-btn').html(htl);
      //   // alert('注单添加成功~');
      //   _this.cleanBalls();
      // } else {
      //   //弹框提示
      //   alert('请选号~');
      // }
    });
  }

  addOrderEvent() {
    let _this = this;
    var zhu = $('.total-num').text();
    // if (zhu === 0) return;
    if (zhu > 0) {

      let wanfa = $('.wanfa').text();
      if (wanfa.search('二同号') != -1) {

        _this.dealWithBallDataWithErth(zhu, _this);

      } else {

        _this.dealWithBallData(zhu);
      }

      let balll = JSON.parse(localStorage.balls);
      $('.confirm-number').removeClass('hide');
      $('.bottom-r').css('background', '');
      $('.confirm-number').text(balll.length);
      _this.cleanBalls();
    } else {
      //弹框提示
      alert('请选号~');
    }
  }


  getErthDxStr() {
    // tonghao-th   tonghao-bth
    var tharr = [], btharr = [], len = $('.tonghao-th .active').length;
    for (var i = 0; i < len; i++) {
      tharr.push($('.tonghao-th .active').eq(i).find('span').text());
    }
    for (var i = 0; i < $('.tonghao-bth .active').length; i++) {
      btharr.push($('.tonghao-bth .active').eq(i).find('span').text())
    }
    var strarr = [];
    for (var i = 0; i < tharr.length; i++) {
      for (var j = 0; j < btharr.length; j++) {
        // console.log('tharr[i]+btharr[j]==='+(tharr[i]+btharr[j]).split('').sort().join('') );
        strarr.push((tharr[i] + btharr[j]).split('').sort().join(''));
      }
    }
    return strarr.join('|');
  }

  dealWithBallDataWithErth(zhu, __this) {
    // 计算字符串
    //判断 注单上部分  相乘 是否 为0，不为0---》 计算上部分选球字符串

    var a = $('.tonghao-th .active').length;
    var b = $('.tonghao-bth .active').length;
    var c = $('.content-box .active').length - $('.tonghao .active').length;
    var strarr = [], dxstr;
    // zhushu = a * b + 5*c;
    if ((a * b) > 0) {
      // strarr.push(__this.getErthDxStr());
      dxstr = __this.getErthDxStr();
      zhu = a * b;
      // 调用 存储球
      __this.dealWithErthBallData(zhu, dxstr);
    }
    //判断 复选 注数是否为 0 ---》 计算复选 选球字符串
    var fxarr = [], fxstr;
    if (c > 0) {
      // ball-unit double
      for (var i = 0; i < $('.ball-unit.double .active').length; i++) {
        fxarr.push($('.ball-unit.double .active').eq(i).attr('data-index'));
      }
      fxstr = fxarr.join('|');
      // console.log('fxstr====' + fxstr);
      zhu = 5 * c;
      __this.dealWithErthBallData(zhu, fxstr);
    }

    //循环  调用存储球

  }

  dealWithErthBallData(zhu, str) {

    let _this = this;
    let ballStr = str;
    let wanfa = $('.wanfa').text();
    var moneyunit = 1;
    var txt = $('.money-btn i').text();
    if (txt == '元') {
      moneyunit = 1;
    } else if (txt == '角') {
      moneyunit = 0.1;
    } else if (txt == '分') {
      moneyunit = 0.01;
    }
    var jsid = 1;
    if (localStorage.balls != null) {
      jsid = JSON.parse(localStorage.balls).length + 1;
    }
    let betinfo =
      {
        "jsId": jsid,
        "wayId": localStorage.wayId,
        "ball": ballStr,
        "viewBalls": ballStr,
        "num": zhu,
        "moneyunit": moneyunit,
        "position": [],
        "multiple": 1,
        "onePrice": 2,
        "prize_group": localStorage.bet_max_prize_group,
        "max_multiple": localStorage.max_multiple,
        "wanfa": wanfa,
        "price": zhu * 2 * moneyunit
      };
    let balls = [];
    let ballsitem = "";
    let ball = localStorage.balls;
    if (ball == null) {
      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    } else {
      let balldata = JSON.parse(ball);
      //检测号码重复性～～
      if (_this.isNumDuplication(betinfo).j == 1) {
        ballsitem = JSON.stringify(_this.isNumDuplication(betinfo).data);
      } else {
        balldata.push(betinfo);
        ballsitem = JSON.stringify(balldata);
      }
    }
    localStorage.balls = ballsitem;

  }


  shakeAnimation(no1, no2, no3, num) {
    let _this = this;
    for (var i = 1; i < 7; i++) {
      $('.saizi-pop div').removeClass('sz-' + i);
    }
    $('.sz-left').addClass('sz-' + no1).addClass('animate-0');
    $('.sz-mid').addClass('sz-' + no2).addClass('animate-1');
    $('.sz-right').addClass('sz-' + no3).addClass('animate-2');
    $('.saizi-pop').removeClass('hide');
    var obj = $('.section.current .content-box');
    var len = obj.find('.ball-unit').length;
    setTimeout(function () {
      for (var i = 0; i < len; i++) {
        if (parseInt(obj.find('span').eq(i).text()) == num) {
          obj.find('.ball-num').eq(i).addClass('active');
        }
      }
      var fx = obj.find('.active').offset().left;
      var fy = obj.find('.active').offset().top;
      var selfx = $('.sz-left').offset().left;
      var selfy = $('.sz-left').offset().top + 70;
      var wx = fx - selfx;
      var wy = fy - selfy;
      $('.saizi-pop').css('transform', " translate(" + wx + "px," + wy + "px) scale(0.01)");
      $('.animate-0').removeClass('animate-0');
      $('.animate-1').removeClass('animate-1');
      $('.animate-2').removeClass('animate-2');
      _this.calculateMoney();
      var player = $('#mp3')[0];
      player.play();
    }, 2500);

    setTimeout(function () {
      $('.saizi-pop').css('transform', "scale(1)");
      $('.saizi-pop').addClass('hide');
    }, 3500);

  }


  shakeClick() {

    let _this = this;
    _this.removeCover();
    if (!$('.saizi-pop').hasClass('hide')) {
      return;
    }
    $('.active').removeClass('active');
    $('.selected').removeClass('selected');


    var wanfa = $('.wanfa').text();
    if (wanfa.search('和值') != -1) {

      var no1 = Math.floor(Math.random() * 6 + 1);
      var no2 = Math.floor(Math.random() * 6 + 1);
      var no3 = Math.floor(Math.random() * 6 + 1);
      //和值
      var num = no1 + no2 + no3;
      _this.shakeAnimation(no1, no2, no3, num);

    } else if (wanfa.search('三同号') != -1) {

      var no1 = Math.floor(Math.random() * 6 + 1);
      var num = no1 * 100 + no1 * 10 + no1;
      _this.shakeAnimation(no1, no1, no1, num);

    } else if (wanfa.search('二同号') != -1) {

      var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
      no1 = b[0];
      no2 = b[1];
      var num1 = no1 * 10 + no1;
      var num2 = no2;
      for (var i = 1; i < 7; i++) {
        $('.saizi-pop div').removeClass('sz-' + i);
      }
      $('.sz-left').addClass('sz-' + no1);
      $('.sz-mid').addClass('sz-' + no1);
      $('.sz-right').addClass('sz-' + no2);

      $('.sz-left').addClass('animate-0');
      $('.sz-mid').addClass('animate-1');
      $('.sz-right').addClass('animate-2');
      $('.saizi-pop').removeClass('hide');
      var obj = $('.section.current .content-box .tonghao');

      var len = obj.find('.ball-unit').length;
      console.log('len===' + len);
      setTimeout(function () {
        for (var i = 0; i < len; i++) {
          // console.log('text=str==' + obj.find('span').eq(i).text());
          // console.log('text===' + parseInt(obj.find('span').eq(i).text()));
          if (parseInt(obj.find('span').eq(i).text()) == num1 || parseInt(obj.find('span').eq(i).text()) == num2) {
            obj.find('.ball-num').eq(i).addClass('active');
          }
        }
        var fx = obj.find('.active').offset().left;
        var fy = obj.find('.active').offset().top;
        var selfx = $('.sz-left').offset().left;
        var selfy = $('.sz-left').offset().top + 70;
        var wx = fx - selfx;
        var wy = fy - selfy;
        $('.saizi-pop').css('transform', " translate(" + wx + "px," + wy + "px) scale(0.01)");
        $('.animate-0').removeClass('animate-0');
        $('.animate-1').removeClass('animate-1');
        $('.animate-2').removeClass('animate-2');
        _this.calculateMoney();
        var player = $('#mp3')[0];
        player.play();
      }, 2500);

      setTimeout(function () {
        $('.saizi-pop').css('transform', "scale(1)");
        $('.saizi-pop').addClass('hide');
      }, 3500);

    } else if (wanfa.search('三不同号') != -1) {
      var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
      var c = [b[0], b[1], b[2]].sort();
      num = c[0] * 100 + c[1] * 10 + c[2];
      _this.shakeAnimation(c[0], c[1], c[2], num);
    } else if (wanfa.search('二不同号') != -1) {
      var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
      var c = [b[0], b[1]].sort();
      num = c[0] * 10 + c[1];
      _this.shakeAnimation('', c[0], c[1], num);
    } else if (wanfa.search('三连号') != -1) {
      var no = Math.floor(Math.random() * 4 + 1);
      var num = no * 100 + (no + 1) * 10 + no + 2;
      _this.shakeAnimation(no, no + 1, no + 2, num);
    } else if (wanfa.search('单挑') != -1) {
      var no = Math.floor(Math.random() * 6 + 1);
      _this.shakeAnimation(no, '', '', no);
    }

  }


  shuffle(a) {
    var len = a.length;
    for (var i = 0; i < len - 1; i++) {
      var index = Math.floor(Math.random() * (len - i));
      var temp = a[index];
      a[index] = a[len - i - 1];
      a[len - i - 1] = temp;
    }
    return a;
  }

  dealWithBallData(zhu) {

    let _this = this;
    let wayId = localStorage.wayId;
    console.log('wayId====' + wayId)

    let ballStr = _this.getBallStr();
    let wanfa = $('.wanfa').text();
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
    var jsid = 1;
    if (localStorage.balls != null) {
      jsid = JSON.parse(localStorage.balls).length + 1;
    }
    let betinfo =
      {
        "jsId": jsid,
        "ball": ballStr,
        "viewBalls": ballStr,
        "num": zhu,
        "moneyunit": moneyunit,
        "position": [],
        "multiple": 1,
        "onePrice": 2,
        "prize_group": localStorage.bet_max_prize_group,
        "max_multiple": localStorage.max_multiple,
        "wanfa": wanfa,
        "price": zhu * 2 * moneyunit,
        "wayId": wayId,
      };
    let balls = [];
    let ballsitem = "";
    let ball = localStorage.balls;
    console.log('添加号码时候localStorage.bal===' + localStorage.balls);
    // if (ball == null) {
    if (!localStorage.balls) {
      console.log('为空～～～')
      balls.push(betinfo);
      ballsitem = JSON.stringify(balls);
    } else {
      let balldata = JSON.parse(ball);

      if (_this.isNumDuplication(betinfo).j == 1) {

        ballsitem = JSON.stringify(_this.isNumDuplication(betinfo).data);
      } else {

        balldata.push(betinfo);
        ballsitem = JSON.stringify(balldata);
      }
    }

    localStorage.balls = ballsitem;

  }

  isNumDuplication(betinfo) {

    var j = 0;
    var ballstr = betinfo.ball;
    var balldata = JSON.parse(localStorage.balls);
    for (var i = 0; i < balldata.length; i++) {
      var str = balldata[i].ball;
      var moneyunit = balldata[i].moneyunit;
      if (str == ballstr && moneyunit==betinfo.moneyunit) {
        j++;
        balldata[i].multiple = parseInt(balldata[i].multiple) + parseInt(betinfo.multiple);
        balldata[i].price += betinfo.price;
      }
    }
    var result = {j: j, data: balldata};
    return result;
  }

  getBallStr() {

    var obj = $('.section.current .content-box');
    var len = obj.find('.active').length;
    var arr = [], str;
    for (var i = 0; i < len; i++) {
      var txt = $('.section.current .content-box .active').eq(i).find('span').text();
      arr.push(parseInt(txt));
    }
    str = arr.join('|');//112|223|334

    console.log('str===' + str);
    return str;
  }

  trendClick() {
    let _this = this;
    $('.trend-div').on('click', function () {
      $('.right-popover').css('height') == '200px' ? $('.right-popover').css('height', '0px') : $('.right-popover').css('height', '200px');
    })

    $('.side-nav-a').on('click', function () {
      var index = $(this).index();
      switch (index) {
        case 0:
//走势图
//           super.pushTrendPage();
          break;
        case 1:
//近期开奖
          break;
        case 2:
//号码统计
          $('.trend-select-pop').removeClass('hide');
          $('.right-popover').css('height', '0px');
          break;
        case 3:
          //玩法说明
          break;
      }
      $('.right-popover').css('height', '0px');

    })

  }

  initTrendEvent() {


    $('.aver').addClass('hide');
    $('.most').addClass('hide');
    $('.cold').addClass('hide');
    $('.pop-box input').eq(0).attr('checked', true);
    $('.pop-quxiao,.pop-queding').on('click', function () {
      $('.trend-select-pop').addClass('hide');
    })
    $('.pop-box .item,.pop-box input').on('click', function () {

      var index = $(this).index();
      // console.log($('.pop-box input').eq(index).attr('checked'))
      if ($('.pop-box input').eq(index).attr('checked') == 'checked') {
        $('.pop-box input').eq(index).attr('checked', false);
        switch (index) {
          case 0:
            $('.loss').addClass('hide');
            break;
          case 1:
            $('.cold').addClass('hide');
            break;
          case 2:
            $('.aver').addClass('hide');
            break;
          case 3:
            $('.most').addClass('hide');
            break;
        }
      } else {
        $('.pop-box input').eq(index).attr('checked', true);
        switch (index) {
          case 0:
            $('.loss').removeClass('hide');
            break;
          case 1:
            $('.cold').removeClass('hide');
            break;
          case 2:
            $('.aver').removeClass('hide');
            break;
          case 3:
            $('.most').removeClass('hide');
            break;
        }
      }
    })
  }

  moneyUnitChange() {
    var _this = this;
    //元角分
    $('.money-btn').click(function () {
      $('.money-menu').css('display', 'block');
      // $('.money-menu').css('z-index','999');
    });

    $('.money-menu li').each(function () {

      $(this).on('click', function () {
        $('.money-menu li').removeClass('active');
        $(this).addClass('active');
        var txt = $('.money-menu li').eq($(this).index()).text();
        $('.money-menu').css('display', 'none');
        $('.money-btn').find('i').text(txt);
        if(txt=='元'){
          _this.initOdds(JSON.parse(localStorage.prizedata),1);
        }else if(txt=='角'){
          _this.initOdds(JSON.parse(localStorage.prizedata),0.1);
        }else if(txt=='分'){
          _this.initOdds(JSON.parse(localStorage.prizedata),0.01);
        }

        _this.calculateMoney();
      });
    });
  }



  initOdds(data,moneyunit) {

    console.log('data=='+data)


    var hz_prize, hz_extra_prize, sth_prize, erth_prize, sbt_prize, erbt_prize, slh_prize, dtys_prize;
    hz_prize = data[0].prize;
    hz_extra_prize = data[0].extra_prize;
    sth_prize = new Number(data[1].prize*moneyunit).toFixed(2);
    erth_prize = new Number(data[2].prize*moneyunit).toFixed(2);
    sbt_prize = new Number(data[3].prize*moneyunit).toFixed(2);
    erbt_prize = new Number(data[4].prize*moneyunit).toFixed(2);
    slh_prize = new Number(data[5].prize*moneyunit).toFixed(2);
    dtys_prize = new Number(data[6].prize*moneyunit).toFixed(2);

//hz
//     $('.hz-section .content-box .ball-num')
    for(var i=0;i<18;i++){
      var inx = i+3;
      $('.hz-section .prize').eq(i).text('奖金'+new Number(hz_extra_prize[inx]*moneyunit).toFixed(2)+'元');
    }
//三同号
    $('.santh-section .content-box .ball-num').find('.prize').text('奖金' + sth_prize + '元')
//二同号
    $('.eth_prize').text(erth_prize);
//三不同号
    $('.sbt_prize').text(sbt_prize);
//二不同号
    $('.ebt_prize').text(erbt_prize);
//三连号
    $('.sanlh-section .prize').text('奖金' + slh_prize + '元');
//单挑一骰
    $('.dtys-section .prize').text('奖金' + dtys_prize + '元');


  }


  fastBtnDxds123() {

    var _this = this;
    $('.select-btn li').on('click', function () {
      $('.active').removeClass('active');
      $(this).addClass('active');
      var obj = $(this).parents('.select-btn').siblings('.content-box');
      var len = obj.find('.ball-unit').length;
      var txt = $(this).attr('class').split(' ')[0];
      // console.log('txt=='+txt);
      if (txt.search('li') != -1) {
        var num = txt.substr(2, 1);
        for (var i = 0; i < len; i++) {
          var str = obj.find('.ball-num span').eq(i).text();
          if (str.search(num) != -1) {
            obj.find('.ball-num').eq(i).addClass('active');
          }
        }
      }
      switch (txt) {
        case 'da':
          var num = Math.ceil(len / 2) - 1;
          obj.find('.ball-num:gt(' + num + ')').addClass('active');
          break;
        case 'xiao':
          var num = Math.ceil(len / 2);
          obj.find('.ball-num:lt(' + num + ')').addClass('active');
          break;
        case 'ji':
          obj.find('.ball-num:even').addClass('active');
          break;
        case 'ou':
          obj.find('.ball-num:odd').addClass('active');
          break;
      }
      _this.calculateMoney();
    })

    //三同通
    $('.tx-btn').on('click', function () {
      // $('.active').removeClass('active');
      $(this).find('.tx-num').toggleClass('selected');
      if ($(this).find('.tx-num').hasClass('selected')) {
        $(this).siblings('.ball-unit').find('.ball-num').addClass('active');
      } else {
        $(this).siblings('.ball-unit').find('.ball-num').removeClass('active');
      }
      // _this.calculateNumOfBet();
      _this.calculateMoney();

    })
  }


  changePlaySelect() {

    let _this = this;
    //主玩法选择
    $('page-ks .after-list .play-black').each(function () {

      $(this).on('click', function () {


        $('.after-list .play-black').removeClass('play-yellow');
        $(this).addClass('play-yellow');
        // var title = $('.wanfa').text();
        var title = $('.after-list .play-yellow').text();
        //清空当前页面
        $('.active').removeClass('active');
        $('.wanfa').text(title);
        localStorage.wanfa = title;
        _this.changeBallUi(title);
        _this.removeCover();
        _this.calculateMoney();


        var en_name1 = $('.play-list .play-yellow').next().val();
        var en_name2 = $('.after-select .play-yellow').parent().parent().prev().children('input').val();
        var str = $('.after-select .play-yellow').attr('data-index');
        var arr = str.split("|");
        var en_name3 = arr[1];
        var typeStr = en_name1 + '.' + en_name2 + '.' + en_name3;
        var wayId = arr[0]; //$('.after-select .play-yellow').next().attr('id');

        localStorage.typeStr = typeStr;
        localStorage.wayId = wayId;
        localStorage.price = arr[2];
        localStorage.bet_note = arr[3];
        localStorage.bonus_note = arr[4];
        if (title == '和值') {
          localStorage.max_multiple = 949;
        } else {
          localStorage.max_multiple = arr[5];
        }

        localStorage.is_enable_extra = arr[6];
        // 237|hezhi|2||至少选择1个和值（3个号码之和）进行投注，所选和值与开奖的3个号码的和值相同即中奖|25510|0
        // play_id + '|' + name_en + '|' + price + '|' + bet_note + '|' + bonus_note + '|' + max_multiple + '|' + is_enable_extra


      })

    });
  };

  changeBallUi(title) {

    let _this = this;
    $('.section').addClass('hide');
    $('.section').removeClass('current');
    switch (title) {
      case '和值':
        $('.hz-section').removeClass('hide');
        $('.hz-section').addClass('current');
        break;
      case '三同号':
        $('.santh-section').removeClass('hide');
        $('.santh-section').addClass('current');
        break;
      case '二同号':
        $('.ert-section').removeClass('hide');
        $('.ert-section').addClass('current');
        break;
      case '三不同号':
        $('.sanbth-section').removeClass('hide');
        $('.sanbth-section').addClass('current');
        break;
      case '二不同号':
        $('.erbth-section').removeClass('hide');
        $('.erbth-section').addClass('current');
        break;
      case '三连号':
        $('.sanlh-section').removeClass('hide');
        $('.sanlh-section').addClass('current');
        break;
      case '单挑一骰':
        $('.dtys-section').removeClass('hide');
        $('.dtys-section').addClass('current');
        break;
    }
  }


  ballClick() {

    let _this = this;
    $('.content-box .ball-unit').on('click', function () {

      $(this).find('.ball-num').toggleClass('active');
      _this.calculateMoney();

    })

    $('.tonghao-th .ball-unit').on('click', function () {
      var index = $(this).index();
      $('.tonghao-bth .ball-num').eq(index).removeClass('active');
      _this.calculateMoney();
    })
    $('.tonghao-bth .ball-unit').on('click', function () {
      var index = $(this).index();
      $('.tonghao-th .ball-num').eq(index).removeClass('active');
      _this.calculateMoney();
    })

  }

  calculateNumOfBet() {

    var zhushu;
    if ($('.wanfa').text().search('二同号') != -1) {
      var a = $('.tonghao-th .active').length;
      var b = $('.tonghao-bth .active').length;
      var c = $('.content-box .active').length - $('.tonghao .active').length;

      zhushu = a * b + 5 * c;
    } else {
      zhushu = $('.content-box .active').length;
    }

    if (zhushu > 0) {
      $('.bottom-r').css('background', '');
       $('.ks-footer').css('background', 'rgb(255,248,235)');
    }else {
      $('.ks-footer').css('background', '#ececec')
    }
    console.log('zhushu==' + zhushu)
    return zhushu;
  }


  calculateMoney() {

    let _this = this;

    var zhu = _this.calculateNumOfBet();
    $('.total-num').text(zhu);
    var txt = $('.money-btn i').text();
    var moneyunit = 1;
    switch (txt) {
      case '元':
        moneyunit = 1;
        break;
      case '角':
        moneyunit = 0.1;
        break;
      case '分':
        moneyunit = 0.01;
        break;
    }

    var newmoney = Math.floor((zhu * moneyunit * 2) * 100) / 100;  //注数 * 单元 * 倍数 *2
    $('.money').text(newmoney);

  }

  initClick() {
    var _this = this;
    $('.l-clean').on('click', function () {
      $('.active').removeClass('active');

      // _this.calculateNumOfBet();
      _this.calculateMoney();

    })

    $('.shake').on('click', function () {
      _this.shakeClick();
    })

    _this.initTrendEvent();

  }


  cleanBalls() {

    $('.active').removeClass('active');
    $('.total-num').text(0);
    $('.money').text(0);

  }

  addCover() {
    let _this = this;
    if ($('.header-top').hasClass('hide')) {
      _this.removeCover();
      return;
    }
    $('.header-top').addClass('hide');
    $('.body-bg').removeClass('hide');
    $('.alert-con').removeClass('hide');
    $('.after-con').addClass('active');

  }

  removeCover() {
    $('.header-top').removeClass('hide');
    $('.body-bg').addClass('hide');
    $('.alert-con').addClass('hide');
  }


}
