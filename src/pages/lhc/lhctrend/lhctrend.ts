import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as $ from 'jquery';
import {Tpl} from '../../../providers/base-tool/tpl'

@IonicPage()
@Component({
  selector: 'page-lhctrend',
  templateUrl: 'lhctrend.html',
})
export class LhctrendPage {
  color = {
    red: ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'],
    blue: ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48']
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }


  ionViewDidLoad() {

    this.initClick();
    this.createAnimalContent(0);
  }


  initClick() {

    let _this = this;
    $('.lhc-tab-top .lhc-tab-unit').on('click', function () {

      $('.current').removeClass('current');
      $(this).addClass('current');


      var inx = $(this).index();
      switch (inx) {
        case 0:
          _this.createAnimalContent(0);
          break;
        case 1:
          _this.createAnimalContent(1);
          break;
        case 2:
          _this.createBoseContent();
          break;
      }

    })

  }


  createAnimalContent(inx) {

    $('.lhc.top-ul').html(Tpl.trend_lhc_kj);
    var data = JSON.parse(localStorage.lhchisdata)//.reverse();

    if (inx == 0) {

      var htm = '', it;
      for (var i = 0; i < data.length; i++) {

        if (data[i].code == '') {
          it = '<li class="his-line">\n' +
            '        <span class="kj-issue">' + data[i].number + '</span>\n' +
            '        <span class="kj-ing">等待开奖...</span>\n' +
            '      </li>';

        } else {
          it = '<li class="his-line">\n' +
            '              <span>' + data[i].number + '</span>\n' +
            '              <span>' + data[i].code.split(' ')[0] + '</span>\n' +
            '              <span>' + data[i].code.split(' ')[1] + '</span>\n' +
            '              <span>' + data[i].code.split(' ')[2] + '</span>\n' +
            '              <span>' + data[i].code.split(' ')[3] + '</span>\n' +
            '              <span>' + data[i].code.split(' ')[4] + '</span>\n' +
            '              <span>' + data[i].code.split(' ')[5] + '</span>\n' +
            '              <span>' + data[i].code.split(' ')[6] + '</span>\n' +
            '            </li>';
        }

        htm = htm + it;
      }
      $('.his-ul').html(htm);


    } else {


      var htm = '';
      // $('page-lhctrend .his-ul').html('');
      var ani = JSON.parse(localStorage.ani);
      console.log('ani==' + JSON.stringify(ani));
      for (var i = 0; i < data.length; i++) {

        if (data[i].code == '') {
          htm += '<li class="his-line ani">\n' +
            '        <span class="kj-issue">' + data[i].number + '</span>\n' +
            '        <span class="kj-ing">等待开奖...</span>\n' +
            '      </li>';
        } else {

          htm += '<li class="his-line ani"><span>' + data[i].number + '</span>';
          for (var j = 0; j < 7; j++) {

            var v = parseInt(data[i].code.split(' ')[j]), tt;

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
            var span = '<span>' + tt + '</span>';
            // $('page-lhctrend .his-ul .his-line').eq(i).append(span);
            htm += span;
          }
        }
        htm += '</li>';
      }
      console.log('htm====' + htm)
      $('page-lhctrend .his-ul').html(htm);

    }
  }

  createBoseContent() {

    var data = JSON.parse(localStorage.lhchisdata);
    $('.lhc.top-ul').html(Tpl.trend_lhc_bose);
    $('.his-ul').html('');

    for (var i = 0; i < data.length; i++) {


      var te = data[i].code.split(' ')[6];
      var dx = parseInt(te) > 25 ? '大' : '小';
      var ds = parseInt(te) % 2 == 0 ? '双' : '单';

      var dx_color = dx == '大' ? 'rgb(233,106,4)' : 'rgb(105,189,248)';
      var ds_color = ds == '双' ? 'rgb(233,106,4)' : 'rgb(105,189,248)';
      var color = parseInt(te) % 2 == 0 ? '双' : '单';
      var bs_color;
      if (this.color.red.indexOf(te) != -1) {
        color = '红波';
        bs_color = 'red';
      } else if (this.color.blue.indexOf(te) != -1) {
        color = '蓝波';
        bs_color = 'blue';
      } else {
        color = '绿波';
        bs_color = 'green';
      }
      var li;
      if (data[i].code == '') {
        li = '<li class="his-line bose">\n' +
          '        <span class="kj-issue">' + data[i].number + '</span>\n' +
          '        <span class="kj-ing">等待开奖...</span>\n' +
          '      </li>';
      } else {

        li = '<li class="his-line bose">\n' +
          '      <span>' + data[i].number + '</span>\n' +
          '      <span>' + te + '</span>\n' +
          '      <span style="color:' + dx_color + '">' + dx + '</span>\n' +
          '      <span style="color:' + ds_color + '">' + ds + '</span>\n' +
          '      <span style="color:' + bs_color + '">' + color + '</span>\n' +
          '    </li>';
      }
      $('page-lhctrend  .his-ul').append(li);

    }

  }


}
