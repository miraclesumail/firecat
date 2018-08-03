import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the Renxuanzuxuan4Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuanzuxuan4',
  templateUrl: 'renxuanzuxuan4.html'
})
export class Renxuanzuxuan4Component extends commonMethod{
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
          arr = this.tool.produceRandom(1,tempArr)
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

//   toggle(index,number){
//     // 少于2个 选择
//     if(this.choices.filter(ele => ele.choose).length == number && this.choices[index].choose )
//        return 
//     this.choices = this.choices.map((ele,indexs) => {
//         if(index == indexs)
//           return {...ele,choose:!ele.choose}
//         else
//           return ele
//     })
//     let { first,second } = this.getOriginData()
//     if(first.length >0 && second.length >0)
//        this.calculate()
//   }


  getCount(){
    let tempData = this.getOriginData(),count = 0;
    if(tempData.first.length < 1 || tempData.second.length < 1)
       count = 0

    for(let i = 0;i<tempData.first.length;i++){
      let sanchong = tempData.first[i]
      // 去掉重复的
      let data = this.tool.removeElement(tempData.second,sanchong)
      if(data.length >= 1)
         count += this.tool.zuhe1(data.length,1)
     }

     let total = this.choices.filter(ele => ele.choose).length
     count = count*this.tool.zuhe1(total,4)
     return count
  }

}
