import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the HousanzhixuanhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'housanzhixuanhezhi',
  templateUrl: 'housanzhixuanhezhi.html'
})
export class HousanzhixuanhezhiComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.common.ballData = [
        {"key":"千", "value":[0,0,0,0,0,0,0]},
        {"key":"百", "value":[0,0,0,0,0,0,0]},
        {"key":"十", "value":[0,0,0,0,0,0,0]
        },{"key":"十", "value":[0,0,0,0,0,0,0]
        }
      ]
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  randomOneOrder(){
        let arr = [Math.floor(Math.random()*4),Math.floor(Math.random()*7)]
        console.log(arr)
        this.common.ballData = this.common.ballData.map((ele,index) => {
            ele.value = ele.value.map((item,index1) => {
                if(index == arr[0] && index1 == arr[1])
                return 1
                else
                return 0   
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

   getLotteryText(){
    let arr = []
    this.getCommonData().forEach((ele,index) => ele.forEach((item,index1) => arr.push(index*7 + item)))
    console.log(arr)
    return arr.join(' ')
   }

   getCount(){
        let count = 0
        this.getOriginData().forEach(item => {
            count += this.util.mathHezhiResult(item,0,9).length
        })
        return count
   }

 changeAll(line){  
    this.common.ballData = this.common.ballData.map((item,index) => {
        item.value = item.value.map(ele => 1)
        return item      
    })      
  }

 changeOdd(line){
     this.common.ballData = this.common.ballData.map((ele,index) => {
          ele.value = ele.value.map((item,index1) => {
              return (index*7 + index1) % 2 ? 1:0 
          })
          return ele
     })
 }

 changeEven(line){
      this.common.ballData = this.common.ballData.map((ele,index) => {
          ele.value = ele.value.map((item,index1) => {
              return (index*7 + index1) % 2 ? 0:1 
          })
          return ele
      })      
 }

 changeBig(line){
    
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map((ele,index2) => {
              let temp = index*7 + index2 > 13 ? 1 : 0
              return temp
          })
          return item
      })
  }

  changeSmall(line){
  
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map((ele,index2) => {
              let temp = index*7 + index2 <= 13 ? 1 : 0
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
