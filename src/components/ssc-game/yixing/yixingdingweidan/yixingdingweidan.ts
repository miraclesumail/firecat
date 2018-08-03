import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the YixingdingweidanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'yixingdingweidan',
  templateUrl: 'yixingdingweidan.html'
})
export class YixingdingweidanComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  getOriginLotteryText(){
      console.log('yixing')
      return this.getCommonData().map(ele => ele.length > 0 ? ele.join('') : '').join('|')
  }

 randomOneOrder(){
     let arr = this.createRandom(1)
  
     this.common.ballData = this.common.ballData.map((item,index) => {
        item.value = item.value.map((ele,index1) => arr.filter(detail => detail[0] == index && detail[1] == index1).length > 0 ? 1 : 0)
        return item
     })
     this.calculate()
 }

 getCount(){
    let count = 0
    
    this.common.ballData.forEach(ele => {
          count += ele.value.filter(item => item == 1).length
    })
    return count
 }
}
