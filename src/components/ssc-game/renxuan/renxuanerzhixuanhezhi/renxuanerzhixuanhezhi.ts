import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuanerzhixuanhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuanerzhixuanhezhi',
  templateUrl: 'renxuanerzhixuanhezhi.html'
})
export class RenxuanerzhixuanhezhiComponent extends commonMethod{
  choices:any[] = [{name:'万位',choose:false},{name:'千位',choose:false},{name:'百位',choose:false}, {name:'十位',choose:true},{ name:'个位', choose:true}]
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider,public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)
    console.log('Hello RenxuanerzhixuanhezhiComponent Component');
    this.common.ballData = [
      {"key":"选号", "value":[0,0,0,0,0,0,0]},
      {"key":"选号", "value":[0,0,0,0,0,0,0]},
      {"key":"选号", "value":[0,0,0,0,0,0,0]}
      ]
    }

    randomOneOrder(){
        let target = Math.floor(Math.random()*19)
        
        this.common.ballData = this.common.ballData.map((ele,index) => {
            ele.value = ele.value.map((item,index1) => {
                if(index*7 + index1 == target){
                    return 1
                }else{
                    return 0
                }
            })
            return ele
        })
        this.calculate()
    }

    getOriginData(){
      let arr = []
      this.common.ballData.forEach((ele,number) => {
          ele.value.forEach((item,index) => {
              if(item == 1)
                  arr.push(number*7 + index)
          })
      })
      return arr
   } 


   getCount(){
        let count = 0
        this.getOriginData().forEach(item => {
            count += this.mathResult(item,0,9).length
        })
        let total = this.choices.filter(ele => ele.choose).length
        count = count*this.tool.zuhe1(total,2)
        return count
   }

   getOriginLotteryText(){
    let total = []
    this.getCommonData().forEach((item,index) => {
         let arr = []
         if(item.length)
           // arr.push(item*index*7 + 1)
            arr.push(...item.map(ele => 7*index + ele))
        
         total.push(arr)
    }) 
    return total.filter(ele => ele.length > 0).map(ele => ele.join('|')).join('|')
   }

//    changeAll(line){  
//     this.common.ballData = this.common.ballData.map((item,index) => {
//         item.value = item.value.map(ele => 1)
//         return item      
//     })      
//   }

  changeAll(line){ 
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map((ele,index1) => index*7 + index1 <= 18 ? 1 : 0)
          return item      
      })      
  }

   changeOdd(line){
    this.common.ballData = this.common.ballData.map((ele,index) => {
         ele.value = ele.value.map((item,index1) => {
             return (index*7 + index1) % 2 && index*7 + index1 <= 18? 1:0 
         })
         return ele
    })
  }

  changeEven(line){
    this.common.ballData = this.common.ballData.map((ele,index) => {
        ele.value = ele.value.map((item,index1) => {
            return (index*7 + index1) % 2 && index*7 + index1 <= 18 ? 0:1 
        })
        return ele
    })      
}

 changeBig(line){
    
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map((ele,index2) => {
              let temp = index*7 + index2 > 9 && index*7 + index2 <= 18 ? 1 : 0
              return temp
          })
          return item
      })
  }

  changeSmall(line){
  
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map((ele,index2) => {
              let temp = index*7 + index2 <= 9 && index*7 + index2 <= 18? 1 : 0
              return temp
          })
          return item
      })
  }

  changeClear(line){
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map(ele => 0)
          return item            
      })
  }

  changeChooseStatus(index1,index2){   
      this.common.singleBtn = this.common.singleBtn.map((item,index) => {
              if(index2 == index)
               return {...item, flag:true}
              else
               return {...item, flag:false}   
      })
      console.log(this.common.singleBtn)        
  }

}
