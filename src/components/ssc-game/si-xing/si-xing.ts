import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../providers/common/common'
import { UtilProvider } from '../../../providers/util/util'
import { ToolsProvider } from '../../../providers/tools/tools'

import { commonMethod } from '../../common.method'
import { BasketDataProvider } from '../../../providers/basket-data/basket-data'
/**
 * Generated class for the SiXingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'si-xing',
  templateUrl: 'si-xing.html'
})
export class SiXingComponent extends commonMethod{

  @Input('choose') choose: any[] = [];

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider, public tool:ToolsProvider) {
    super(common,util,basket)
    console.log(this.common.missData)
    //this.util.shakePhone(this.randomChoose)
  }

  qqq(number){
    return number + 5
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  randomOneOrder(){
    if(this.common.smallMethod == '直选复式' || this.common.smallMethod == '直选组合'){
       super.randomOneOrder()
    }

    if(this.common.smallMethod == '组选24'){
      this.random24()
   }

   if(this.common.smallMethod == '组选12'){
     this.random12()
   }

   if(this.common.smallMethod == '组选6'){
     this.random6()
   }

   if(this.common.smallMethod == '组选4'){
     this.random4()
   }
      
  }

  random24(){
    this.common.ballData = this.common.ballData.map((item,index) => {
      let tempArr = this.tool.produceRandom(4)
      if(index == 0){
         item.value = item.value.map((ele,index) => {
             if(tempArr.indexOf(index) != -1){
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

  random12(){
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

  random6(){
    let tempArr = this.tool.produceRandom(2)
    this.common.ballData = this.common.ballData.map((item,index) => {
      item.value = item.value.map((ele,index) => {
           if(tempArr.indexOf(index) != -1){
               return 1
           }else{
               return 0
           }
       })
       return item 
    })
   this.calculate()
  }

  random4(){
    let temp,arr;
    this.common.ballData = this.common.ballData.map((item,index) => {
    
        if(index == 0){
            temp = this.tool.produceRandom(1)
            item.value = item.value.map((ele,index) => {
                if(temp.indexOf(index) != -1){
                    return 1
                }else{
                    return 0
                }
            })

            return item
        }else{
            arr = this.tool.produceRandom(1,temp)
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

  getOriginData():any{
    if(this.common.smallMethod == '组选6'){
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
    }else{
    }  
  }

  getCount(){
    if(this.common.smallMethod == '直选复式'){
       super.getCount()
    }

    if(this.common.smallMethod == '直选组合'){
      let flag = this.common.ballData.every(item => {
        return item.value.some(ele => ele == 1)
      }), count = 4
      
      if(flag){
        this.common.ballData.forEach(item => {
              count *= item.value.filter(ele => ele == 1).length
        })
      }else{
        count = 0
      }
      return count
    }

    if(this.common.smallMethod == '组选24'){
      let count = 0;
      this.common.ballData[0].value.forEach(ele => {
           if(ele == 1)
              count++
      })
    
      return count < 4 ? 0 : this.tool.zuhe1(count,4)
    }

    if(this.common.smallMethod == '组选12'){
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
      return count
    }

    if(this.common.smallMethod == '组选6'){
      console.log(this.getOriginData())
      let tempData = this.getOriginData(),count = 0;
      if(tempData.first.length < 2)
          count = 0
      else
          count = this.tool.zuhe1(tempData.first.length,2)
      return count 
    }

    if(this.common.smallMethod == '组选4'){
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
      return count
    }
  }

}
