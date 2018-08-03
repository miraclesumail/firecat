import { Component,Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the Zuxuan120Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zuxuan120',
  templateUrl: 'zuxuan120.html'
})
export class Zuxuan120Component extends commonMethod{
  @Input('choose') choose: any[] = [];  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    console.log('Hello Zuxuan120Component Component');
    this.text = 'Hello World';
  }

  qqq(number){
        return number + 5
    }

  randomOneOrder(){
    this.common.ballData = this.common.ballData.map((item,index) => {
      let temp = this.tool.produceRandom(5)
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
    let count = 0;
    this.common.ballData[0].value.forEach(ele => {
         if(ele == 1)
            count++
    })
   return count < 5 ? 0 : this.tool.zuhe1(count,5)
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  getLotteryText(){
    return this.getCommonData().filter(ele => ele.length > 0).map(ele => ele.map(item => item).join(' '))
  }

}
