import { Component ,Input} from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'

import { ToolsProvider } from '../../../../providers/tools/tools'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the Zuxuan24Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zuxuan24',
  templateUrl: 'zuxuan24.html'
})
export class Zuxuan24Component extends commonMethod{
  @Input('choose') choose: any[] = [];
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider, public basket:BasketDataProvider) {
    super(common,util,basket)  
    console.log('Hello Zuxuan24Component Component');
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
        let tempArr = this.tool.produceRandom(4)
        if(index == 0){
           item.value = item.value.map((ele,index) => {
               if(tempArr.indexOf(index) != -1){
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
    let count = 0;
    this.common.ballData[0].value.forEach(ele => {
         if(ele == 1)
            count++
    })
  
    return count < 4 ? 0 : this.tool.zuhe1(count,4)
  }
}
