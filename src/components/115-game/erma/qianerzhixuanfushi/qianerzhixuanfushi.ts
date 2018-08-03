import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the QianerzhixuanfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qianerzhixuanfushi',
  templateUrl: 'qianerzhixuanfushi.html'
})
export class QianerzhixuanfushiComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket)     
    
    console.log('Hello QianerzhixuanfushiComponent Component');
    this.text = 'Hello World';
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  randomOneOrder(){
      let arr = this.tool.produceArrd5(2)
      this.common.ballData = this.common.ballData.map((ele,index) => {
          ele.value = ele.value.map((item,index1) => {
                  if(index1 == arr[index])
                      return 1
                  else
                      return 0
          })
          return ele
      })
      this.calculate()
  }

  getOriginData():any{
    // let erchong = [], danhao = []
     let data = []
     this.common.ballData.forEach((ele,index) => {
            let temp = []
            ele.value.forEach((item,index1) => {
                if(item)
                   temp.push(index1 +1)
            })
            data.push(temp)
     })    
     return data
  }

  getCount(){
    let count = 1
    count = this.tool.checkCount(this.tool.combination(this.getOriginData()))
    return count
  }
}
