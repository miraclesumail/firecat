import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the Renxuanzuxuan12Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuanzuxuan12',
  templateUrl: 'renxuanzuxuan12.html'
})
export class Renxuanzuxuan12Component extends commonMethod{
  choices:any[] = [{name:'万位',choose:false},{name:'千位',choose:true},{name:'百位',choose:true}, {name:'十位',choose:true},{ name:'个位', choose:true}]
  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    this.text = 'Hello World';
  }

  randomOneOrder(){
    let tempArr,arr;
    this.common.ballData = this.common.ballData.map((item,index) => {
      
       if(index == 0){
           
           tempArr = this.tool.produceRandom(1)
           item.value = item.value.map((ele,index) => {
               if(tempArr.indexOf(index) != -1){
                   return 1
               }else{
                   return 0
               }
           })
 
           return item
       }else{
           arr = this.tool.produceRandom(2,tempArr)
           item.value = item.value.map((ele,index) => {
             if(arr.indexOf(index) != -1){
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
    let tempData = this.getOriginData(),count = 0;
    if(tempData.first.length < 1 || tempData.second.length < 2)
       count = 0

    for(let i = 0;i<tempData.first.length;i++){
        let erchong = tempData.first[i]
        // 去掉重复的
        let data = this.tool.removeElement(tempData.second,erchong)
        if(data.length >= 2)
           count += this.tool.zuhe1(data.length,2)
    }

    let total = this.choices.filter(ele => ele.choose).length
    count = count*this.tool.zuhe1(total,4)
    return count
  }
}
