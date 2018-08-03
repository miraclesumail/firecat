import * as $ from 'jquery';

export class KsBasketAction {


  initView() {

    // if(!localStorage.balls){
    //   return;
    // }
    this.loadData();
    this.zhuiJiaJian();
    this.beiJiaJian();
    this.initClick();
    this.initRebate();

    if(!localStorage.balls){
      return;
    }
    this.initMinMultiple();
    this.calculateMoney();
  }

  initClick() {


    let _this = this;
    // $('.clean-all').on('click', function () {
    //   _this.cleanAll();
    // })

    $('.random1').on('click', function () {
      _this.randomMore(1);
    })

    $('.random5').on('click', function () {
      _this.randomMore(5);
    })

    $('.money-btn').on('click', function () {
      // money-drop
      // money-menu
      $('.money-menu').toggleClass('hide');
    })

    $('body').on("click", ".cancel-btn", function () {
      // console.log(333333333)
      $('.basket-pop').remove();
    });
    $('body').on("click", ".offhand-btn.bet-btn", function () {
      // console.log(22222222222)
      localStorage.removeItem("balls");
      $('.buy-list').html("");
      $('#bei input').val(1);
      $('#zhui input').val(1);
      $('.total-con .qi').text(1);
      $('.total-con .zhu').text(1);
      $('.total-con .yuan').text(0);
      $('.basket-pop').remove();
    });
    // $('.cancel-btn').on('click', function () {
    //   console.log(33334543534)
    //    $('.basket-pop').remove();
    // })

    // $('.offhand-btn.bet-btn').on('click', function () {
    //   _this.cleanAll();
    //   $('.basket-pop').remove();
    // })


    $('.win-select').on('click', function () {

      if ($('.win-select input').attr('checked') == 'checked') {
        $('.win-select input').attr('checked', false);
      } else {
        $('.win-select input').attr('checked', true);
      }

      if ($('#zhui_input').val() == 1) {
        $('.win-select input').attr('checked', true);
        $('.zhui_box').attr('checked', true);
      }

    })

  }

  initRebate() {
    var
      min = parseInt(localStorage.bet_min_prize_group),
      max = parseInt(localStorage.user_prize_group),
      umax = parseInt(localStorage.bet_max_prize_group),
      // ugroup = parseInt(localStorage.user_prize_group),
      base = parseInt(localStorage.series_amount),
      list = [],
      num = Math.floor(min / 10) * 10,
      per,
      html = [],
      resultdata = [];
    list.push(min);
    while (num < max) {
      if (num != min) {
        list.push(num);
      }
      num += 10;
    }
    list.push(max);
    $.each(list, function (i) {
      if (this <= umax) {
        resultdata.push(this);
      }
    });
    $.each(resultdata, function (i) {
      per = ((max - this) / base * 100).toFixed(2);
      if (i == 0) {
        html.push('<li>' + (this) + '-' + per + '%</li>');
      } else if (i == resultdata.length - 1) {
        html.push('<li>' + (this) + '-' + per + '%</li>');
      }

    });

    $('.return-point .money-menu').html(html.join(''));
    $('.money-btn-1 i').text($('.return-point .money-menu li').eq(1).text())
    $('.return-point .money-menu li').click(function () {
      $('.money-menu').addClass('hide');
      $('.money-btn-1 i').text($(this).text());
      // var arr = JSON.parse(localStorage.balls);
      // for (var i = 0; i < arr.length; i++) {
      //   arr[i].prize_group = $(this).text().split('-')[0];
      // }
      // localStorage.balls = JSON.stringify(arr);
    });

  }

  /*
   机选
   */
  randomMore(num) {

    let _this = this;
    var wanfa = $('.wanfa').text();
    wanfa = localStorage.wanfa;
    console.log('randomMorewanfa====' + wanfa)
    switch (wanfa) {

      case '和值':
        // Math.floor(Math.random()*(max-min+1)+min); 18-3+1 +3
        if (num == 1) {
          var no = Math.floor(Math.random() * 16 + 3);
          _this.dealWithRandom(no);
        } else {
          for (var i = 0; i < 5; i++) {
            var no = Math.floor(Math.random() * 16 + 3);
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;
      case '三同号':
        if (num == 1) {
          var no = Math.floor(Math.random() * 6 + 1);
          no = no * 100 + no * 10 + no;
          _this.dealWithRandom(no);
        } else {
          for (var i = 0; i < 5; i++) {
            var no = Math.floor(Math.random() * 6 + 1);
            no = no * 100 + no * 10 + no;
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;

      case '二同号':
        if (num == 1) {

          var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
          var c = [b[0], b[1]].sort();
          no = c[0] * 100 + c[0] * 10 + c[1];
          _this.dealWithRandom(no);
        } else {
          for (var i = 0; i < 5; i++) {
            var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
            var c = [b[0], b[1]].sort();
            no = c[0] * 100 + c[0] * 10 + c[1];
            _this.dealWithRandom(no);

          }
        }
        _this.loadData();
        break;

      case '三不同号':
        if (num == 1) {
          var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
          var c = [b[0], b[1], b[2]].sort();
          no = c[0] * 100 + c[1] * 10 + c[2];
          _this.dealWithRandom(no);
        } else {
          for (var i = 0; i < 5; i++) {
            var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
            var c = [b[0], b[1], b[2]].sort();
            no = c[0] * 100 + c[1] * 10 + c[2];
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;
      case '二不同号':
        if (num == 1) {

          var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
          var c = [b[0], b[1]].sort();
          no = c[0] * 10 + c[1];
          _this.dealWithRandom(no);
        } else {

          for (var i = 0; i < 5; i++) {
            var b = _this.shuffle([1, 2, 3, 4, 5, 6]);
            var c = [b[0], b[1]].sort();
            no = c[0] * 10 + c[1];
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;
      case '三连号':
        if (num == 1) {
          var no = Math.floor(Math.random() * 4 + 1);
          var no = no * 100 + (no + 1) * 10 + (no + 2);
          _this.dealWithRandom(no);
        } else {
          for (var i = 0; i < 5; i++) {
            var no = Math.floor(Math.random() * 4 + 1);
            var no = no * 100 + (no + 1) * 10 + (no + 2);
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;

      case '单挑一骰':
        if (num == 1) {
          var no = Math.floor(Math.random() * 6 + 1);
          _this.dealWithRandom(no);
        } else {
          for (var i = 0; i < 5; i++) {
            var no = Math.floor(Math.random() * 6 + 1);
            _this.dealWithRandom(no);
          }
        }
        _this.loadData();
        break;
    }
    _this.initMinMultiple();
    _this.calculateMoney();

  }


  dealWithRandom(no) {

    console.log('随机数no====' + no);

    let _this = this;
    let ballStr = no;
    let wanfa = $('.wanfa').text();
    console.log('localStorage.wanfa====' + localStorage.wanfa);

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
        "num": 1,
        "moneyunit": localStorage.moneyunit,
        "position": [],
        "multiple": 1,
        "onePrice": 2,
        "prize_group": localStorage.bet_max_prize_group,
        "max_multiple":localStorage.max_multiple,
        "wanfa": wanfa,
        "price": 2 * localStorage.moneyunit,
      };
    let balls = [];
    let ballsitem = "";
    let ball = localStorage.balls;
    if (ball == null) {
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
      var moneyunit = balldata[i].moneyunit;
      var str = balldata[i].ball;
      if (str == ballstr && moneyunit==betinfo.moneyunit) {
        j++;
        balldata[i].multiple = parseInt(balldata[i].multiple) + parseInt(betinfo.multiple);
        balldata[i].price += betinfo.price;
      }
    }
    var result = {j: j, data: balldata};
    return result;
  }

  cleanAll() {

    console.log('000000000')
    localStorage.removeItem("balls");
    $('.buy-list').html("");
    $('#bei input').val(1);
    $('#zhui input').val(1);
    $('.total-con .qi').text(1);
    $('.total-con .zhu').text(1);
    $('.total-con .yuan').text(0);
  }



  loadData() {

    let list = "";
    if (!localStorage.balls){
      $('.buy-list').html('');
      return;
    }

    let arr = JSON.parse(localStorage.balls);
    console.log(arr);
    var total_multiple = $('#bei_input').val();

    for (let i = 0; i < arr.length; i++) {

      let mutiple = parseInt(total_multiple) * parseInt(arr[i].multiple);
      arr[i].multiple = mutiple;
      // let price = parseInt(arr[i].num) * 2;
      let price = mutiple * parseInt(arr[i].onePrice) * parseInt(arr[i].num) * parseFloat(arr[i].moneyunit);
      arr[i].price = price.toFixed(2);
      let item = '<li class="buy-li clear">\n' +
        '        <div class="li-close">\n' +
        '         <ion-icon name="ios-close-circle-outline" role="img" class="icon icon-ios ion-ios-close-circle-outline" aria-label="close circle-outline" ng-reflect-name="ios-close-circle-outline"></ion-icon>' +
        '        </div>\n' +
        '        <div class="buy-con">\n' +
        '          <div class="number">\n' +
        '            <i style="color: #FE5600;width: auto; display: inline;">\n' +
        '              <i>' + arr[i].ball + '</i>\n' +
        '            </i>\n' +
        '          </div>\n' +
        '          <div class="mt5"><span class="direct-select">' + arr[i].wanfa + '</span> <span>' + arr[i].num + '注' + arr[i].multiple + '倍' + arr[i].price + '元</span>\n' +
        '          </div>\n' +
        '        </div><div class="dian"></div>\n' +
        '      </li>';
      list += item;
    }
    // localStorage.balls = JSON.stringify(arr);
    $('.buy-list').html(list);
    this.closeBtnClick();
  }


  closeBtnClick() {

    let _this = this;
    $('.li-close').each(function () {

      $(this).on('click', function () {

        let indexx = $(this).parent().index();
        $('.buy-list .buy-li').eq(indexx).remove();
        //记录索引，删除缓存数组中对应的值， 并且删除对应ui
        // var ball = localStorage.getItem("balls");  //此时取得是字符串
        let dataa = JSON.parse(localStorage.balls);
        dataa.splice(indexx, 1);
        localStorage.balls = JSON.stringify(dataa);
        // let arr = JSON.parse(localStorage.balls);
        _this.initMinMultiple();
        _this.calculateMoney();

      });
    });

  }


  zhuiJiaJian() {

    let _this = this;
    $('#zhui ion-icon').each(function () {
      var obj = $('#zhui input');

      $(this).click(function () {

        if ($(this).index() == 0) {//减
          var num = obj.val();
          if (num == 1) {
            obj.val(1);
          } else {
            obj.val((num | 0) - 1);
          }
        } else if ($(this).index() == 2) { //加
          var num = obj.val();
          obj.val((num | 0) + 1);

          var zhi = $('#zhui_input').val();
          var times = localStorage.trace_max_times;
          console.log('localStorage.trace_max_times===' + localStorage.trace_max_times);
          if (parseInt(zhi) > parseInt(times)) {
            $('#zhui_input').val(localStorage.trace_max_times);
          }
          // $('.qi').text($('#zhui_input').val());

        }

        $('.qi').text($('#zhui_input').val());
        _this.calculateMoney();

      });

    });


    $("#zhui_input").change(function () {
      if(!parseInt($(this).val())){
        $('#zhui_input').val(1);
      }
      if (parseInt($(this).val()) > parseInt(localStorage.trace_max_times)) {
        $(this).val(localStorage.trace_max_times);
      } else {
        $(this).val(parseInt($(this).val()));
      }
      $('.qi').text($('#zhui_input').val());
      _this.calculateMoney();
    });

  }


  beiJiaJian() {

    var obj = $('#bei input');
    obj.val(1);
    let _this = this;
    $('#bei ion-icon').each(function () {

      $(this).click(function () {

        if ($(this).index() == 0) {//减
          var num = obj.val();
          if (num == 1) {
            obj.val(1);
          } else {
            obj.val((num | 0) - 1);
          }
        } else if ($(this).index() == 2) { //加

          var num = obj.val();
          obj.val((num | 0) + 1);
          var zhi = $('#bei_input').val();
          var min = localStorage.min_multiple;

          console.log('localStorage.min_multiple==' + localStorage.min_multiple)
          if (parseInt(zhi) > parseInt(min)) {
            $('#bei_input').val(localStorage.min_multiple);
          }
        }

        _this.loadData();
        _this.calculateMoney();
      });

    });

    $("#bei_input").change(function () {
      // console.log('localStorage.min_multipl==='+localStorage.min_multipl)
      // $('#bei_input').val(parseInt($(this).val()))
      if(!parseInt($(this).val())){
        $('#bei_input').val(1);
      }
      if (parseInt($(this).val()) > parseInt(localStorage.min_multiple)) {
        $(this).val(localStorage.min_multiple);
        _this.loadData();
        _this.calculateMoney();

      } else {
        _this.loadData();
        _this.calculateMoney();

      }

    });
  }

  firstMoney;
  initMinMultiple() {

    //     "max_multiple":localStorage.max_multiple 最大限制倍数
    // alert(localStorage.balls);
    // $('.buy-balance').text('余额： '+localStorage.available);

    // if(!localStorage.balls){
    //   return;
    // }
    if(!localStorage.balls){
      return;
    }
    var arr = JSON.parse(localStorage.balls);
    if(arr.length==0){
      return;
    }
    var zhu = 0, money = 0, max_multiple = arr[0].max_multiple;
    // min_multiple 这个是动态变化的！ === 最大倍数/当前倍数
    var min_max_arr = [];
    for (var i = 0; i < arr.length; i++) {
      zhu = zhu + parseInt(arr[i].num);
      var price = parseInt(arr[i].multiple) * parseInt(arr[i].onePrice) * parseInt(arr[i].num) * parseFloat(arr[i].moneyunit);
      money = money + price;
      if (parseInt( arr[i].max_multiple) <parseInt( max_multiple)) {
        max_multiple = arr[i].max_multiple;
      }
    }
    for (var j = 0; j < arr.length; j++) {
      if (arr[j].max_multiple == max_multiple) {
        min_max_arr.push(arr[j].multiple);
      }
    }
    var max_touzhushu = min_max_arr[0];
    for (var k = 0; k < min_max_arr.length; k++) {
      if (parseInt( min_max_arr[k]) > parseInt(max_touzhushu)) {
        max_touzhushu = min_max_arr[k];
      }
    }
    var min_multiple = max_multiple / max_touzhushu;
    localStorage.min_multiple = min_multiple;
    // console.log('localStorage.min_multiple=='+localStorage.min_multiple)
    var qi = $('#zhui_input').val();
    $('.total-con .qi').text(qi);
    $('.total-con .zhu').text(zhu);
    $('.big-text .col').text(money);
    this.firstMoney = money;

    // console.log('max_multiple =='+max_multiple )
    // console.log('tlocalStorage.min_multiple =='+localStorage.min_multiple )

  }



  calculateMoney() {

    if(!localStorage.balls){
      return;
    }
    // console.log('localStorage.balls=='+localStorage.balls)
    var arr = JSON.parse(localStorage.balls);
    var zhu = 0, money = 0;
    for (var i = 0; i < arr.length; i++) {
      zhu = zhu + parseInt(arr[i].num);
      // money = money + arr[i].price;
    }
    // var total = $('#zhui input').val() * $('#bei input').val() * money;
    // $('.yuan').text(total);
    $('.zhu').text(zhu);
    var total = $('#zhui_input').val() * $('#bei_input').val() * this.firstMoney;
    $('.yuan').text(total.toFixed(2));

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


}
