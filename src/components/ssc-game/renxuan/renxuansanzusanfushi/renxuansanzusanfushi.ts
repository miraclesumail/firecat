import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuansanzusanfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuansanzusanfushi',
  templateUrl: 'renxuansanzusanfushi.html'
})
export class RenxuansanzusanfushiComponent extends commonMethod{
  choices:any[] = [{name:'万位',choose:false},{name:'千位',choose:false},{name:'百位',choose:true}, {name:'十位',choose:true},{ name:'个位', choose:true}]
  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    console.log('Hello RenxuansanzusanfushiComponent Component');
    this.text = 'Hello World';
  }

  randomOneOrder(){
    let arr = this.tool.produceRandom(2)
    this.common.ballData = this.common.ballData.map((item,index) => {
         item.value = item.value.map((ele,index1) => {
              return arr.indexOf(index1) != -1 ? 1 : 0
         })
         return item
    })
    this.calculate()
  }

  getOriginData(){
    let arr = []
    this.common.ballData.forEach((ele,index) => {
        if(index == 0){
            ele.value.forEach((item,index) => {
                if(item)
                  arr.push(index)
            })
        }
    })
    return arr
  }

  getCount(){
    let tempData = this.getOriginData(),count = 0;
    if(tempData.length < 2)
        count = 0
    else
        count = this.tool.zuhe1(tempData.length,2)*2

    let total = this.choices.filter(ele => ele.choose).length
    count = count*this.tool.zuhe1(total,3)
    return count
  }
}
