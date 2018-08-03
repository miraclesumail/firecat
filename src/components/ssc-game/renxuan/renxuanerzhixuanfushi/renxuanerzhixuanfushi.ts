import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuanerzhixuanfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuanerzhixuanfushi',
  templateUrl: 'renxuanerzhixuanfushi.html'
})
export class RenxuanerzhixuanfushiComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    this.text = 'Hello World';
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  randomOneOrder(){
    let arr = this.createRandom(2)
    
    this.common.ballData = this.common.ballData.map((item,index) => {
        item.value = item.value.map((ele,index1) => arr.filter(detail => detail[0] == index && detail[1] == index1).length > 0 ? 1 : 0)
        return item
    })
    this.calculate()
  }

  getCount(){
    let originData = this.getCommonData(),tempArr,count = 0
    originData.forEach((ele,index) => {
        originData.forEach((item,index1) => {
            if(index < index1){
               tempArr = [];
               tempArr.push(originData[index])
               tempArr.push(originData[index1])
               count += this.tool.combination(tempArr).length
            }
        })
    })
    return count
  }

  getOriginLotteryText(){
    return this.getCommonData().map(ele => ele.length > 0 ? ele.join('') : '').join('|')
  }
}
