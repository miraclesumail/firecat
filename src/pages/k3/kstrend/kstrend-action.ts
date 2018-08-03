import {Injectable} from '@angular/core';
import * as $ from 'jquery';
import {Tpl} from '../../../providers/base-tool/tpl';
import {LoadingController} from 'ionic-angular';

@Injectable()
export class KstrendAction {

  constructor(public loading: LoadingController) {
  }

  hz = ['开奖', '基本走势', '和值走势', '冷热'];
  santh = ['开奖', '基本走势', '形态走势'];
  erth = ['开奖', '基本走势', '号码分布'];
  sanbth = ['开奖', '基本走势', '形态走势', '冷热'];
  erbth = ['开奖', '基本走势', '号码分布', '冷热'];
  sanl = ['开奖', '基本走势', '形态走势'];
  dantys = ['开奖', '基本走势', '形态走势', '冷热'];


  initView(wanfa, index) {


    this.initClick();
    this.changeBallUi(wanfa, 0);
    this.setDefaultTitle(wanfa, index);
    // this.changePlaySelect();
    this.changeBottomUiWhenPlayChanged();
    this.changeQueDing();
  }

  setDefaultTitle(title, index) { //index区分开默认选中 开奖 还是 走势
    $('page-kstrend .wanfa').text(title);
    //默认 标签选中
    if (index == 1) {
      //顶部选中
      //默认开奖选中
      this.setDefaultUiByIndex(0);
    } else {
      this.setDefaultUiByIndex(2);
    }
  }

  setDefaultUiByIndex(i) {
    $('.ks-tab-top .ks-tab-unit').eq(i).addClass('current');
    $('.ks-tab-second').addClass('hide');
    $('.ks-tab-second').eq(i).removeClass('hide');
  }

  initClick() {

    let _this = this;
    $('.select-d').on("click", ".ks-tab-top .ks-tab-unit", function () {



      $('.current').removeClass('current');
      let index = $(this).index();
      $(this).addClass('current');
      // $('.ks-tab-second').addClass('hide');
      // $('.ks-tab-second').eq(index).removeClass('hide');
      // $('.content-d').addClass('hide');
      // $('.content-d').eq(index).removeClass('hide');
      var title = $('.wanfa').eq(0).text();
      _this.changeBallUi(title, index);
    });

    $('.ks-bom-ul').on("click", "p", function () {
      // let index = $(this).index();
      $(this).toggleClass('active');

      //计算注数，切换确定按钮高亮显示
      _this.changeQueDing();
    });


    //顶部top-tab 点击事件
    // let _this = this;
    // $('.ks-tab-top .ks-tab-unit').each(function () {
    //   $(this).on('click','.ks-tab-unit', function () {
    //     $('.current').removeClass('current');
    //     let index = $(this).index();
    //     $(this).addClass('current');
    //     $('.ks-tab-second').addClass('hide');
    //     $('.ks-tab-second').eq(index).removeClass('hide');
    //     $('.content-d').addClass('hide');
    //     $('.content-d').eq(index).removeClass('hide');
    //   })
    // });
  }

  changeQueDing() {

    var len = $('.ks-bom-ul .active').length;
    console.log('len==' + len)
    if (len > 0) {
      // console.log(6666)
      // $('.bottom-r').css('background', '');
      $('.bottom-2 .confirm-btn').css('background', '');
    } else {
      $('.bottom-2 .confirm-btn').css('background', 'grey');
    }

  }


  removeCover() {
    $('.select-d').removeClass('hide');
    $('.body-bg').addClass('hide');
    $('.alert-con').addClass('hide');
  }

  changePlaySelect() {

    console.log('changePlaySelect~~~~~');
    let _this = this;
    //主玩法选择

    // $('.kstrend-alert').on("click", ".after-list .play-black", function () {
    //   $('.kstrend-alert .after-list .play-black').removeClass('play-yellow');
    //   $(this).addClass('play-yellow');
    //   // var title = $('.wanfa').text();
    //   var title = $('.kstrend-alert .after-list .play-yellow').text();
    //   //清空当前页面
    //   // $('.active').removeClass('active');
    //   $('.wanfa').text(title);
    //   _this.removeCover();
    //   // _this.calculateMoney();
    //   //根据玩法 切换 UI
    //   _this.changeBallUi(title);
    // });


    $('page-kstrend .after-list .play-black').each(function () {
      $(this).on('click', function () {
        console.log('changePlaySelect~~~~');
        $('.after-list .play-black').removeClass('play-yellow');
        $(this).addClass('play-yellow');
        // var title = $('.wanfa').text();
        var title = $('.after-list .play-yellow').text();
        //清空当前页面
        $('.active').removeClass('active');
        $('.wanfa').text(title);
        _this.removeCover();
        // _this.calculateMoney();
        //根据玩法 切换 UI
        _this.changeBallUi(title, 0);
        //切花选球ui
        _this.changeBottomUiWhenPlayChanged();

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
        localStorage.max_multiple = arr[5];
        localStorage.is_enable_extra = arr[6];

      })
    });

  };


  changeBottomUiWhenPlayChanged() {

    var title = $('page-kstrend .wanfa').text();
    $('.ks-bom-ul').find('li').remove();
    $('.bom_title').text(title);
    switch (title) {
      case '和值':
        $('.ks-bom-ul').append(Tpl.trend_bom_hz);
        $('.bom_title').text('和值选号');
        break;
      case '三同号':
        $('.ks-bom-ul').append(Tpl.trend_bom_3th);
        break;
      case'三连号':
        $('.ks-bom-ul').append(Tpl.trend_bom_3lh);
        break;
      case '二同号':
        $('.ks-bom-ul').append(Tpl.trend_bom_2th);
        break;
      case '三不同号':
        $('.ks-bom-ul').append(Tpl.trend_bom_3bt);
        break;
      case '二不同号':
        $('.ks-bom-ul').append(Tpl.trend_bom_2bt);
        break;
      case '单挑一骰':
        $('.ks-bom-ul').append(Tpl.trend_bom_3bt_2bt_dty);
        break;

    }

  }


  changeBallUi(title, index) {

    //1 改变 顶部tab
    //2 改变 次顶级 tab
    //3 改变页面
    let loader = this.loading.create({});
    loader.present();

    var htm = '', item, arr = [], obj = $('.select-d'), trend = $('.trend-content');
    obj.find('ul').remove();
    trend.find('div').remove();
    // trend.html('');
    // $('.trend-content').html('');
    // var title = $('page-kstrend  .wanfa').text();

    console.log('title===' + title);
    //玩法切换时候  默认显示选中的 ， 其他的  按需显示
    // console.log('当前选中的 索引 index===' + index);
    // $('.ks-bom-ul').find('li').remove();
    // $('.bom_title').text(title);
    // this.BaseTool.showLoading();



    switch (title) {
      case '和值':

        arr = this.hz;
        obj.append(Tpl.kj_hz_tpl).append(Tpl.jbzs_tpl).append(Tpl.hzzs_tpl).append(Tpl.lr_tpl);
        trend.append(Tpl.kj_hz_con_tpl);
        // this.createKjContent('hezhi');
        if (index == 0) {
          this.createKjContent('hezhi');
        } else if (index == 1) {
          this.createJbzsContent();
        } else if (index == 2) {
          this.createHzzsContent();
        } else if (index == 3) {
          this.createLrContent();
        }

        // loader.dismiss();
        break;
      case '三同号':
      case'三连号':
        arr = this.santh;
        obj.append(Tpl.kj_other_tpl).append(Tpl.jbzs_tpl).append(Tpl.xtzs_tpl);
        trend.append(Tpl.kj_others_con_tpl);
        // this.createKjContent('others');
        if (index == 0) {
          this.createKjContent('others');
        } else if (index == 1) {
          this.createJbzsContent();
        } else if (index == 2) {
          this.createXtzsContent();
        }

        break;
      case '二同号':
        arr = this.erth;
        obj.append(Tpl.kj_other_tpl).append(Tpl.jbzs_tpl).append(Tpl.hmfb_erth_tpl);
        trend.append(Tpl.kj_others_con_tpl);
        if (index == 0) {
          this.createKjContent('others');
        } else if (index == 1) {
          this.createJbzsContent();
        } else if (index == 2) {
          this.createHmfbContent();
        }
        break;
      case '三不同号':
        arr = this.sanbth;
        obj.append(Tpl.kj_other_tpl).append(Tpl.jbzs_tpl).append(Tpl.xtzs_tpl).append(Tpl.lr_tpl);
        trend.append(Tpl.kj_others_con_tpl);

        if (index == 0) {
          this.createKjContent('others');
        } else if (index == 1) {
          this.createJbzsContent();
        } else if (index == 2) {
          this.createXtzsContent();
        } else if (index == 3) {
          this.createLrContent();
        }
        break;
      case '二不同号':
        arr = this.sanbth;
        obj.append(Tpl.kj_other_tpl).append(Tpl.jbzs_tpl).append(Tpl.hmfb_erbth_tpl).append(Tpl.lr_tpl);
        trend.append(Tpl.kj_others_con_tpl);

        if (index == 0) {
          this.createKjContent('others');
        } else if (index == 1) {
          this.createJbzsContent();
        } else if (index == 2) {
          this.createHmfb2btContent();
        } else if (index == 3) {
          this.createLrContent();
        }
        break;
      case '单挑一骰':
        arr = this.dantys;
        obj.append(Tpl.kj_other_tpl).append(Tpl.jbzs_tpl).append(Tpl.xtzs_tpl).append(Tpl.lr_tpl);
        trend.append(Tpl.kj_others_con_tpl);

        if (index == 0) {
          this.createKjContent('others');
        } else if (index == 1) {
          this.createJbzsContent();
        } else if (index == 2) {
          this.createXtzsContent();
        } else if (index == 3) {
          this.createLrContent();
        }
        break;
    }
    loader.dismiss();
    // 创建 次顶级 tab
    for (let i = 0; i < arr.length; i++) {
      item = ' <div class="ks-tab-unit">\n' +
        '      <p>' + arr[i] + '</p>\n' +
        '      <div class="underline"></div>\n' +
        '    </div>';
      htm += item;
    }
    $('.ks-tab-top').html(htm);

    //3 设置 默认 选择按钮 状态  和  生成页面
    this.setDefaultUiByIndex(index);


    //4 切换 内容ui    根据玩法 ---
    //根据 请求来的数据  画ui
    //1 画 开奖 content （分 和值 ，other）
    //2 画 基本走势content  -- 全部相同
    //3 画 形态走势content
    //4 画 号码分布
    //5 画 冷热content
    //6 画和值走势
    // 画完之后 再设置 当前 显示的～～～

  }


  createKjContent(type) {
    var trend = $('.trend-content'), htm = '', item;
    switch (type) {
      case 'hezhi':
        // trend.append(Tpl.kj_hz_con_tpl);
        // console.log('trend-htm==' + trend.html());

        // for (var i = 0; i < 10; i++) {
        //   item = '<li class="his-line">\n' +
        //     '        <p class="t-issue">02000期</p>\n' +
        //     '        <p class="cutline"><span class="dom"></span></p>\n' +
        //     '        <p class="t-num">\n' +
        //     '           <span class="saizi-span">\n' +
        //     '        <i class="saizi saizi-1"></i>\n' +
        //     '        <i class="saizi saizi-2"></i>\n' +
        //     '        <i class="saizi saizi-3"></i>\n' +
        //     '      </span>\n' +
        //     '          2 3 2</p>\n' +
        //     '        <p class="t-total">15</p>\n' +
        //     '        <p class="t-big">13</p>\n' +
        //     '        <p class="t-odd">12</p>\n' +
        //     '      </li>';
        //   htm += item;
        // }

        var arr = JSON.parse(localStorage.hisissue);//.reverse();
        var code0, code1, code2, toltal, dx, jo, item;
        for (var i = 0; i < arr.length; i++) {
          code0 = arr[i].code.split('')[0];
          code1 = arr[i].code.split('')[1];
          code2 = arr[i].code.split('')[2];
          toltal = parseInt(code0) + parseInt(code1) + parseInt(code2);
          toltal > 10 ? dx = '大' : dx = '小';
          toltal % 2 == 0 ? jo = '双' : jo = '单';
          //20180602015  20180602015--  0602015期
          if (arr[i].code == '') {
            item = '<li class="his-line">\n' +
              '        <p class="t-issue">' + arr[i].number.slice(6) + '期</p>\n' +
              '        <p class="cutline"><span class="dom"></span></p>\n' +
              '        <p class="kj-ing">等待开奖...</p>\n' +
              '      </li>';
          } else {
            item = '<li class="his-line">\n' +
              // '        <p class="t-issue">' + newary[i].number + '期</p>\n' +

              '        <p class="t-issue">' + arr[i].number.slice(6) + '期</p>\n' +
              '        <p class="cutline"><span class="dom"></span></p>\n' +
              '        <p class="t-num">\n' +
              '           <span class="saizi-span">\n' +
              '        <i class="saizi saizi-' + code0 + '"></i>\n' +
              '        <i class="saizi saizi-' + code1 + '"></i>\n' +
              '        <i class="saizi saizi-' + code2 + '"></i>\n' +
              '      </span>\n' +
              '          ' + arr[i].code + ' </p>\n' +
              '        <p class="t-total"> ' + toltal + '</p>\n' +
              '        <p class="t-big">' + dx + '</p>\n' +
              '        <p class="t-odd">' + jo + '</p>\n' +
              '      </li>';
          }
          htm += item;
        }

        break;
      case 'others':
        // trend.append(Tpl.kj_others_con_tpl);
        //形态： 三不同号，三同号，二同号，三连号

        var arr = JSON.parse(localStorage.hisissue)//.reverse();
        var code0, code1, code2, toltal, dx, jo, item, xt, code, reg_3t, reg_3l, reg_2t;
        for (var i = 0; i < arr.length; i++) {
          code0 = arr[i].code.split('')[0];
          code1 = arr[i].code.split('')[1];
          code2 = arr[i].code.split('')[2];

          //判断三个号码
          code = arr[i].code;
          reg_3t = /(111|222|333|444|555|666)/g;
          reg_3l = /(123|234|345|456)/g;
          reg_2t = /(\w)\1/g;  //二同号
          if (code.match(reg_3t) != null) {
            xt = '三同号';
          } else if (code.match(reg_3l) != null) {
            xt = '三连号';
          } else if (code.match(reg_2t) != null) {
            xt = '二同号';
          } else {
            xt = '三不同号';
          }

          if (arr[i].code == '') {
            item = '<li class="his-line">\n' +
              '        <p class="t-issue">' + arr[i].number.slice(4) + '期</p>\n' +
              '        <p class="cutline"><span class="dom"></span></p>\n' +
              '        <p class="kj-ing">等待开奖...</p>\n' +
              '      </li>';
          } else {
            item = '<li class="his-line">\n' +
              '        <p class="t-issue">' + arr[i].number.slice(4) + '期</p>\n' +
              '        <p class="cutline"><span class="dom"></span></p>\n' +
              '        <p class="t-num">\n' +
              '  <span class="saizi-span">\n' +
              '  <i class="saizi saizi-1"></i>\n' +
              '  <i class="saizi saizi-2"></i>\n' +
              '  <i class="saizi saizi-3"></i>\n' +
              '  </span>\n' +
              '          ' + code0 + ' ' + code1 + ' ' + code2 + '</p>\n' +
              '        <p class="t-xt">' + xt + '</p>\n' +
              '      </li>';
          }
          htm += item;
        }

        break;
    }

    trend.find('.kj-ul').html(htm);
  }


  createJbzsContent() {

    var trend = $('.trend-content'), htm = '', item;
    trend.append(Tpl.jbzs_con_tpl);
    // $('.jbzs-ul').html('');
    var arr = JSON.parse(localStorage.hisissue)//.reverse();
    var code0, code1, code2, hezhi, kuadu, item, code, codestr, reg;
    // reg =eval("/"+re+"/ig")
    for (var i = 0; i < arr.length; i++) {
      code = arr[i].code;
      if (code == '') {
        item = '<li class="his-line">\n' +
          '        <p class="t-issue">' + arr[i].number.slice(8) + '期</p>\n' +
          '        <p class="kj-ing" style="width: 85vw;">等待开奖...</p>\n' +
          '      </li>';
        $('.jbzs-container .jbzs-ul').append(item);
        continue;
      } else {
        code0 = code.split('')[0];
        code1 = code.split('')[1];
        code2 = code.split('')[2];
        codestr = code0 + ' ' + code1 + ' ' + code2;
        //和值：
        hezhi = parseInt(code0) + parseInt(code1) + parseInt(code2);
        //跨度：
        kuadu = code2 - code0;
        item = '<li class="his-line">\n' +
          '        <p class="t-issue">' + arr[i].number.slice(8) + '期</p>\n' +
          '        <p class="t-num">' + codestr + '</p>\n' +
          '        <p class="t-total">' + hezhi + '</p>\n' +
          '        <p class="t-kuadu">' + kuadu + '</p>\n' +
          '      </li>';
        $('.jbzs-container .jbzs-ul').append(item);
      }
      for (var j = 0; j < 6; j++) {
        var it, num = j + 1;
        // var len = code.length - code.replace(new RegExp(num, 'g'), '').length;
        var len = (code.split(num)).length - 1;
        if (len == 0) {
          //0 ---》 要 计算 上次 未出现次数
          var txt, obj;
          if (i == 0) {
            txt = 1;
          } else {

            //判断上个 球是否 active  如果选中，则1 否则 +1
            obj = $('.jbzs-ul').find('.his-line').eq(i - 1).find('p').eq(j + 4);
            txt = obj.find('span').eq(0).text();
            // console.log('上一期 对应球 ===' + txt);
            if (obj.find('span').hasClass('active')) {
              txt = 1;
            } else {
              txt = parseInt(txt) + 1;
            }
            if ($('.jbzs-ul').find('.his-line').eq(i - 1).find('.kj-ing').text().search('等待') != -1) {
              txt = 1;
            }
          }


          it = '<p class="t-' + num + '">\n' +
            '          <span class="t">' + txt + '</span>\n' +
            '          <span class="corner hide">0</span>\n' +
            '        </p>';

        } else if (len == 1) {

          it = '<p class="t-' + num + '">\n' +
            '          <span class="t active">' + num + '</span>\n' +
            '          <span class="corner hide">1</span>\n' +
            '        </p>';
        } else { //2 3
          it = '<p class="t-' + num + '">\n' +
            '          <span class="t active">' + num + '</span>\n' +
            '          <span class="corner">' + len + '</span>\n' +
            '        </p>';
        }
        $('.jbzs-ul').find('.his-line').eq(i).append(it);

      }
    }


    //统计要 按照不同的玩法 取数据
    //判断玩法

    var title = $('page-kstrend .wanfa').text();
    var ylarr = [];

    if(!localStorage.yldata90){
      var statistic = '<ul class="bottom-jbzs">\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">出现次数</p>\n' +
        '        <p class="t-1">-</p>\n' +
        '        <p class="t-2">-</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">平均遗漏</p>\n' +
        '        <p class="t-1">-</p>\n' +
        '        <p class="t-2">-</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">最大遗漏</p>\n' +
        '        <p class="t-1">-</p>\n' +
        '        <p class="t-2">-</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">当前遗漏</p>\n' +
        '        <p class="t-1">-</p>\n' +
        '        <p class="t-2">-</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '      </li>\n' +
        '    </ul>';
      $('.jbzs-container').append(statistic);
      return;
    }


    ylarr = JSON.parse(localStorage.yldata90).k3dtys;

    var it;
    // for(var m =0;m<ylarr.length;m++){
    // }
    var statistic = '<ul class="bottom-jbzs">\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">出现次数</p>\n' +
      '        <p class="t-1">' + ylarr['hot']['1'] + '</p>\n' +
      '        <p class="t-2">' + ylarr['hot']['2'] + '</p>\n' +
      '        <p class="t-3">' + ylarr['hot']['3'] + '</p>\n' +
      '        <p class="t-4">' + ylarr['hot']['4'] + '</p>\n' +
      '        <p class="t-5">' + ylarr['hot']['5'] + '</p>\n' +
      '        <p class="t-6">' + ylarr['hot']['6'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">平均遗漏</p>\n' +
      '        <p class="t-1">' + ylarr['average']['1'] + '</p>\n' +
      '        <p class="t-2">' + ylarr['average']['2'] + '</p>\n' +
      '        <p class="t-3">' + ylarr['average']['3'] + '</p>\n' +
      '        <p class="t-4">' + ylarr['average']['4'] + '</p>\n' +
      '        <p class="t-5">' + ylarr['average']['5'] + '</p>\n' +
      '        <p class="t-6">' + ylarr['average']['6'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">最大遗漏</p>\n' +
      '        <p class="t-1">' + ylarr['max']['1'] + '</p>\n' +
      '        <p class="t-2">' + ylarr['max']['2'] + '</p>\n' +
      '        <p class="t-3">' + ylarr['max']['3'] + '</p>\n' +
      '        <p class="t-4">' + ylarr['max']['4'] + '</p>\n' +
      '        <p class="t-5">' + ylarr['max']['5'] + '</p>\n' +
      '        <p class="t-6">' + ylarr['max']['6'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">当前遗漏</p>\n' +
      '        <p class="t-1">' + ylarr['current']['1'] + '</p>\n' +
      '        <p class="t-2">' + ylarr['current']['2'] + '</p>\n' +
      '        <p class="t-3">' + ylarr['current']['3'] + '</p>\n' +
      '        <p class="t-4">' + ylarr['current']['4'] + '</p>\n' +
      '        <p class="t-5">' + ylarr['current']['5'] + '</p>\n' +
      '        <p class="t-6">' + ylarr['current']['6'] + '</p>\n' +
      '      </li>\n' +
      '    </ul>';

    $('.jbzs-container').append(statistic);

  }


  createXtzsContent() {

    var trend = $('.trend-content'), htm = '', item;
    trend.append(Tpl.xtzs_con_tpl);
    // console.log('xtzs_con_tpl==='+trend.html());

    var arr = JSON.parse(localStorage.hisissue)//.reverse();
    var code0, code1, code2, item, code, codestr, reg_3t, reg_2t;
    for (var i = 0; i < arr.length; i++) {
      code = arr[i].code;
      if (code == '') {
        item = '<li class="his-line">\n' +
          '        <p class="t-issue">' + arr[i].number.slice(6) + '期</p>\n' +
          '        <p class="kj-ing" style="width: 85vw;">等待开奖...</p>\n' +
          '      </li>';
        $('.xtzs-container .xtzs-ul').append(item);
        continue;
      } else {
        code0 = code.split('')[0];
        code1 = code.split('')[1];
        code2 = code.split('')[2];
        codestr = code0 + ' ' + code1 + ' ' + code2;
        item = '<li class="his-line">\n' +
          '      <p class="t-issue">' + arr[i].number.slice(6) + '期</p>\n' +
          '      <p class="t-kjh">' + codestr + '</p>\n' +
          '      </li>';
        $('.xtzs-container .xtzs-ul').append(item);
      }
      //判断号码类型
      reg_3t = /(111|222|333|444|555|666)/g;
      reg_2t = /(\w)\1/g;
      //三同号 三不同号 二同号
      var xt, xtarr = [];
      if (code.match(reg_3t) != null) {
        xt = '三同号';  //   三同 ，二同
        xtarr = ['三同号', '0', '二同号', '0'];
      } else if ((code.match(reg_2t) != null) && (code0 != code2)) {
        xt = '二同号'; // 二同， 二不同
        xtarr = ['0', '0', '二同号', '二不同'];
      } else { // 三不同 ，二不同
        xtarr = ['0', '三不同', '0', '二不同'];
      }
      var htm = '', it, obj, txt;
      console.log('xtar===' + xtarr);
      for (var k = 0; k < xtarr.length; k++) {
        if (xtarr[k] != '0') {
          it = '<p class="t t-' + (k + 1) + ' active">' + xtarr[k] + '</p>'
        } else {
          //做统计
          if (i == 0) {
            txt = 1;
          } else {
            obj = $('.xtzs-ul').find('.his-line').eq(i - 1).find('p').eq(k + 2);
            txt = obj.text();
            // console.log('上一期 对应球 ===' + txt);
            if (obj.hasClass('active')) {
              txt = 1;
            } else {
              txt = parseInt(txt) + 1;
            }
          }
          if ($('.xtzs-ul').find('.his-line').eq(i - 1).find('.kj-ing').text().search('等待') != -1) {
            txt = 1;
          }
          it = '<p class="t t-' + (k + 1) + '">' + txt + '</p>';
        }
        htm += it;
      }
      $('.xtzs-container .xtzs-ul').find('.his-line').eq(i).append(htm);
    }

    // 计算.t-1

    // 出现次数
    // console.log('parseInt(xtzs-ul .eq(2).text())==='+parseInt($('.xtzs-ul .t-2').eq(2).text()))

    var duanshu, aver_1, aver_arr = [], hot_arr = [], max_arr = [], current_arr = [];

    for (var h = 1; h <= 4; h++) {

      //当前遗漏
      var current_1 = $('.xtzs-ul li:last').find('.t-' + h).text();
      var current_2 = $('.xtzs-ul li').eq(-2).find('.t-' + h).text();
      if (current_1 == '' && current_2!='') {
        current_1 = $('.xtzs-ul li').eq(-2).find('.t-' + h).text();
      } else if (current_2== '') {
        current_1 = '0';
      } else if (!(parseInt(current_1) > 0)) {
        current_1 = '0';
      }
      console.log('current_1====' + current_1);
      // console.log('v====' + v);
      //最大遗漏
      var max_1 = 1;//parseInt($('.xtzs-ul .t-'+h).eq(0).text()), v;
      // console.log('第一个max_1===='+max_1);
      var list = $('.xtzs-ul .t-' + h);
      list.each(function () {
        v = parseInt($(this).text());
        // console.log('循环体内v===='+v);
        if (v > max_1) {
          max_1 = v
        }
      });

      //出现次数
      var hot = $('.xtzs-ul').find('.t-' + h + '.active').length;

      //平均遗漏
      var averarr = [], empty = 0, totalyl = 0, v;
      var list = $('.xtzs-ul .t-' + h);
      list.each(function () {
        v = parseInt($(this).text());
        if (v > 0) {
          averarr.push(1);
        } else {
          averarr.push('/');
        }
      });
      averarr = averarr.join('').split('/');
      for (var p = 0; p < averarr.length; p++) {
        if (averarr[p].length == 0) {
          empty += 1;
        } else {
          totalyl += averarr[p].length;
        }
      }

      // console.log('empty=='+empty);
      duanshu = averarr.length - empty;
      aver_1 = Math.floor(totalyl / duanshu);
      console.log('aver_1==' + aver_1)
      console.log('totalyl==' + totalyl)
      console.log('duanshu==' + duanshu)
      if (duanshu == 0) {
        aver_1 = 1;
      }
      current_arr.push(current_1);
      aver_arr.push(aver_1);
      max_arr.push(max_1);
      hot_arr.push(hot);
      // console.log('段数==='+duanshu);

    }
    // var list = $('.xtzs-ul .t-1');
    // list.each(function () {
    //   v = parseInt($(this).text());
    //   if (v > 0) {
    //     averarr.push(1);
    //   } else {
    //     averarr.push('/');
    //   }
    // });
    // averarr = averarr.join('').split('/');
    // for (var p = 0; p < averarr.length; p++) {
    //   if (averarr[p].length == 0) {
    //     empty += 1;
    //   }else {
    //     totalyl+= averarr[p].length;
    //   }
    // }
    // duanshu = averarr.length - empty;
    // aver_1 = Math.floor(totalyl/duanshu);


    var statistic = '<ul class="bottom-xtzs">\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">出现次数</p>\n' +
      '        <p class="t">' + hot_arr[0] + '</p>\n' +
      '        <p class="t">' + hot_arr[1] + '</p>\n' +
      '        <p class="t">' + hot_arr[2] + '</p>\n' +
      '        <p class="t">' + hot_arr[3] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">平均遗漏</p>\n' +
      '        <p class="t">' + aver_arr[0] + '</p>\n' +
      '        <p class="t">' + aver_arr[1] + '</p>\n' +
      '        <p class="t">' + aver_arr[2] + '</p>\n' +
      '        <p class="t">' + aver_arr[3] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">最大遗漏</p>\n' +
      '        <p class="t">' + max_arr[0] + '</p>\n' +
      '        <p class="t">' + max_arr[1] + '</p>\n' +
      '        <p class="t">' + max_arr[2] + '</p>\n' +
      '        <p class="t">' + max_arr[3] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">当前遗漏</p>\n' +
      '        <p class="t">' + current_arr[0] + '</p>\n' +
      '        <p class="t">' + current_arr[1] + '</p>\n' +
      '        <p class="t">' + current_arr[2] + '</p>\n' +
      '        <p class="t">' + current_arr[3] + '</p>\n' +
      '      </li>\n' +
      '    </ul>';

    $('.xtzs-container').append(statistic);

  }


  createHmfb2btContent() {
    //二不同号
    var trend = $('.trend-content'), htm = '', item;
    trend.append(Tpl.hmfb_erbth_con_tpl);

    var arr = JSON.parse(localStorage.hisissue)//.reverse();
    var code0, code1, code2, item, code, codestr, reg_3t, reg_2t, reg_2bt;
    for (var i = 0; i < arr.length; i++) {
      code = arr[i].code;
      if (code == '') {
        item = '<li class="his-line">\n' +
          '        <p class="t-issue">' + arr[i].number.slice(6) + '期</p>\n' +
          '        <p class="kj-ing" style="width: 85vw;">等待开奖...</p>\n' +
          '      </li>';
        $('.hmfb-container .hmfb-ul').append(item);
        continue;
      } else {
        code0 = code.split('')[0];
        code1 = code.split('')[1];
        code2 = code.split('')[2];
        codestr = code0 + ' ' + code1 + ' ' + code2;
        item = '<li class="his-line">\n' +
          '      <p class="t-issue">' + arr[i].number.slice(6) + '期</p>\n' +
          '      <p class="t-kjh">' + codestr + '</p>\n' +
          '      </li>';

        $('.hmfb-container .hmfb-ul').append(item);
      }

      var code01 = code0 + code1;
      var code02 = code0 + code2;
      var code12 = code1 + code2;
      //判断号码类型
      reg_2t = /(\w)\1/g;
      reg_2bt = /(12|13|14|15|16|23|24|25|26|34|35|36|45|46|56)/g;
      var arr2bt = [12, 13, 14, 15, 16, 23, 24, 25, 26, 34, 35, 36, 45, 46, 56];
      // 二同号
      var it, num, htm = '', txt, obj;

      //1 判断是否二不同号
      //2 是二不同号 --》   对应for 循环时候就 active属性
      //3 不是二不同号 --》 对应for 循环 直接 统计
      if ((code.match(reg_2bt) != null)) {
        //二不同号
        for (var k = 0; k < 15; k++) {
          num = arr2bt[k];

          if (code01.search(num) != -1 || code02.search(num) != -1 || code12.search(num) != -1) {
            it = '<p class="t"><span class="active">' + num + '</span></p>';
          } else {
            //统计上次
            if (i == 0) {
              txt = 1;
            } else {
              obj = $('.hmfb-ul').find('.his-line').eq(i - 1).find('p').eq(k + 2);
              txt = obj.find('span').text();

              if (obj.find('span').hasClass('active')) {
                txt = 1;
              } else {
                txt = parseInt(txt) + 1;
              }
            }
            if ($('.hmfb-ul').find('.his-line').eq(i - 1).find('.kj-ing').text().search('等待') != -1) {
              txt = 1;
            }
            it = '<p class="t"><span>' + txt + '</span></p>';
          }
          htm += it;
        }

      } else {  //不是二同号 直接统计
        for (var k = 0; k < 15; k++) {
          //统计上次
          if (i == 0) {
            txt = 1;
          } else {
            obj = $('.hmfb-ul').find('.his-line').eq(i - 1).find('p').eq(k + 2);
            txt = obj.find('span').text();
            if (obj.find('span').hasClass('active')) {
              txt = 1;
            } else {
              txt = parseInt(txt) + 1;
            }
          }
          it = '<p class="t"><span>' + txt + '</span></p>';
          htm += it;
        }
      }
      $('.hmfb-container .hmfb-ul').find('.his-line').eq(i).append(htm);
    }


    if(!localStorage.yldata90){
      var statistics = '<ul class="bottom-hmfb">\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">出现次数</p>\n' +
        '        <p class="t t-12">-</p>\n' +
        '        <p class="t t-13">-</p>\n' +
        '        <p class="t t-14">-</p>\n' +
        '        <p class="t t-15">-</p>\n' +
        '        <p class="t t-16">-</p>\n' +
        '        <p class="t t-23">-</p>\n' +
        '        <p class="t t-24">-</p>\n' +
        '        <p class="t t-25">-</p>\n' +
        '        <p class="t t-26">-</p>\n' +
        '        <p class="t t-34">-</p>\n' +
        '        <p class="t t-35">-</p>\n' +
        '        <p class="t t-36">-</p>\n' +
        '        <p class="t t-45">-</p>\n' +
        '        <p class="t t-46">-</p>\n' +
        '        <p class="t t-56">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">平均遗漏</p>\n' +
        '        <p class="t t-12">-</p>\n' +
        '        <p class="t t-13">-</p>\n' +
        '        <p class="t t-14">-</p>\n' +
        '        <p class="t t-15">-</p>\n' +
        '        <p class="t t-16">-</p>\n' +
        '        <p class="t t-23">-</p>\n' +
        '        <p class="t t-24">-</p>\n' +
        '        <p class="t t-25">-</p>\n' +
        '        <p class="t t-26">-</p>\n' +
        '        <p class="t t-34">-</p>\n' +
        '        <p class="t t-35">-</p>\n' +
        '        <p class="t t-36">-</p>\n' +
        '        <p class="t t-45">-</p>\n' +
        '        <p class="t t-46">-</p>\n' +
        '        <p class="t t-56">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">最大遗漏</p>\n' +
        '        <p class="t t-12">-</p>\n' +
        '        <p class="t t-13">-</p>\n' +
        '        <p class="t t-14">-</p>\n' +
        '        <p class="t t-15">-</p>\n' +
        '        <p class="t t-16">-</p>\n' +
        '        <p class="t t-23">-</p>\n' +
        '        <p class="t t-24">-</p>\n' +
        '        <p class="t t-25">-</p>\n' +
        '        <p class="t t-26">-</p>\n' +
        '        <p class="t t-34">-</p>\n' +
        '        <p class="t t-35">-</p>\n' +
        '        <p class="t t-36">-</p>\n' +
        '        <p class="t t-45">-</p>\n' +
        '        <p class="t t-46">-</p>\n' +
        '        <p class="t t-56">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">当前遗漏</p>\n' +
        '        <p class="t t-12">-</p>\n' +
        '        <p class="t t-13">-</p>\n' +
        '        <p class="t t-14">-</p>\n' +
        '        <p class="t t-15">-</p>\n' +
        '        <p class="t t-16">-</p>\n' +
        '        <p class="t t-23">-</p>\n' +
        '        <p class="t t-24">-</p>\n' +
        '        <p class="t t-25">-</p>\n' +
        '        <p class="t t-26">-</p>\n' +
        '        <p class="t t-34">-</p>\n' +
        '        <p class="t t-35">-</p>\n' +
        '        <p class="t t-36">-</p>\n' +
        '        <p class="t t-45">-</p>\n' +
        '        <p class="t t-46">-</p>\n' +
        '        <p class="t t-56">-</p>\n' +
        '      </li>\n' +
        '    </ul>';
      $('.hmfb-container').append(statistics);
      return;
    }



    var lr90 = JSON.parse(localStorage.yldata90).k3ebth;
    var statistics = '<ul class="bottom-hmfb">\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">出现次数</p>\n' +
      '        <p class="t t-12">' + lr90['hot']['ebth']['12'] + '</p>\n' +
      '        <p class="t t-13">' + lr90['hot']['ebth']['13'] + '</p>\n' +
      '        <p class="t t-14">' + lr90['hot']['ebth']['14'] + '</p>\n' +
      '        <p class="t t-15">' + lr90['hot']['ebth']['15'] + '</p>\n' +
      '        <p class="t t-16">' + lr90['hot']['ebth']['16'] + '</p>\n' +
      '        <p class="t t-23">' + lr90['hot']['ebth']['23'] + '</p>\n' +
      '        <p class="t t-24">' + lr90['hot']['ebth']['24'] + '</p>\n' +
      '        <p class="t t-25">' + lr90['hot']['ebth']['25'] + '</p>\n' +
      '        <p class="t t-26">' + lr90['hot']['ebth']['26'] + '</p>\n' +
      '        <p class="t t-34">' + lr90['hot']['ebth']['34'] + '</p>\n' +
      '        <p class="t t-35">' + lr90['hot']['ebth']['35'] + '</p>\n' +
      '        <p class="t t-36">' + lr90['hot']['ebth']['36'] + '</p>\n' +
      '        <p class="t t-45">' + lr90['hot']['ebth']['45'] + '</p>\n' +
      '        <p class="t t-46">' + lr90['hot']['ebth']['46'] + '</p>\n' +
      '        <p class="t t-56">' + lr90['hot']['ebth']['56'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">平均遗漏</p>\n' +
      '        <p class="t t-12">' + lr90['average']['ebth']['12'] + '</p>\n' +
      '        <p class="t t-13">' + lr90['average']['ebth']['13'] + '</p>\n' +
      '        <p class="t t-14">' + lr90['average']['ebth']['14'] + '</p>\n' +
      '        <p class="t t-15">' + lr90['average']['ebth']['15'] + '</p>\n' +
      '        <p class="t t-16">' + lr90['average']['ebth']['16'] + '</p>\n' +
      '        <p class="t t-23">' + lr90['average']['ebth']['23'] + '</p>\n' +
      '        <p class="t t-24">' + lr90['average']['ebth']['24'] + '</p>\n' +
      '        <p class="t t-25">' + lr90['average']['ebth']['25'] + '</p>\n' +
      '        <p class="t t-26">' + lr90['average']['ebth']['26'] + '</p>\n' +
      '        <p class="t t-34">' + lr90['average']['ebth']['34'] + '</p>\n' +
      '        <p class="t t-35">' + lr90['average']['ebth']['35'] + '</p>\n' +
      '        <p class="t t-36">' + lr90['average']['ebth']['36'] + '</p>\n' +
      '        <p class="t t-45">' + lr90['average']['ebth']['45'] + '</p>\n' +
      '        <p class="t t-46">' + lr90['average']['ebth']['46'] + '</p>\n' +
      '        <p class="t t-56">' + lr90['average']['ebth']['56'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">最大遗漏</p>\n' +
      '        <p class="t t-12">' + lr90['max']['ebth']['12'] + '</p>\n' +
      '        <p class="t t-13">' + lr90['max']['ebth']['13'] + '</p>\n' +
      '        <p class="t t-14">' + lr90['max']['ebth']['14'] + '</p>\n' +
      '        <p class="t t-15">' + lr90['max']['ebth']['15'] + '</p>\n' +
      '        <p class="t t-16">' + lr90['max']['ebth']['16'] + '</p>\n' +
      '        <p class="t t-23">' + lr90['max']['ebth']['23'] + '</p>\n' +
      '        <p class="t t-24">' + lr90['max']['ebth']['24'] + '</p>\n' +
      '        <p class="t t-25">' + lr90['max']['ebth']['25'] + '</p>\n' +
      '        <p class="t t-26">' + lr90['max']['ebth']['26'] + '</p>\n' +
      '        <p class="t t-34">' + lr90['max']['ebth']['34'] + '</p>\n' +
      '        <p class="t t-35">' + lr90['max']['ebth']['35'] + '</p>\n' +
      '        <p class="t t-36">' + lr90['max']['ebth']['36'] + '</p>\n' +
      '        <p class="t t-45">' + lr90['max']['ebth']['45'] + '</p>\n' +
      '        <p class="t t-46">' + lr90['max']['ebth']['46'] + '</p>\n' +
      '        <p class="t t-56">' + lr90['max']['ebth']['56'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">当前遗漏</p>\n' +
      '        <p class="t t-12">' + lr90['current']['ebth']['12'] + '</p>\n' +
      '        <p class="t t-13">' + lr90['current']['ebth']['13'] + '</p>\n' +
      '        <p class="t t-14">' + lr90['current']['ebth']['14'] + '</p>\n' +
      '        <p class="t t-15">' + lr90['current']['ebth']['15'] + '</p>\n' +
      '        <p class="t t-16">' + lr90['current']['ebth']['16'] + '</p>\n' +
      '        <p class="t t-23">' + lr90['current']['ebth']['23'] + '</p>\n' +
      '        <p class="t t-24">' + lr90['current']['ebth']['24'] + '</p>\n' +
      '        <p class="t t-25">' + lr90['current']['ebth']['25'] + '</p>\n' +
      '        <p class="t t-26">' + lr90['current']['ebth']['26'] + '</p>\n' +
      '        <p class="t t-34">' + lr90['current']['ebth']['34'] + '</p>\n' +
      '        <p class="t t-35">' + lr90['current']['ebth']['35'] + '</p>\n' +
      '        <p class="t t-36">' + lr90['current']['ebth']['36'] + '</p>\n' +
      '        <p class="t t-45">' + lr90['current']['ebth']['45'] + '</p>\n' +
      '        <p class="t t-46">' + lr90['current']['ebth']['46'] + '</p>\n' +
      '        <p class="t t-56">' + lr90['current']['ebth']['56'] + '</p>\n' +
      '      </li>\n' +
      '    </ul>';

    $('.hmfb-container').append(statistics);

  }

  createHmfbContent() {

    //分 二同号 和二不同号
    var trend = $('.trend-content'), htm = '', item;
    trend.append(Tpl.hmfb_erth_con_tpl);

    var arr = JSON.parse(localStorage.hisissue)//.reverse();
    var code0, code1, code2, item, code, codestr, reg_3t, reg_2t;
    for (var i = 0; i < arr.length; i++) {
      code = arr[i].code;
      if (code == '') {
        item = '<li class="his-line">\n' +
          '        <p class="t-issue">' + arr[i].number.slice(6) + '期</p>\n' +
          '        <p class="kj-ing" style="width: 85vw;">等待开奖...</p>\n' +
          '      </li>';
        $('.hmfb-container .hmfb-ul').append(item);
        continue;
      } else {
        code0 = code.split('')[0];
        code1 = code.split('')[1];
        code2 = code.split('')[2];
        codestr = code0 + ' ' + code1 + ' ' + code2;
        item = '<li class="his-line">\n' +
          '      <p class="t-issue">' + arr[i].number.slice(6) + '期</p>\n' +
          '      <p class="t-kjh">' + codestr + '</p>\n' +
          '      </li>';

        $('.hmfb-container .hmfb-ul').append(item);
      }

      //判断号码类型
      reg_2t = /(\w)\1/g;
      // 二同号
      var it, num, htm = '', txt, obj;

      //1 判断是否二同号
      //2 是二同号 --》   对应for 循环时候就 active属性
      //3 不是二同号 --》 对应for 循环 直接 统计

      if ((code.match(reg_2t) != null) && (code0 != code2)) {
        //二同号
        for (var k = 0; k < 6; k++) {
          num = k + 1;
          if (num == code1) {
            it = '<p class="t"><span class="active">' + num + num + '</span></p>';
          } else {
            //统计上次
            if (i == 0) {
              txt = 1;
            } else {
              obj = $('.hmfb-ul').find('.his-line').eq(i - 1).find('p').eq(k + 2);
              txt = obj.find('span').text();

              if (obj.find('span').hasClass('active')) {
                txt = 1;
              } else {
                txt = parseInt(txt) + 1;
              }
              if ($('.hmfb-ul').find('.his-line').eq(i - 1).find('.kj-ing').text().search('等待') != -1) {
                txt = 1;
              }
            }
            it = '<p class="t"><span>' + txt + '</span></p>';
          }
          htm += it;
        }
      } else {  //不是二同号 直接统计
        for (var k = 0; k < 6; k++) {
          //统计上次
          if (i == 0) {
            txt = 1;
          } else {
            obj = $('.hmfb-ul').find('.his-line').eq(i - 1).find('p').eq(k + 2);
            txt = obj.find('span').text();
            if (obj.find('span').hasClass('active')) {
              txt = 1;
            } else {
              txt = parseInt(txt) + 1;
            }
            if ($('.hmfb-ul').find('.his-line').eq(i - 1).find('.kj-ing').text().search('等待') != -1) {
              txt = 1;
            }
          }
          it = '<p class="t"><span>' + txt + '</span></p>';
          htm += it;
        }
      }
      $('.hmfb-container .hmfb-ul').find('.his-line').eq(i).append(htm);
    }

    if(!localStorage.yldata90){
      var statistics = '<ul class="bottom-hmfb">\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">出现次数</p>\n' +
        '        <p class="t-1">-</p>\n' +
        '        <p class="t-2">-</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">平均遗漏</p>\n' +
        '        <p class="t-1">-</p>\n' +
        '        <p class="t-2">-</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">最大遗漏</p>\n' +
        '        <p class="t-1">-</p>\n' +
        '        <p class="t-2">-</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">当前遗漏</p>\n' +
        '        <p class="t-1">-</p>\n' +
        '        <p class="t-2">-</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '      </li>\n' +
        '    </ul>';

      $('.hmfb-container').append(statistics);
      return;

    }


    var lr90 = JSON.parse(localStorage.yldata90).k3eth;
    var statistics = '<ul class="bottom-hmfb">\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">出现次数</p>\n' +
      '        <p class="t-1">' + lr90['hot']['eth']['11'] + '</p>\n' +
      '        <p class="t-2">' + lr90['hot']['eth']['22'] + '</p>\n' +
      '        <p class="t-3">' + lr90['hot']['eth']['33'] + '</p>\n' +
      '        <p class="t-4">' + lr90['hot']['eth']['44'] + '</p>\n' +
      '        <p class="t-5">' + lr90['hot']['eth']['55'] + '</p>\n' +
      '        <p class="t-6">' + lr90['hot']['eth']['66'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">平均遗漏</p>\n' +
      '        <p class="t-1">' + lr90['average']['eth']['11'] + '</p>\n' +
      '        <p class="t-2">' + lr90['average']['eth']['22'] + '</p>\n' +
      '        <p class="t-3">' + lr90['average']['eth']['33'] + '</p>\n' +
      '        <p class="t-4">' + lr90['average']['eth']['44'] + '</p>\n' +
      '        <p class="t-5">' + lr90['average']['eth']['55'] + '</p>\n' +
      '        <p class="t-6">' + lr90['average']['eth']['66'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">最大遗漏</p>\n' +
      '        <p class="t-1">' + lr90['max']['eth']['11'] + '</p>\n' +
      '        <p class="t-2">' + lr90['max']['eth']['22'] + '</p>\n' +
      '        <p class="t-3">' + lr90['max']['eth']['33'] + '</p>\n' +
      '        <p class="t-4">' + lr90['max']['eth']['44'] + '</p>\n' +
      '        <p class="t-5">' + lr90['max']['eth']['55'] + '</p>\n' +
      '        <p class="t-6">' + lr90['max']['eth']['66'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">当前遗漏</p>\n' +
      '        <p class="t-1">' + lr90['current']['eth']['11'] + '</p>\n' +
      '        <p class="t-2">' + lr90['current']['eth']['22'] + '</p>\n' +
      '        <p class="t-3">' + lr90['current']['eth']['33'] + '</p>\n' +
      '        <p class="t-4">' + lr90['current']['eth']['44'] + '</p>\n' +
      '        <p class="t-5">' + lr90['current']['eth']['55'] + '</p>\n' +
      '        <p class="t-6">' + lr90['current']['eth']['66'] + '</p>\n' +
      '      </li>\n' +
      '    </ul>';

    $('.hmfb-container').append(statistics);

  }


  //和值，三不同，二不同，三连，单挑
  calculateHZMax(lr30) {
    var arr = [];
    for (var i = 3; i <= 18; i++) {
      arr.push(lr30[i]);
    }
    return Math.max(...arr);
  }

  calculate3btMax(lr30) {

    var inxarr = [123, 124, 125, 126, 134, 135, 136, 145, 146, 156, 234, 235, 236, 245, 246, 256, 345, 346, 356, 456]
    var arr = [];
    for (var i = 0; i < inxarr.length; i++) {
      arr.push(lr30[inxarr[i]]);
    }
    return Math.max(...arr);
  }

  calculate2btMax(lr30) {

    var inxarr = [12, 13, 14, 15, 16, 23, 24, 25, 26, 34, 35, 36, 45, 46, 56];
    var arr = [];
    for (var i = 0; i < inxarr.length; i++) {
      arr.push(lr30[inxarr[i]]);
    }
    return Math.max(...arr);
  }

  calculateDTYSMax(lr30) {

    var inxarr = [1, 2, 3, 4, 5, 6];
    var arr = [];
    for (var i = 0; i < inxarr.length; i++) {
      arr.push(lr30[inxarr[i]]);
    }
    return Math.max(...arr);
  }

  createLrContent() {
    let that = this;
    // 和值 ， 三不同 ， 二不同 ，单挑
    // 3-18 ， 1-6  ，1-6   ，1-6   遗漏 30 期
    var title = $('page-kstrend .wanfa').text();
    var lr30 = [], lr60 = [], lr90 = [], ylarr = [];
    var trend = $('.trend-content'), htm = '', item;
    var lr30_max, lr60_max, lr90_max, ylarr_max, hot;
    trend.append(Tpl.lr_con_tpl);

    if(!localStorage.yldata30||!localStorage.yldata60||!localStorage.yldata90){
      alert('没有数据');
      return;
    }

    switch (title) {
      case '和值':
        lr30  = JSON.parse(localStorage.yldata30).hz.hot;
        lr60  = JSON.parse(localStorage.yldata60).hz.hot;
        lr90  = JSON.parse(localStorage.yldata90).hz.hot;
        ylarr = JSON.parse(localStorage.yldata90).hz.current;
        hot = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        // console.log('lr30====' + JSON.stringify(lr30));

        lr30_max = that.calculateHZMax(lr30);
        lr60_max = that.calculateHZMax(lr60);
        lr90_max = that.calculateHZMax(lr90);
        ylarr_max = that.calculateHZMax(ylarr);

        break;
      case '三不同号':

        lr30 = JSON.parse(localStorage.yldata30).k3sbth.hot;
        lr60 = JSON.parse(localStorage.yldata60).k3sbth.hot;
        lr90 = JSON.parse(localStorage.yldata90).k3sbth.hot;
        ylarr = JSON.parse(localStorage.yldata90).k3sbth.current;
        hot = [123, 124, 125, 126, 134, 135, 136, 145, 146, 156, 234, 235, 236, 245, 246, 256, 345, 346, 356, 456];
        lr30_max = that.calculate3btMax(lr30);
        lr60_max = that.calculate3btMax(lr60);
        lr90_max = that.calculate3btMax(lr90);
        ylarr_max = that.calculate3btMax(ylarr);

        break;
      case '二不同号':
        lr30 = JSON.parse(localStorage.yldata30).k3ebth.hot;
        lr60 = JSON.parse(localStorage.yldata60).k3ebth.hot;
        lr90 = JSON.parse(localStorage.yldata90).k3ebth.hot;
        ylarr = JSON.parse(localStorage.yldata90).k3ebth.current;
        hot = [12, 13, 14, 15, 16, 23, 24, 25, 26, 34, 35, 36, 45, 46, 56];
        lr30_max = that.calculate2btMax(lr30);
        lr60_max = that.calculate2btMax(lr60);
        lr90_max = that.calculate2btMax(lr90);
        ylarr_max = that.calculate2btMax(ylarr);

        break;
      case '单挑一骰':
        lr30 = JSON.parse(localStorage.yldata30).k3dtys.hot;
        lr60 = JSON.parse(localStorage.yldata60).k3dtys.hot;
        lr90 = JSON.parse(localStorage.yldata90).k3dtys.hot;
        ylarr = JSON.parse(localStorage.yldata90).k3dtys.current;
        hot = [1, 2, 3, 4, 5, 6];
        lr30_max = that.calculateDTYSMax(lr30);
        lr60_max = that.calculateDTYSMax(lr60);
        lr90_max = that.calculateDTYSMax(lr90);
        ylarr_max = that.calculateDTYSMax(ylarr);

        break;
    }

    if (title == '二不同号') {

      for (var i = 0; i < hot.length; i++) {
        var inx = hot[i];
        htm += '<li class="his-line"><p class="t-hz">' + inx + '</p>\n';
        if (lr30[inx] == lr30_max) {
          htm += '<p class="t-30lr hot">' + lr30['ebth'][inx] + '</p>\n';
        } else {
          htm += '<p class="t-30lr">' + lr30['ebth'][inx] + '</p>\n';
        }
        if (lr60[inx] == lr60_max) {
          htm += '<p class="t-60lr hot">' + lr60['ebth'][inx] + '</p>\n';
        } else {
          htm += '<p class="t-60lr">' + lr60['ebth'][inx] + '</p>\n';
        }
        if (lr90[inx] == lr90_max) {
          htm += '<p class="t-100lr hot">' + lr90['ebth'][inx] + '</p>\n';
        } else {
          htm += '<p class="t-100lr">' + lr90['ebth'][inx] + '</p>\n';
        }
        if (ylarr[inx] == ylarr_max) {
          htm += '<p class="t-yl hot">' + ylarr['ebth'][inx] + '</p>\n';
        } else {
          htm += '<p class="t-yl">' + ylarr['ebth'][inx] + '</p>\n';
        }
        htm += '</li>';
      }
    } else {

      for (var i = 0; i < hot.length; i++) {
        var inx = hot[i];
        htm += '<li class="his-line"><p class="t-hz">' + inx + '</p>\n';
        if (lr30[inx] == lr30_max) {
          htm += '<p class="t-30lr hot">' + lr30[inx] + '</p>\n';
        } else {
          htm += '<p class="t-30lr">' + lr30[inx] + '</p>\n';
        }
        if (lr60[inx] == lr60_max) {
          htm += '<p class="t-60lr hot">' + lr60[inx] + '</p>\n';
        } else {
          htm += '<p class="t-60lr">' + lr60[inx] + '</p>\n';
        }
        if (lr90[inx] == lr90_max) {
          htm += '<p class="t-100lr hot">' + lr90[inx] + '</p>\n';
        } else {
          htm += '<p class="t-100lr">' + lr90[inx] + '</p>\n';
        }
        if (ylarr[inx] == ylarr_max) {
          htm += '<p class="t-yl hot">' + ylarr[inx] + '</p>\n';
        } else {
          htm += '<p class="t-yl">' + ylarr[inx] + '</p>\n';
        }
        htm += '</li>';
      }
    }
    trend.find('.lr-ul').html(htm);
  }




  createHzzsContent() {

    var trend = $('.trend-content'), htm = '', item;
    trend.append(Tpl.hz_con_tpl);

    var arr = JSON.parse(localStorage.hisissue)//.reverse();
    var code, code0, code1, code2, codestr, hezhi;
    for (var i = 0; i < arr.length; i++) {

      code = arr[i].code;

      if (code == '') {

        item = '<li class="his-line">\n' +
          '        <p class="t-issue">' + arr[i].number.slice(8) + '期</p>\n' +
          '        <p class="kj-ing" style="width: 85vw;">等待开奖...</p>\n' +
          '      </li>';
        $('.hzzs-container .hzzs-ul').append(item);
        continue;

      } else {


        item = '<li class="his-line">\n' +
          '        <p class="t-issue">' + arr[i].number.slice(8) + '期</p>\n' +
          '      </li>';
        $('.hzzs-container .hzzs-ul').append(item);
        for (var j = 0; j < 16; j++) {
          var it, inx = j + 3, txt;
          code0 = code.split('')[0];
          code1 = code.split('')[1];
          code2 = code.split('')[2];
          codestr = code0 + ' ' + code1 + ' ' + code2;
          hezhi = parseInt(code0) + parseInt(code1) + parseInt(code2);
          if (inx == hezhi) {
            it = '<p class="t-' + inx + '"><span class="t active">' + inx + '</span></p>';
          } else {
            if (i == 0) {
              txt = 1;
            } else {
              //判断上个 球是否 active  如何选中，则1 否则 +1
              var obj = $('.hzzs-ul').find('.his-line').eq(i - 1).find('p').eq(j + 1);
              txt = obj.find('span').text();
              // console.log('上一期 对应球 ===' + txt);
              if (obj.find('span').hasClass('active')) {
                txt = 1;
              } else {
                txt = parseInt(txt) + 1;
              }
              if ($('.hzzs-ul').find('.his-line').eq(i - 1).find('.kj-ing').text().search('等待') != -1) {
                txt = 1;
              }
            }
            it = '<p class="t-' + inx + '"><span class="t">' + txt + '</span></p>';
          }
          $('.hzzs-ul').find('.his-line').eq(i).append(it);

        }

      }
    }

    if(!localStorage.yldata90){
      var statistic = '<ul class="bottom-hzzs">\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">出现次数</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '        <p class="t-7">-</p>\n' +
        '        <p class="t-8">-</p>\n' +
        '        <p class="t-9">-</p>\n' +
        '        <p class="t-10">-</p>\n' +
        '        <p class="t-11">-</p>\n' +
        '        <p class="t-12">-</p>\n' +
        '        <p class="t-13">-</p>\n' +
        '        <p class="t-14">-</p>\n' +
        '        <p class="t-15">-</p>\n' +
        '        <p class="t-16">-</p>\n' +
        '        <p class="t-17">-</p>\n' +
        '        <p class="t-18">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">平均遗漏</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '        <p class="t-7">-</p>\n' +
        '        <p class="t-8">-</p>\n' +
        '        <p class="t-9">-</p>\n' +
        '        <p class="t-10">-</p>\n' +
        '        <p class="t-11">-</p>\n' +
        '        <p class="t-12">-</p>\n' +
        '        <p class="t-13">-</p>\n' +
        '        <p class="t-14">-</p>\n' +
        '        <p class="t-15">-</p>\n' +
        '        <p class="t-16">-</p>\n' +
        '        <p class="t-17">-</p>\n' +
        '        <p class="t-18">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">最大遗漏</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '        <p class="t-7">-</p>\n' +
        '        <p class="t-8">-</p>\n' +
        '        <p class="t-9">-</p>\n' +
        '        <p class="t-10">-</p>\n' +
        '        <p class="t-11">-</p>\n' +
        '        <p class="t-12">-</p>\n' +
        '        <p class="t-13">-</p>\n' +
        '        <p class="t-14">-</p>\n' +
        '        <p class="t-15">-</p>\n' +
        '        <p class="t-16">-</p>\n' +
        '        <p class="t-17">-</p>\n' +
        '        <p class="t-18">-</p>\n' +
        '      </li>\n' +
        '      <li class="his-line">\n' +
        '        <p class="txt">当前遗漏</p>\n' +
        '        <p class="t-3">-</p>\n' +
        '        <p class="t-4">-</p>\n' +
        '        <p class="t-5">-</p>\n' +
        '        <p class="t-6">-</p>\n' +
        '        <p class="t-7">-</p>\n' +
        '        <p class="t-8">-</p>\n' +
        '        <p class="t-9">-</p>\n' +
        '        <p class="t-10">-</p>\n' +
        '        <p class="t-11">-</p>\n' +
        '        <p class="t-12">-</p>\n' +
        '        <p class="t-13">-</p>\n' +
        '        <p class="t-14">-</p>\n' +
        '        <p class="t-15">-</p>\n' +
        '        <p class="t-16">-</p>\n' +
        '        <p class="t-17">-</p>\n' +
        '        <p class="t-18">-</p>\n' +
        '      </li>\n' +
        '    </ul>';
      $('.hzzs-container').append(statistic);
      return;
    }


    //统计要 按照不同的玩法 取数据
    //判断玩法
    var ylarr = [];
    ylarr = JSON.parse(localStorage.yldata90).hz;
    var it;
    // for(var m =0;m<ylarr.length;m++){
    // }
    var statistic = '<ul class="bottom-hzzs">\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">出现次数</p>\n' +
      '        <p class="t-3">' + ylarr['hot']['3'] + '</p>\n' +
      '        <p class="t-4">' + ylarr['hot']['4'] + '</p>\n' +
      '        <p class="t-5">' + ylarr['hot']['5'] + '</p>\n' +
      '        <p class="t-6">' + ylarr['hot']['6'] + '</p>\n' +
      '        <p class="t-7">' + ylarr['hot']['7'] + '</p>\n' +
      '        <p class="t-8">' + ylarr['hot']['8'] + '</p>\n' +
      '        <p class="t-9">' + ylarr['hot']['9'] + '</p>\n' +
      '        <p class="t-10">' + ylarr['hot']['10'] + '</p>\n' +
      '        <p class="t-11">' + ylarr['hot']['11'] + '</p>\n' +
      '        <p class="t-12">' + ylarr['hot']['12'] + '</p>\n' +
      '        <p class="t-13">' + ylarr['hot']['13'] + '</p>\n' +
      '        <p class="t-14">' + ylarr['hot']['14'] + '</p>\n' +
      '        <p class="t-15">' + ylarr['hot']['15'] + '</p>\n' +
      '        <p class="t-16">' + ylarr['hot']['16'] + '</p>\n' +
      '        <p class="t-17">' + ylarr['hot']['17'] + '</p>\n' +
      '        <p class="t-18">' + ylarr['hot']['18'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">平均遗漏</p>\n' +
      '        <p class="t-3">' + ylarr['average']['3'] + '</p>\n' +
      '        <p class="t-4">' + ylarr['average']['4'] + '</p>\n' +
      '        <p class="t-5">' + ylarr['average']['5'] + '</p>\n' +
      '        <p class="t-6">' + ylarr['average']['6'] + '</p>\n' +
      '        <p class="t-7">' + ylarr['average']['7'] + '</p>\n' +
      '        <p class="t-8">' + ylarr['average']['8'] + '</p>\n' +
      '        <p class="t-9">' + ylarr['average']['9'] + '</p>\n' +
      '        <p class="t-10">' + ylarr['average']['10'] + '</p>\n' +
      '        <p class="t-11">' + ylarr['average']['11'] + '</p>\n' +
      '        <p class="t-12">' + ylarr['average']['12'] + '</p>\n' +
      '        <p class="t-13">' + ylarr['average']['13'] + '</p>\n' +
      '        <p class="t-14">' + ylarr['average']['14'] + '</p>\n' +
      '        <p class="t-15">' + ylarr['average']['15'] + '</p>\n' +
      '        <p class="t-16">' + ylarr['average']['16'] + '</p>\n' +
      '        <p class="t-17">' + ylarr['average']['17'] + '</p>\n' +
      '        <p class="t-18">' + ylarr['average']['18'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">最大遗漏</p>\n' +
      '        <p class="t-3">' + ylarr['max']['3'] + '</p>\n' +
      '        <p class="t-4">' + ylarr['max']['4'] + '</p>\n' +
      '        <p class="t-5">' + ylarr['max']['5'] + '</p>\n' +
      '        <p class="t-6">' + ylarr['max']['6'] + '</p>\n' +
      '        <p class="t-7">' + ylarr['max']['7'] + '</p>\n' +
      '        <p class="t-8">' + ylarr['max']['8'] + '</p>\n' +
      '        <p class="t-9">' + ylarr['max']['9'] + '</p>\n' +
      '        <p class="t-10">' + ylarr['max']['10'] + '</p>\n' +
      '        <p class="t-11">' + ylarr['max']['11'] + '</p>\n' +
      '        <p class="t-12">' + ylarr['max']['12'] + '</p>\n' +
      '        <p class="t-13">' + ylarr['max']['13'] + '</p>\n' +
      '        <p class="t-14">' + ylarr['max']['14'] + '</p>\n' +
      '        <p class="t-15">' + ylarr['max']['15'] + '</p>\n' +
      '        <p class="t-16">' + ylarr['max']['16'] + '</p>\n' +
      '        <p class="t-17">' + ylarr['max']['17'] + '</p>\n' +
      '        <p class="t-18">' + ylarr['max']['18'] + '</p>\n' +
      '      </li>\n' +
      '      <li class="his-line">\n' +
      '        <p class="txt">当前遗漏</p>\n' +
      '        <p class="t-3">' + ylarr['current']['3'] + '</p>\n' +
      '        <p class="t-4">' + ylarr['current']['4'] + '</p>\n' +
      '        <p class="t-5">' + ylarr['current']['5'] + '</p>\n' +
      '        <p class="t-6">' + ylarr['current']['6'] + '</p>\n' +
      '        <p class="t-7">' + ylarr['current']['7'] + '</p>\n' +
      '        <p class="t-8">' + ylarr['current']['8'] + '</p>\n' +
      '        <p class="t-9">' + ylarr['current']['9'] + '</p>\n' +
      '        <p class="t-10">' + ylarr['current']['10'] + '</p>\n' +
      '        <p class="t-11">' + ylarr['current']['11'] + '</p>\n' +
      '        <p class="t-12">' + ylarr['current']['12'] + '</p>\n' +
      '        <p class="t-13">' + ylarr['current']['13'] + '</p>\n' +
      '        <p class="t-14">' + ylarr['current']['14'] + '</p>\n' +
      '        <p class="t-15">' + ylarr['current']['15'] + '</p>\n' +
      '        <p class="t-16">' + ylarr['current']['16'] + '</p>\n' +
      '        <p class="t-17">' + ylarr['current']['17'] + '</p>\n' +
      '        <p class="t-18">' + ylarr['current']['18'] + '</p>\n' +
      '      </li>\n' +
      '    </ul>';
    $('.hzzs-container').append(statistic);
  }


}
