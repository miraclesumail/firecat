import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the QiansanzuxuandantuoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qiansanzuxuandantuo',
  templateUrl: 'qiansanzuxuandantuo.html'
})
export class QiansanzuxuandantuoComponent extends commonMethod{
  arr:any = []

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket)     
    
    console.log('Hello QiansanzuxuandantuoComponent Component');
    this.text = 'Hello World';
  }

  getOriginLotteryText(){
    return this.getCommonData().map(ele => ele.map(item => ('0' + (item + 1)).slice(-2)).join(' ')).join('|')
   // return this.getCommonData()[0].map(ele => ('0' + (ele + 1)).slice(-2)).join(' ')
  }

  randomOneOrder(){
    let temp,arr;
    this.common.ballData = this.common.ballData.map((item,index) => {
     
      if(index == 0){
          this.arr = []
          temp = Math.random() > 0.5 ? this.tool.produceRandom5(2) : this.tool.produceRandom5(1)
          this.arr.push(...temp)
          item.value = item.value.map((ele,index) => {
              if(temp.indexOf(index) != -1){
                  
                  return 1
              }else{
                  return 0
              }
          })
          return item
      }else{
          arr = this.tool.produceRandom5(temp.length == 2 ? 1 : 2,temp)
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

  changeToggle(row,column){
    if(row == 0) {
       if(this.common.ballData[row].value[column]){
           this.arr.splice(this.arr.indexOf(column),1)
       }else{
           if(this.arr.length == 2)
              this.arr.pop()
           this.arr.push(column)
       }
    }else{
       if(this.common.ballData[0].value[column])
           this.arr.splice(this.arr.indexOf(column),1)
    }
    console.log(this.arr)
   
    this.common.ballData = this.common.ballData.map((item,index1) => {
        if(index1 == row){
            if(row == 0){
              item.value = item.value.map((ele,index2) => {
                
                if(this.arr.indexOf(index2) != -1){
                    return 1
                }else{
                    return 0
                }
              })
            }else{
              item.value = item.value.map((ele,index2) => {
                
                if(index2 == column){
                   return ele == 1 ? 0 : 1
                }else{
                    return ele
                }
               })
             }

           return item
        }else{
            item.value = item.value.map((ele,index2) => {
              
              if(index2 == column){
                  console.log('qqqsss')
                  return ele == 1 ? 0 : ele
              }else{
                  return ele
              }
            })
          
            return item
        }
      })
      console.log(this.common.ballData)
      this.calculate()
  } 

//   getOriginData():any{
//     // let erchong = [], danhao = []
//      let first = [], second = []
//      this.common.ballData.forEach((ele,index) => {
//           if(index == 0){
//              ele.value.forEach((item,index) => {
//                  if(item)
//                    first.push(index)
//              })
//           }else{
//              ele.value.forEach((item,index) => {
//                  if(item)
//                    second.push(index)
//               })
//           }
//      })
//      return {first, second}
//   }

  getCount(){
        let count = 0;
        let data = this.getOriginData()

        if(data.first.length == 1){
        count = data.second.length < 2 ? 0 : this.tool.zuhe1(data.second.length,2)
        }else if(data.first.length == 2){
        count =  data.second.length
        }
        return count
  }

}
