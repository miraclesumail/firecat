import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {RestProvider} from '../rest/rest';

import * as $ from 'jquery';

import { LoadingController } from 'ionic-angular';

@Injectable()
export class BaseToolProvider {
  timeIddd;
  color = {
    red: ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'],
    blue: ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48']
  };

  constructor(public http: HttpClient,
              public rest: RestProvider,
              public loading: LoadingController) {

  }

  showLoading() {
    console.log(3333333)
    const loader = this.loading.create({});
    loader.present();

  };


  requestPlayData(idstr, lottery) {

    // this.showLoading();

    // var userInfo = JSON.parse(localStorage.userInfo);
    // var url = '/api-lotteries-h5/load-data/2/' + idstr + '?_t=' + userInfo.auth_token;

    var url,data;
    if(localStorage.userInfo){
      data = JSON.parse(localStorage.userInfo);
      url = '/api-lotteries-h5/load-data/2/' + idstr + '?_t=' + data.auth_token;
    }else{
      url = '/api-lotteries-h5/load-data/2/' + idstr + '?_t=' ;
    }


    return new Promise((resolve, reject) => {
      this.rest.getUrlReturn(url)
        .subscribe((data) => {
          console.log(data)
          if (data.IsSuccess) {

            console.log(data)
            $('.play-list').html('');
            $('.after-select').html('');
            var totalArr = data.data.game_ways;
            for (var i = 0; i < totalArr.length; i++) {

              var name_en = totalArr[i].name_en;
              var htm = '<li><i class="play-black">' + totalArr[i].name_cn + '</i><input type="hidden" value=""></input></li>';
              $('.play-list').append(htm);
              $('.play-list .play-black').eq(i).next().val(name_en);
              var aftercon = '<div class="after-con"></div>';
              $('.after-select').append(aftercon);
              for (var j = 0; j < totalArr[i].children.length; j++) {

                var len = totalArr[i].children[j].name_cn.length + 1;
                var cellhtml = '<div class="after-list clear after-list-' + len + '"><div class="after-l"><i class="after-text">' + totalArr[i].children[j].name_cn + ':</i><input type="hidden" value="" id=""></input></div><ul class="lastchina"></ul></div>';
                $('.after-con').eq(i).append(cellhtml);
                $('.after-con').eq(i).find('.after-list').eq(j).find(".after-text").next().val(totalArr[i].children[j].name_en);
                for (var x = 0; x < totalArr[i].children[j].children.length; x++) {

                  // var ballhtml = '<li><i class="play-black play-opacity" data-index="" >' + totalArr[i].children[j].children[x].name_cn + '</i><input type="hidden" value="" id=""></input></li>';
                  var ballhtml = '<li><i class="play-black play-opacity" data-index="" >' + totalArr[i].children[j].children[x].name_cn + '</i></li>';
                  $('.after-con').eq(i).find('.after-list .lastchina').eq(j).append(ballhtml);
                  var name_en = totalArr[i].children[j].children[x].name_en;
                  var price = totalArr[i].children[j].children[x].price;
                  var bet_note = totalArr[i].children[j].children[x].bet_note;
                  var bonus_note = totalArr[i].children[j].children[x].bonus_note;
                  var max_multiple = totalArr[i].children[j].children[x].max_multiple;
                  var is_enable_extra = totalArr[i].children[j].children[x].is_enable_extra;
                  var play_id = totalArr[i].children[j].children[x].id;
                  $('.after-con').eq(i).find('.after-list .lastchina').eq(j).find('.play-black').eq(x).attr('data-index', play_id + '|' + name_en + '|' + price + '|' + bet_note + '|' + bonus_note + '|' + max_multiple + '|' + is_enable_extra);
                  // $('.after-con').eq(i).find('.after-list .lastchina').eq(j).find('.play-black').eq(x).next().val(name_en + '|' + price + '|' + bet_note + '|' + bonus_note + '|' + max_multiple + '|' + is_enable_extra);
                  // $('.after-con').eq(i).find('.after-list .lastchina').eq(j).find('input').eq(x).attr('id', totalArr[i].children[j].children[x].id);

                }
              }
            }
            this.setDefultPlayedUi(lottery);
            if (lottery.search('6') != -1) {
              localStorage.ani = JSON.stringify(data.data.game_ways[3].children[0].children[0].bet_number);
              // this.initViewData();
            }
            if(lottery.search('6') != -1){
              resolve(data.data['game_ways']);
            }else{
              resolve(data.data['game_ways'][0].children[0].children);
            }

          } else {
            // reject();
          }
          // this.requestJiangQiData(idstr, lottery, 'play');
        });

    })
  }


  requestJiangQiData(idstr, lottery, from) {

    var data,url;
    if(localStorage.userInfo){
      data = JSON.parse(localStorage.userInfo);
      url = '/api-lotteries-h5/load-data/1/' + idstr + '?_t=' + data.auth_token;
    }else{
      url = '/api-lotteries-h5/load-data/1/' + idstr + '?_t='
    }

    // var url = '/api-lotteries-h5/load-data/1/' + idstr + '?_t=' + data.auth_token;
    return new Promise((resolve, reject) => {

      // this.rest.postUrlReturn(url, {_token: data.token})
      this.rest.getUrlReturn(url)
        .subscribe((data) => {
          console.log('data==='+JSON.stringify(data));
          if (data.IsSuccess) {

            localStorage.trace_max_times = data.data.trace_max_times;
            localStorage.subtract_prize_group = data.data.subtract_prize_group;
            localStorage.bet_min_prize_group = data.data.bet_min_prize_group;
            localStorage.bet_max_prize_group = data.data.bet_max_prize_group;
            localStorage.user_prize_group = data.data.user_prize_group;
            localStorage.series_amount = data.data.series_amount;
            var currentstr = data.data.current_number;
            var last_number = data.data.last_number;
            var lottery_balls = data.data.lottery_balls;

            localStorage.nextDate = currentstr;

            // var part2 = parseInt(currentstr.substr(currentstr.length - 2)) + 1;
            // var nextDate = currentstr.substr(0, currentstr.length - 2) + part2;
            // var title = localStorage.nameStr;
            // data.data.lottery_balls

            if (from == 'trend') {
              $('.ks-nextissue').text(currentstr);
            } else if(from == 'basket'){
              $('.basket-issue').text('距'+currentstr+'期截止');
            } else { //play
              $('.currentdate').text(last_number + '期开奖');
              $('.nextdate').text(currentstr + '截止:');
              if (lottery.search('3') != -1) {
                // $('.currentdate').text(currentstr + '期开奖:'+ data.data.lottery_balls );
                $('.currentdate').append('<img src="./assets/imgs/ks/sanjiao.png" class="dot-bottom"/>');
                if(data.data.lottery_balls==null){
                  data.data.lottery_balls ='123';
                }
                var htm = '', s = data.data.lottery_balls.split("");
                for (var i = 0; i < s.length; i++) {
                  var item = '<i class="saizi saizi-' + s[i] + '"></i>';
                  htm = htm + item;
                }
                $('.k3-result').html(htm);

              } else if (lottery.search('6') != -1) {

                var s = data.data.lottery_balls.split(" ");
                var score = 0;
                var ani = JSON.parse(localStorage.ani);
                for (var i = 0; i < s.length; i++) {
                  var clas, tt;
                  var v = s[i];
                  if (this.color.red.indexOf(v) != -1) {
                    clas = 'red-ball';
                  } else if (this.color.blue.indexOf(v) != -1) {
                    clas = 'blue-ball';
                  } else {
                    clas = 'green-ball';
                  }
                  v = parseInt(s[i]);
                  if (ani.gou.indexOf(v) != -1) {
                    tt = '狗';
                  } else if (ani.hou.indexOf(v) != -1) {
                    tt = '猴';
                  } else if (ani.hu.indexOf(v) != -1) {
                    tt = '虎';
                  } else if (ani.ji.indexOf(v) != -1) {
                    tt = '鸡';
                  } else if (ani.long.indexOf(v) != -1) {
                    tt = '龙';
                  } else if (ani.ma.indexOf(v) != -1) {
                    tt = '马';
                  } else if (ani.niu.indexOf(v) != -1) {
                    tt = '牛';
                  } else if (ani.zhu.indexOf(v) != -1) {
                    tt = '猪';
                  } else if (ani.she.indexOf(v) != -1) {
                    tt = '蛇';
                  } else if (ani.shu.indexOf(v) != -1) {
                    tt = '鼠';
                  } else if (ani.tu.indexOf(v) != -1) {
                    tt = '兔';
                  } else if (ani.yang.indexOf(v) != -1) {
                    tt = '羊';
                  }
                  score = score + parseInt(s[i]);
                  var item = '<span class="' + clas + '">' + s[i] + '</span><p>' + tt + '</p>';
                  $('.status-box').find('.status-number').eq(i).html(item);
                  $('#score').text(score);
                }

              }
            }
            resolve();
            console.log('this.timeIddd111=='+this.timeIddd);
            clearInterval(this.timeIddd);
            console.log('this.timeIddd222=='+this.timeIddd);
            this.cutDownTime(data.data.current_time, data.data.current_number_time, from);
          }
        });
    })
  }



  cutDownTime(a, b, from) {

    console.log('from===='+from);
    let _this = this;
    var totalSec = this.getRemainTime(a, b);
    var ttt = totalSec;
    this.timeIddd = setInterval(function () {
      if (totalSec <= 0) {
        //--奖期
        _this.requestJiangQiData('21', '3', from);
        clearInterval(_this.timeIddd);
        return;
      }
      totalSec--;
      var hour = Math.floor(totalSec / 3600);
      var minute = Math.floor(totalSec % 3600 / 60);
      var sec = totalSec % 60;

      var hourstr,minutestr,secstr;
      hourstr = hour;minutestr = minute;secstr = sec;
      if(hour<10){
        hourstr ='0'+hour;
      }
      if(minute<10){
        minutestr ='0'+minute;
      }
      if( sec<10){
        secstr ='0'+sec;
      }
      if(from=='trend'){
        $('.ks-cuttime').text(minutestr+':'+secstr);
      }else if(from=='basket'){
        $('.basket-time').text(minutestr+':'+secstr);
      }else{

        $('.r-time span').eq(0).text(hourstr);
        $('.r-time span').eq(1).text(minutestr);
        $('.r-time span').eq(2).text(secstr);
        var scale = totalSec / ttt * 100;
        $('.time-bar').css('width', scale + '%');
      }

    }, 1000)
  }

  setDefultPlayedUi(title) {

    var n, m, k;
    if (title.search("时") != -1 || title.search("分彩") != -1 || title.search("60秒") != -1) {
      n = 4, m = 0, k = 0;
    } else if (title.search("11") != -1) {
      n = 0, m = 0, k = 0;
    } else if (title.search("10") != -1) {
      n = 2, m = 0, k = 0;
    } else if (title.search("3") != -1) {
      n = 0, m = 0, k = 0;
      $('.after-l').addClass('hide');
      $('.play-list li').addClass('hide');
    } else if (title.search("6") != -1) {
      n = 0, m = 0, k = 0;
    }
    $('.play-list .play-black').eq(n).addClass('play-yellow');
    $('.after-select .after-con').eq(n).addClass('active');
    $('.after-select .active').find('.after-list').eq(m).find('.play-black').eq(k).addClass('play-yellow');

  }

  getRemainTime(startime, endtime) {
    var a = new Date(startime.replace(/-/g, '/')).getTime();
    var b = new Date(endtime.replace(/-/g, '/')).getTime();
    var t = (b - a) / 1000;
    return t;
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


  getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  };

  getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }
    var angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }
    return result;
  }

  initHisBox(idstr) {
    let _this = this;
    var startx, starty;
    document.getElementById(idstr).addEventListener("touchstart",
      function (e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
      }, true);
    document.getElementById(idstr).addEventListener("touchend",
      function (e) {
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var kscroll = $('#ks-content .scroll-content');
        var lscroll = $('.lhc-content-child .scroll-content');
        var direction = _this.getDirection(startx, starty, endx, endy);
        var len = $('.his-box .his-line').length;
        var obj = $(".his-box");
        var his = obj.css('height');
        switch (direction) {
          case 0:
            break;
          case 1:
            if (parseInt(his) <= 165) {
              obj.animate({height: "0px"}, 100);
              kscroll.css('overflow', '');
              lscroll.css('overflow', '');
            } else if (parseInt(his) >= 165) {
              obj.stop().animate({height: "165px"}, 100);
              kscroll.css('overflow', 'hidden');
              lscroll.css('overflow', 'hidden');
            }
            break;
          case 2://down

            // console.log('idstr==='+idstr)
            // console.log('his==='+his)
            if(idstr=='ks-content') {
              // console.log('.offset().top==='+$('#ks-content .section.current').offset().top)
              if ($('#ks-content .section.current').offset().top < 95) {
                $(".his-box").stop().animate({height: "0px"}, 0);
                return;
              }
            }else if(idstr=='lhc-content-child') {
              // console.log('.offset().top==='+$('.lhc-content-child .section.active').offset().top)
              if ($('.lhc-content-child .section.active').offset().top < 156) {
                $(".his-box").stop().animate({height: "0px"}, 0);
                return;
              }
            }

            if (obj.css('height') == '0px' && len < 5) {

              var h = len * 28 + 25;
              obj.animate({height: h + 'px'}, 100);
            } else if (obj.css('height') == '0px' && len >= 5) {

              obj.animate({height: "165px"}, 100);
            } else if (parseInt(his) >= 165 && len < 10) {

              var h = 165 + (len - 5) * 28;
              obj.animate({height: h + "px"}, 100);
            } else if (len >= 10) {

              obj.animate({height: "305px"}, 100);
            }
            lscroll.css('overflow', 'hidden');
            kscroll.css('overflow', 'hidden');
            break;
        }
      }, true);
  }

}
