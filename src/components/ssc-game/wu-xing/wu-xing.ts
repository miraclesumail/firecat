import { Component, Input,  AfterViewInit} from '@angular/core';
import { CommonProvider } from '../../../providers/common/common'
import { UtilProvider } from '../../../providers/util/util'
import { commonMethod } from '../../common.method'
import { ToolsProvider } from '../../../providers/tools/tools'
import { BasketDataProvider } from '../../../providers/basket-data/basket-data'
import { IonicPage } from 'ionic-angular';

import * as $ from 'jquery'

/**
 * Generated class for the WuXingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wu-xing',
  templateUrl: 'wu-xing.html'
})
export class WuXingComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider, public tool:ToolsProvider) {
    super(common,util,basket)
    console.log('Hello ZhixuanfushiComponent Component');
    console.log(this.common.missData)
    //this.util.shakePhone(this.randomChoose)
  }

  randomOneOrder(){
      if(this.common.smallMethod == '直选复式' || this.common.smallMethod == '直选组合'){
         super.randomOneOrder()
      }

      if(this.common.smallMethod == '组选120'){
         this.random120()
      }

      if(this.common.smallMethod == '组选60'){
        this.random60()
      }

      if(this.common.smallMethod == '组选60'){
        this.random60()
      }

      if(this.common.smallMethod == '组选30'){
        this.random30()
      }

      if(this.common.smallMethod == '组选20'){
        this.random20()
      }

      if(this.common.smallMethod == '组选10'){
        this.random10()
      }

      if(this.common.smallMethod == '组选5'){
        this.random5()
      }
  }

  random120(){
    this.common.ballData = this.common.ballData.map((item,index) => {
      let temp = this.tool.produceRandom(5)
      if(index == 0){
        item.value = item.value.map((ele,index) => {
            if(temp.indexOf(index) != -1){
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

  random60(){
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
            arr = this.tool.produceRandom(3,tempArr)
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

   random30(){
    let tempArr,arr;
    this.common.ballData = this.common.ballData.map((item,index) => {
     
      if(index == 0){
          tempArr = this.tool.produceRandom(2)
          item.value = item.value.map((ele,index) => {
              if( tempArr.indexOf(index) != -1){
                  return 1
              }else{
                  return 0
              }
          })
          return item
      }else{
          arr = this.tool.produceRandom(1, tempArr)
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

  random20(){
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
          arr = this.tool.produceRandom(2,temp)
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

  random10(){
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

  random5(){
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

  getCount(){
      if(this.common.smallMethod == '直选复式'){
         super.getCount()
      }

      if(this.common.smallMethod == '直选组合'){
        console.log('zhixuanzuhe')
        let flag = this.common.ballData.every(item => {
            return item.value.some(ele => ele == 1)
        }), count = 5
        
        if(flag){
          this.common.ballData.forEach(item => {
              count *= item.value.filter(ele => ele == 1).length
          })
        }else{
          count = 0
        }
        return count
      }

      if(this.common.smallMethod == '组选120'){
        let count = 0;
        this.common.ballData[0].value.forEach(ele => {
             if(ele == 1)
                count++
        })
       return count < 5 ? 0 : this.tool.zuhe1(count,5)
      }

      if(this.common.smallMethod == '组选60'){
        console.log(this.getOriginData())
        let tempData = this.getOriginData(),count = 0;
        if(tempData.first.length < 1 || tempData.second.length < 3)
        count = 0

        for(let i = 0;i<tempData.first.length;i++){
            let erchong = tempData.first[i]
            // 去掉重复的
            let data = this.tool.removeElement(tempData.second,erchong)
            if(data.length >= 3)
            count += this.tool.zuhe1(data.length,3)
        }
        return count
      }

      if(this.common.smallMethod == '组选30'){
        let tempData = this.getOriginData(),count = 0;
        if(tempData.first.length < 2 || tempData.second.length < 1)
           count = 0
    
        for(let i = 0;i<tempData.second.length;i++){
          let danhao = tempData.second[i]
          // 去掉重复的
          let data = this.tool.removeElement(tempData.first,danhao)
          if(data.length >= 2)
             count += this.tool.zuhe1(data.length,2)
         }
         return count
      }

      if(this.common.smallMethod == '组选20'){
        let tempData = this.getOriginData(),count = 0;
        if(tempData.first.length < 1 || tempData.second.length < 2)
           count = 0
    
        for(let i = 0;i<tempData.first.length;i++){
          let sanchong = tempData.first[i]
          // 去掉重复的
          let data = this.tool.removeElement(tempData.second,sanchong)
          if(data.length >= 2)
             count += this.tool.zuhe1(data.length,2)
         }
         return count
      }

      if(this.common.smallMethod == '组选10'){
        let tempData = this.getOriginData(),count = 0;
        if(tempData.first.length < 1 || tempData.second.length < 2)
           count = 0
    
        for(let i = 0;i<tempData.first.length;i++){
          let sanchong = tempData.first[i]
          // 去掉重复的
          let data = this.tool.removeElement(tempData.second,sanchong)
          if(data.length >= 2)
             count += this.tool.zuhe1(data.length,2)
         }
         return count
      }
     
      if(this.common.smallMethod == '组选5'){
        let tempData = this.getOriginData(),count = 0;
        if(tempData.first.length < 1 || tempData.second.length < 1)
           count = 0
    
        for(let i = 0;i<tempData.first.length;i++){
          let sichong = tempData.first[i]
          // 去掉重复的
          let data = this.tool.removeElement(tempData.second,sichong)
          if(data.length >= 1)
             count += this.tool.zuhe1(data.length,1)
         }
         return count
      }
  }

  qqq(number){
    return number + 5
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  getLotteryText(){
    if(this.common.smallMethod == '组选120'){
      return this.getCommonData().filter(ele => ele.length > 0).map(ele => ele.map(item => item).join(' '))
    }else{
      super.getLotteryText()
    }
  }

}
