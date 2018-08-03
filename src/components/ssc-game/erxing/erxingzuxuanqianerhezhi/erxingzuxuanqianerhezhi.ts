import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the ErxingzuxuanqianerhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erxingzuxuanqianerhezhi',
  templateUrl: 'erxingzuxuanqianerhezhi.html'
})
export class ErxingzuxuanqianerhezhiComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
    
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    this.common.ballData = [
        {"key":"选号", "value":[0,0,0,0,0,0,0]},
        {"key":"选号", "value":[0,0,0,0,0,0,0]},
        {"key":"选号", "value":[0,0,0,0,0,0,0]}
      ]
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  randomChoose(number?){
    if(number){
        let target = Math.floor(Math.random()*17)
        
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
        this.basket.addBetData()
        if(number == 1) return
        this.randomChoose(--number)
    }else{
        let target = Math.floor(Math.random()*17)
        
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
  }

  randomOneOrder(){
    let target = Math.floor(Math.random()*17)
    
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

  getCount(){
    let count = 0
    this.getOriginData().forEach(item => {
        count += this.mathResult(item,0,9).length
    })
    return count
  }

   getOriginData(){
      let arr = []
      this.common.ballData.forEach((ele,number) => {
           ele.value.forEach((item,index) => {
               if(item == 1)
                  arr.push(number*7 + index + 1)
           })
      })
      return arr
   }

   getLotteryText(){
    let arr = []
    this.getCommonData().forEach((ele,index) => ele.forEach((item,index1) => arr.push(index*7 + item + 1)))
    console.log(arr)
    return arr.join(' ')
   }

   getOriginLotteryText(){
    let total = []
    this.getCommonData().forEach((item,index) => {
         let arr = []
         if(item.length)
           // arr.push(item*index*7 + 1)
            arr.push(...item.map(ele => 7*index + ele + 1))
        
         total.push(arr)
    }) 
    return total.filter(ele => ele.length > 0).map(ele => ele.join('|')).join('|')
  }


   checkResult(data, array){
  //检查重复
  for (var i = array.length - 1; i >= 0; i--) {
      if(array[i].join('') == data){
          return false;
      }
  };
  return true;
}

arrIndexOf(value, arr) {
  var r = 0;
  for (var s = 0; s < arr.length; s++) {
      if (arr[s] == value) {
          r += 1;
      }
  }
  return r || -1;
} 


mathResult(sum, nBegin, nEnd){
  var me = this,
      arr = [],
      checkArray = [],
      x,y
      
  for (x=nBegin;x<=nEnd ;x++ ){
      for (y=nBegin;y<=nEnd ;y++ ){
          if(x+y==sum && me.arrIndexOf(x, [x,y]) != 2){
                  var postArray = [x,y].sort(function(a, b){
                      return a-b;
                  });
                  if(me.checkResult(postArray.join(''), checkArray)){
                      checkArray.push(postArray)
                      arr.push([x,y]);
                  }
              }
      }
  }
  return arr
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
              return (index*7 + index1 + 1) % 2 && (index*7 + index1) <= 16? 1:0 
          })
          return ele
     })
 }

 changeEven(line){
      this.common.ballData = this.common.ballData.map((ele,index) => {
          ele.value = ele.value.map((item,index1) => {
              return (index*7 + index1 + 1) % 2 && (index*7 + index1) <= 16? 0:1 
          })
          return ele
      })      
 }

 changeBig(line){
    
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map((ele,index2) => {
              let temp = index*7 + index2 > 7 && (index*7 + index2) <= 16 ? 1 : 0
              return temp
          })
          return item
      })
  }

  changeSmall(line){
  
      this.common.ballData = this.common.ballData.map((item,index) => {
          item.value = item.value.map((ele,index2) => {
              let temp = index*7 + index2 <= 7 ? 1 : 0
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
