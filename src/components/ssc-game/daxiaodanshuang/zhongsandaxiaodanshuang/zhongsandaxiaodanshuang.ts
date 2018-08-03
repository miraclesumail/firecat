import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the ZhongsandaxiaodanshuangComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhongsandaxiaodanshuang',
  templateUrl: 'zhongsandaxiaodanshuang.html'
})
export class ZhongsandaxiaodanshuangComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.common.ballData = [
      {"key":"千位", "value":[0,0,0,0]},
      {"key":"百位", "value":[0,0,0,0]},
      {"key":"十位", "value":[0,0,0,0]}
    ]
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  getOriginLotteryText(){
    console.log(this.getCommonData().map(ele => ele.map(item => this.judge(item) + '').join('')).join('|'))
    console.log('vwvwvvewev')
    return this.getCommonData().map(ele => ele.map(item => this.judge(item) + '').join('')).join('|')
  }

  getLotteryText(){
    let ss = this.getCommonData().map(ele => ele.map(item => {
              if(item == 0)
                 return 1
              else if(item == 1)
                 return 0
              else if(item == 2)
                 return 3
              else
                 return 2
       
    }).join('')).join('|')
    console.log(ss)
    return ss
  }
}
