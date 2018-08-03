import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the Renxuanzuxuan24Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuanzuxuan24',
  templateUrl: 'renxuanzuxuan24.html'
})
export class Renxuanzuxuan24Component extends commonMethod{
  choices:any[] = [{name:'万位',choose:false},{name:'千位',choose:true},{name:'百位',choose:true}, {name:'十位',choose:true},{ name:'个位', choose:true}]
  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    this.text = 'Hello World';
  }

  randomOneOrder(){
    let arr = this.tool.produceRandom(4)
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
    if(tempData.length < 4)
        count = 0
    else
        count = this.tool.zuhe1(tempData.length,4)

    let total = this.choices.filter(ele => ele.choose).length
    count = count*this.tool.zuhe1(total,4)
    return count
  }
}
