import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the ErxingzuxuanqianerfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erxingzuxuanqianerfushi',
  templateUrl: 'erxingzuxuanqianerfushi.html'
})
export class ErxingzuxuanqianerfushiComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  randomOneOrder(){
    this.common.ballData = this.common.ballData.map((item,index) => {
      let temp = this.tool.produceRandom(2)
      if(index == 0){
         item.value = item.value.map((ele,index) => {
             if(temp.indexOf(index) != -1){
                 return 1
             }else{
                 return 0
             }
         })

         return item
       }
    })
     this.calculate()
  }

  getCount(){
    let total = this.common.ballData[0].value.reduce((a,b) => { 
      if(b)
         return a + 1
      else
         return a
    },0),count;

    if(total >= 2){
       count = this.tool.zuhe1(total,2)
    }else{
       count = 0
    }
    return count
  }

}
