import { Component } from '@angular/core';
import { CommonProvider } from '../../../providers/common/common' 
import { UtilProvider } from '../../../providers/util/util' 

/**
 * Generated class for the ZuxuanhezhiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zuxuanhezhi',
  templateUrl: 'zuxuanhezhi.html'
})
export class ZuxuanhezhiComponent{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider) {
    
    console.log('Hello ZuxuanhezhiComponent Component');
    this.text = 'Hello World';
  }

  changeToggle(row,column){
     console.log('wwww')
     this.common.ballData = this.common.ballData.map((ele,index) => {
          if(index == row){
              let temp = ele.map((todo,number) => {
                  return column == number ? (todo ? 0 : 1) : todo
              })
              return temp
          }else{
              return ele
          }
     })
     this.calculate()
  }

  calculate(){
     let arr = [],resultNum = []
     this.common.ballData.forEach((ele,index) => {
          ele.forEach((item,number) => {
              if(item)
                 arr.push(7*index + number)
          })
     })

     for(let i = 0;i<arr.length;i++){
         resultNum = resultNum.concat(this.util.mathResult(arr[i],0,9))
     }
     
     this.common.count = resultNum.length
     let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
     this.common.betPrice = this.common.count*2*percent
  }


}
