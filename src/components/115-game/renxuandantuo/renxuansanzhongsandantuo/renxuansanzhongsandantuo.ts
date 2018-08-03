import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { ToolsProvider } from '../../../../providers/tools/tools'

import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the RenxuansanzhongsandantuoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'renxuansanzhongsandantuo',
  templateUrl: 'renxuansanzhongsandantuo.html'
})
export class RenxuansanzhongsandantuoComponent extends commonMethod{
  arr:any = []
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    super(common,util,basket)   
    console.log('Hello RenxuansanzhongsandantuoComponent Component');
    this.text = 'Hello World';
  }

  randomOneOrder(){
    let tempArr,arr;
    this.common.ballData = this.common.ballData.map((item,index) => {
     
      if(index == 0){
        this.arr = []
        tempArr = Math.random() > 0.5 ? this.tool.produceRandom5(2) : this.tool.produceRandom5(1)
        this.arr.push(...tempArr)            
        item.value = item.value.map((ele,index) => {
              if(tempArr.indexOf(index) != -1){
                  
                  return 1
              }else{
                  return 0
              }
          })
          return item
      }else{
          arr = this.tool.produceRandom5(tempArr.length == 2 ? 1 : 2,tempArr)
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
          console.log('ewwww')
          item.value = item.value.map((ele,index2) => {
              
              if(index2 == column){
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
