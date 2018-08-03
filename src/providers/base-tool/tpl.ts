import {Injectable} from '@angular/core';

import * as $ from 'jquery';

@Injectable()
export class Tpl {

  constructor() {
  }

  initClick() {

    let _this = this;
    $('.select-d').on("click", ".ks-tab-top .ks-tab-unit", function () {
      $('.current').removeClass('current');
      let index = $(this).index();
      $(this).addClass('current');

    });
  }

  static recharge_tip = '<section class="basket-pop" style=" position: absolute;top: 0; bottom: 0;left: 0;right: 0;z-index: 123;background: rgba(0, 0, 0, 0.35);display: flex;justify-content: center;align-items: center;">\n' +
    '  <div class="balance-pop" style="overflow: hidden;background: #ffffff;border-radius: 10px;text-align: center;width: 75vw;height: 137px;">\n' +
    '    <h4 class="txt" style="font-size: 14px;color: #000;letter-spacing: -0.22px;margin-top: 40px;">您的余额不足，请先去充值</h4>\n' +
    '    <div style="height: 40px;float: left;width: 37.5vw;line-height: 40px;text-align: center;font-size: 16px;background-color: #ffffff; margin-top: 40px;border-top: 1px solid rgb(210, 210, 210);color: #666666;\n' +
    '    border-right: 1px solid rgb(210, 210, 210);" class="offhand-btn cancel-btn">取消\n' +
    '    </div>\n' +
    '    <div style="height: 40px;float: left;width: 37.5vw;line-height: 40px;text-align: center;font-size: 16px;background-color: #ffffff;margin-top: 40px;border-top: 1px solid rgb(210, 210, 210);color: #FE5600;" class="offhand-btn bet-btn">确定\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</section>';

  //投注成功提示
  static success_tip = '<section class="basket-pop" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;z-index: 123;\n' +
    '    background: rgba(0, 0, 0, 0.6);display: flex;justify-content: center;align-items: center;">\n' +
    '  <div class="success-pop" style="background: #ffffff;border-radius: 10px;text-align: center;width: 75vw;height: 160px;">\n' +
    '    <h2 style="margin-top: 50px;font-size: 15px;">恭喜您</h2>\n' +
    '    <p style="margin: 10px 0;text-align: center;">投注已成功，祝您好运</p>\n' +
    '  </div>\n' +
    '</section>';

    
    static success_tip1 = '<section class="basket-pop" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;z-index: 123;\n' +
    '    background: rgba(0, 0, 0, 0.6);display: flex;justify-content: center;align-items: center;">\n' +
    '  <div class="success-pop" style="background: #ffffff;border-radius: 10px;text-align: center;width: 60vw;height: 130px;">\n' +
    '    <h2 style="margin-top: 35px;font-size: 15px;">恭喜您</h2>\n' +
    '    <p style="margin: 10px 0;text-align: center;">投注已成功，祝您好运</p>\n' +
    '  </div>\n' +
    '</section>';

  static fail_tip = '<section class="basket-pop" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;z-index: 123;\n' +
    '    background: rgba(0, 0, 0, 0.6);display: flex;justify-content: center;align-items: center;">\n' +
    '  <div class="success-pop" style="background: #ffffff;border-radius: 10px;text-align: center;width: 75vw;height: 100px;">\n' +
    '    <h2 style="margin-top: 43px;font-size: 15px;" id="error-tip">恭喜您</h2>\n' +
    '  </div>\n' +
    '</section>';



  //lhc trend
  static trend_lhc_kj = '<li class="top-line">\n' +
    '      <span>期号</span>\n' +
    '      <span>一</span>\n' +
    '      <span>二</span>\n' +
    '      <span>三</span>\n' +
    '      <span>四</span>\n' +
    '      <span>五</span>\n' +
    '      <span>六</span>\n' +
    '      <span>特码</span>\n' +
    '    </li>';
  static trend_lhc_bose =

    '    <li class="top-line bose">\n' +
    '      <span>期号</span>\n' +
    '      <span>特码</span>\n' +
    '      <span>大小</span>\n' +
    '      <span>单双</span>\n' +
    '      <span>波色</span>\n' +
    '    </li>';





  static trend_bom_hz = '<li class="hezhi">\n' +
    '        <p class="">3</p>\n' +
    '        <p class="">4</p>\n' +
    '        <p class="">5</p>\n' +
    '        <p class="">6</p>\n' +
    '        <p class="">7</p>\n' +
    '        <p class="">8</p>\n' +
    '        <p class="">9</p>\n' +
    '        <p class="">10</p>\n' +
    '        <p class="">11</p>\n' +
    '        <p class="">12</p>\n' +
    '        <p class="">13</p>\n' +
    '        <p class="">14</p>\n' +
    '        <p class="">15</p>\n' +
    '        <p class="">16</p>\n' +
    '        <p class="">17</p>\n' +
    '        <p class="">18</p>\n' +
    '      </li>';

  static trend_bom_3th = '<li class="santh">\n' +
    '        <p class="">111</p>\n' +
    '        <p class="">222</p>\n' +
    '        <p class="">333</p>\n' +
    '        <p class="">444</p>\n' +
    '        <p class="">555</p>\n' +
    '        <p class="">666</p>\n' +
    '      </li>';


  static trend_bom_2th = '<li class="erth">\n' +
    '        <p class="" data-index="112|113|114|115|116">11*</p>\n' +
    '        <p class="" data-index="122|223|224|225|226">22*</p>\n' +
    '        <p class="" data-index="133|233|334|335|336">33*</p>\n' +
    '        <p class="" data-index="144|244|344|445|446">44*</p>\n' +
    '        <p class="" data-index="155|255|355|455|556">55*</p>\n' +
    '        <p class="" data-index="166|266|366|466|566">66*</p>\n' +
    '      </li>';

  static trend_bom_3lh = '<li class="sanl">\n' +
    '        <p class="">123</p>\n' +
    '        <p class="">234</p>\n' +
    '        <p class="">345</p>\n' +
    '        <p class="">456</p>\n' +
    '      </li>';

  static trend_bom_3bt = '<li class="sanbth">\n' +
    '        <p class="">123</p>\n' +
    '        <p class="">124</p>\n' +
    '        <p class="">125</p>\n' +
    '        <p class="">126</p>\n' +
    '        <p class="">134</p>\n' +
    '        <p class="">135</p>\n' +
    '        <p class="">136</p>\n' +
    '        <p class="">145</p>\n' +
    '        <p class="">146</p>\n' +
    '        <p class="">156</p>\n' +
    '        <p class="">234</p>\n' +
    '        <p class="">235</p>\n' +
    '        <p class="">236</p>\n' +
    '        <p class="">245</p>\n' +
    '        <p class="">246</p>\n' +
    '        <p class="">256</p>\n' +
    '        <p class="">345</p>\n' +
    '        <p class="">346</p>\n' +
    '        <p class="">356</p>\n' +
    '        <p class="">456</p>\n' +
    '      </li>';

  static trend_bom_2bt = '<li class="erbth">\n' +
    '        <p class="">12*</p>\n' +
    '        <p class="">13*</p>\n' +
    '        <p class="">14*</p>\n' +
    '        <p class="">15*</p>\n' +
    '        <p class="">23*</p>\n' +
    '        <p class="">24*</p>\n' +
    '        <p class="">25*</p>\n' +
    '        <p class="">26*</p>\n' +
    '        <p class="">34*</p>\n' +
    '        <p class="">35*</p>\n' +
    '        <p class="">36*</p>\n' +
    '        <p class="">45*</p>\n' +
    '        <p class="">46*</p>\n' +
    '        <p class="">56*</p>\n' +
    '      </li>';

  static trend_bom_3bt_2bt_dty = '<li class="dtys">\n' +
    '        <p class="">1</p>\n' +
    '        <p class="">2</p>\n' +
    '        <p class="">3</p>\n' +
    '        <p class="">4</p>\n' +
    '        <p class="">5</p>\n' +
    '        <p class="">6</p>\n' +
    '      </li>';



  static kj_hz_tpl ='<ul class="ks-tab-head-kj ks-tab-second hezhi">\n' +
    '    <li class="top-line">\n' +
    '      <p class="t-issue">期号</p>\n' +
    '      <p class="t-num">开奖号码</p>\n' +
    '      <p class="t-total">和值</p>\n' +
    '      <p class="t-big">大小</p>\n' +
    '      <p class="t-odd">单双</p>\n' +
    '    </li>\n' +
    '  </ul>';

  static kj_other_tpl = '<ul class="ks-tab-head-kj ks-tab-second others">\n' +
    '    <li class="top-line">\n' +
    '      <p class="t-issue">期号</p>\n' +
    '      <p class="t-num">开奖号码</p>\n' +
    '      <p class="t-xt">形态</p>\n' +
    '    </li>\n' +
    '  </ul>';


  static kj_hz_con_tpl = '<div class="content-d kj-container hezhi">\n' +
    '    <ul class="kj-ul">\n' +
    '    </ul>\n' +
    '  </div>';

  static kj_others_con_tpl = '<div class="content-d kj-container others">\n' +
    '    <ul class="kj-ul">\n' +
    '    </ul>\n' +
    '  </div>';

//基本走势
  static jbzs_tpl = '<ul class="ks-tab-head-jbzs ks-tab-second">\n' +
    '    <li class="top-line">\n' +
    '      <p class="t-issue">期号</p>\n' +
    '      <p class="t-num">开奖号</p>\n' +
    '      <p class="t-total">和值</p>\n' +
    '      <p class="t-kuadu">跨度</p>\n' +
    '      <p class="t-1">1</p>\n' +
    '      <p class="t-2">2</p>\n' +
    '      <p class="t-3">3</p>\n' +
    '      <p class="t-4">4</p>\n' +
    '      <p class="t-5">5</p>\n' +
    '      <p class="t-6">6</p>\n' +
    '    </li>\n' +
    '  </ul>';

  static jbzs_con_tpl = ' <div class="content-d jbzs-container">\n' +
    '    <ul class="jbzs-ul">\n' +
    '    </ul>\n' +
    '  </div>';

//形态走势
  static xtzs_tpl = '<ul class="ks-tab-head-xtzs ks-tab-second ">\n' +
    '    <li class="top-line">\n' +
    '      <p class="t-issue">期号</p>\n' +
    '      <p class="t-kjh">开奖号</p>\n' +
    '      <p class="t-sant">三同号</p>\n' +
    '      <p class="t-sanbt">三不同</p>\n' +
    '      <p class="t-ert">二同号</p>\n' +
    '      <p class="t-erbt">二不同</p>\n' +
    '    </li>\n' +
    '  </ul>';
  static xtzs_con_tpl = ' <div class="content-d xtzs-container">\n' +
    '    <ul class="xtzs-ul">\n' +
    '    </ul>\n' +
    '  </div>';


  //号码分布
  static hmfb_erth_tpl = '<ul class="ks-tab-head-hmfb ks-tab-second erth">\n' +
    '    <li class="top-line">\n' +
    '      <p class="t-issue">期号</p>\n' +
    '      <p class="t-kjh">开奖号</p>\n' +
    '      <p class="t-1">11</p>\n' +
    '      <p class="t-2">22</p>\n' +
    '      <p class="t-3">33</p>\n' +
    '      <p class="t-4">44</p>\n' +
    '      <p class="t-5">55</p>\n' +
    '      <p class="t-6">66</p>\n' +
    '    </li>\n' +
    '  </ul>';

  static hmfb_erth_con_tpl = ' <div class="content-d hmfb-container erth">\n' +
    '    <ul class="hmfb-ul">\n' +
    '    </ul>\n' +
    '  </div>';

  static hmfb_erbth_con_tpl = ' <div class="content-d hmfb-container erbth">\n' +
    '    <ul class="hmfb-ul">\n' +
    '    </ul>\n' +
    '  </div>';

  //号码分布 二不同
  static hmfb_erbth_tpl = '<ul class="ks-tab-head-hmfb ks-tab-second erbth">\n' +
    '    <li class="top-line">\n' +
    '    <p class="t-issue">期号</p>\n' +
    '    <p class="t-kjh">开奖号</p>\n' +
    '      <p class="t t-12"><span>12</span></p>\n' +
    '      <p class="t t-13"><span>13</span></p>\n' +
    '      <p class="t t-14"><span>14</span></p>\n' +
    '      <p class="t t-15"><span>15</span></p>\n' +
    '      <p class="t t-16"><span>16</span></p>\n' +
    '      <p class="t t-23"><span>23</span></p>\n' +
    '      <p class="t t-24"><span>24</span></p>\n' +
    '      <p class="t t-25"><span>25</span></p>\n' +
    '      <p class="t t-26"><span>26</span></p>\n' +
    '      <p class="t t-34"><span>34</span></p>\n' +
    '      <p class="t t-35"><span>35</span></p>\n' +
    '      <p class="t t-36"><span>36</span></p>\n' +
    '      <p class="t t-45"><span>45</span></p>\n' +
    '      <p class="t t-46"><span>46</span></p>\n' +
    '      <p class="t t-56"><span>56</span></p>\n' +
    '    </li>\n' +
    '    </ul>';



  //冷热～～
  static lr_tpl = '<ul class="ks-tab-head-lr ks-tab-second ">\n' +
    '    <li class="top-line">\n' +
    '      <p class="t-hz">和值</p>\n' +
    '      <p class="t-30lr">30期冷热</p>\n' +
    '      <p class="t-60lr">60期冷热</p>\n' +
    '      <p class="t-100lr">90期冷热</p>\n' +
    '      <p class="t-yl">遗漏</p>\n' +
    '    </li>\n' +
    '  </ul>';

  static lr_con_tpl = ' <div class="content-d lr-container">\n' +
    '    <ul class="lr-ul">\n' +
    '    </ul>\n' +
    '  </div>';


  //和值
  static hzzs_tpl ='<ul class="ks-tab-head-hzzs ks-tab-second ">\n' +
    '    <li class="top-line">\n' +
    '      <p class="t-issue">期号</p>\n' +
    '      <p class="t-3">3</p>\n' +
    '      <p class="t-4">4</p>\n' +
    '      <p class="t-5">5</p>\n' +
    '      <p class="t-6">6</p>\n' +
    '      <p class="t-7">7</p>\n' +
    '      <p class="t-8">8</p>\n' +
    '      <p class="t-9">9</p>\n' +
    '      <p class="t-10">10</p>\n' +
    '      <p class="t-11">11</p>\n' +
    '      <p class="t-12">12</p>\n' +
    '      <p class="t-13">13</p>\n' +
    '      <p class="t-14">14</p>\n' +
    '      <p class="t-15">15</p>\n' +
    '      <p class="t-16">16</p>\n' +
    '      <p class="t-17">17</p>\n' +
    '      <p class="t-18">18</p>\n' +
    '    </li>\n' +
    '  </ul>';
  static hz_con_tpl = ' <div class="content-d hzzs-container">\n' +
    '    <ul class="hzzs-ul">\n' +
    '    </ul>\n' +
    '  </div>';




  // static hmfb_erbt_tpl = '<ul class="ks-tab-head-hmfb ks-tab-second erbth">\n' +
  //   '    <li class="top-line">\n' +
  //   '      <p class="t-issue">期号</p>\n' +
  //   '      <p class="t-kjh">开奖号</p>\n' +
  //   '      <p class="t-1">12</p>\n' +
  //   '      <p class="t-2">13</p>\n' +
  //   '      <p class="t-3">14</p>\n' +
  //   '      <p class="t-4">15</p>\n' +
  //   '      <p class="t-5">16</p>\n' +
  //   '      <p class="t-6">23</p>\n' +
  //   '      <p class="t-1">24</p>\n' +
  //   '      <p class="t-2">25</p>\n' +
  //   '      <p class="t-3">26</p>\n' +
  //   '      <p class="t-4">34</p>\n' +
  //   '      <p class="t-5">35</p>\n' +
  //   '      <p class="t-6">36</p>\n' +
  //   '      <p class="t-1">45</p>\n' +
  //   '      <p class="t-2">46</p>\n' +
  //   '      <p class="t-3">56</p>\n' +
  //   '    </li>\n' +
  //   '  </ul>';
}
