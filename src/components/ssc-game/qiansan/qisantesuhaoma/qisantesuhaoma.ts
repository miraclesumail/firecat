import { Component} from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the QisantesuhaomaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qisantesuhaoma',
  templateUrl: 'qisantesuhaoma.html'
})
export class QisantesuhaomaComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)      
    this.text = 'Hello World';
    this.common.ballData = [
        {"key":"特殊号码", "value":[0,0,0]}             
      ]
  }

  qqq(i){
     switch(i){
        case 0:
            return '豹子'
        case 1:
            return '顺子'
        case 2:
            return '对子'        
     }
  }

   getLotteryText(){ 
    return this.getCommonData()[0].join('')
   }

   getCount(){
    let count = 0
    this.common.ballData[0].value.forEach(item => {
         if(item)
            count++
    })
    return count
  }

  getOriginLotteryText(){
    return this.getCommonData().map(ele => ele.map(item => this.qqq(item) + ' ').join('')).join('| ')
  }
}
