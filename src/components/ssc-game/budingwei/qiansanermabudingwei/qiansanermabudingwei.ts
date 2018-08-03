import { Component, Input} from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the QiansanermabudingweiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qiansanermabudingwei',
  templateUrl: 'qiansanermabudingwei.html'
})
export class QiansanermabudingweiComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider, public util:UtilProvider,public basket:BasketDataProvider){
    super(common,util,basket)
    console.log('Hello QiansanermabudingweiComponent Component');
    this.text = 'Hello World';
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
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
  let tempData = this.getOriginData(),count = 0;
  if(tempData.first.length < 2)
      count = 0
  else
      count = this.tool.zuhe1(tempData.first.length,2)
  return count
}

}
