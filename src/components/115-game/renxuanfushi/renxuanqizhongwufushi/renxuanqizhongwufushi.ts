import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuanqizhongwufushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuanqizhongwufushi',
  templateUrl: 'renxuanqizhongwufushi.html'
})
export class RenxuanqizhongwufushiComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    console.log('Hello RenxuanqizhongwufushiComponent Component');
    this.text = 'Hello World';
  }

  randomOneOrder(){
    let temp = this.tool.produceRandom5(7)
    this.common.ballData = this.common.ballData.map((item,index) => {
        item.value = item.value.map((ele,index) => temp.indexOf(index) != -1 ? 1 : 0)
        return item
    })
    this.calculate()
  }

  getCount(){
    let temp = this.common.ballData[0].value.filter(ele => ele == 1).length
    let count = temp  < 7 ? 0 : this.tool.zuhe1(temp,7)
    return count
  }
}
