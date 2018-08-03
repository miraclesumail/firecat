import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuanerzhongerdantuoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuanerzhongerdantuo',
  templateUrl: 'renxuanerzhongerdantuo.html'
})
export class RenxuanerzhongerdantuoComponent extends commonMethod{
  arr:any = []
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket)   
    console.log('Hello RenxuanerzhongerdantuoComponent Component');
    this.text = 'Hello World';
  }

  randomOneOrder(){
    let tempArr,arr;
    this.common.ballData = this.common.ballData.map((item,index) => {
     
      if(index == 0){
        tempArr = this.tool.produceRandom5(1)
          item.value = item.value.map((ele,index) => {
              if(tempArr.indexOf(index) != -1){
                  
                  return 1
              }else{
                  return 0
              }
          })
          return item
      }else{
          arr = this.tool.produceRandom5(1,tempArr)
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
           if(this.arr.length == 1)
              this.arr.pop()
           this.arr.push(column)
       }
    }else{
       if(this.common.ballData[0].value[column])
           this.arr.splice(this.arr.indexOf(column),1)
    }
   
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
      this.calculate()
      
  } 

  getCount(){
    let count = 0
    let data = this.getOriginData()

    if(data.first.length == 1){
       count = data.second.length 
    }
    return count
  }
}
