import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the DingweidanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dingweidan',
  templateUrl: 'dingweidan.html'
})
export class DingweidanComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket)         
    console.log('Hello DingweidanComponent Component');
    this.text = 'Hello World';
  }

 randomOneOrder(){
    let arr = [Math.floor(Math.random()*3),Math.floor(Math.random()*11)]
    console.log(arr)
    this.common.ballData = this.common.ballData.map((ele,index) => {
        ele.value = ele.value.map((item,index1) => {
            if(index == arr[0] && index1 == arr[1])
            return 1
            else
            return 0   
        })
        return ele
      })
    this.calculate()
  }

  getCount(){
    let count = 0;
    this.common.ballData.forEach((item,index) => {
        count +=  item.value.filter(ele => ele == 1).length
    })
    return count
  }
}
