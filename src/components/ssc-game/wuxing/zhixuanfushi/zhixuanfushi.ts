import { Component, Input,  AfterViewInit} from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
import { IonicPage } from 'ionic-angular';

import * as $ from 'jquery'

// import { SscPage } from '../../../../pages/games/ssc/ssc'
/**
 * Generated class for the ZhixuanfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhixuanfushi',
  templateUrl: 'zhixuanfushi.html'
})
export class ZhixuanfushiComponent extends commonMethod implements AfterViewInit{
  @Input('choose') choose: any[] = [];
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    console.log('Hello ZhixuanfushiComponent Component');
    console.log(this.common.missData)
    //this.util.shakePhone(this.randomChoose)
    //console.log(ssc.haveChoosen)  
  }

  ngAfterViewInit(){
  // this.dealHover()
    //  setTimeout(() => {
       
    //       // setTimeout(() => {
    //   $('.ball-choose li').on({  
    //     touchstart: function(e){  
    //        console.log('dqwfqf')
    //        $(this).find('.tip-block').show()
    //     },  
    //     touchmove: function(){  
                   
    //     },  
    //     touchend: function(){  
    //       $(this).find('.tip-block').hide()
    //     }  
    // })  
    // },100)     
  }

  qqq(number){
    return number + 5
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

}
