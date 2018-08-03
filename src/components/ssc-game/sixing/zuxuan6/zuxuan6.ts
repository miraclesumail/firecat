import { Component } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'

import { ToolsProvider } from '../../../../providers/tools/tools'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the Zuxuan6Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zuxuan6',
  templateUrl: 'zuxuan6.html'
})
export class Zuxuan6Component extends commonMethod{

  text: string;

constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider, public basket:BasketDataProvider) {
    super(common,util,basket)     
    console.log('Hello Zuxuan6Component Component');
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
}

 randomOneOrder(){
    let tempArr = this.tool.produceRandom(2)
    this.common.ballData = this.common.ballData.map((item,index) => {
      item.value = item.value.map((ele,index) => {
           if(tempArr.indexOf(index) != -1){
               return 1
           }else{
               return 0
           }
       })
       return item 
    })
   this.calculate()
 }

 getOriginData(){
    let first = []
    this.common.ballData.forEach((ele,index) => {
        if(index == 0){
            ele.value.forEach((item,index) => {
                if(item)
                    first.push(index)
            })
        }
    })
    return {first}
}

 getCount(){
    console.log(this.getOriginData())
    let tempData = this.getOriginData(),count = 0;
    if(tempData.first.length < 2)
        count = 0
    else
        count = this.tool.zuhe1(tempData.first.length,2)
    return count 
 }
}
