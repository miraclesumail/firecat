import { Component ,Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the SixingzhixuanzuheComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sixingzhixuanzuhe',
  templateUrl: 'sixingzhixuanzuhe.html'
})
export class SixingzhixuanzuheComponent extends commonMethod{
  @Input('choose') choose: any[] = [];

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider, public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket)  
    console.log('Hello SixingzhixuanzuheComponent Component');
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  getCount(){
    console.log('zhixuanzuhe')
    let flag = this.common.ballData.every(item => {
         return item.value.some(ele => ele == 1)
    }), count = 4
    
    if(flag){
      this.common.ballData.forEach(item => {
           count *= item.value.filter(ele => ele == 1).length
      })
    }else{
      count = 0
    }
    return count
  }
}
