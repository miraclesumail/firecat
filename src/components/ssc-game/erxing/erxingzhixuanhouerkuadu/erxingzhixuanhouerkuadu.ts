import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the ErxingzhixuanhouerkuaduComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'erxingzhixuanhouerkuadu',
  templateUrl: 'erxingzhixuanhouerkuadu.html'
})
export class ErxingzhixuanhouerkuaduComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket) 
    console.log('Hello ErxingzhixuanhouerkuaduComponent Component');
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }

    getOriginData(){
      let arr = []
      this.common.ballData.forEach((ele,number) => {
          ele.value.forEach((item,index) => {
              if(item == 1)
                  arr.push(index)
          })
      })
      return arr
    }

    getCount(){
      let count = 0
      this.getOriginData().forEach(element => {
           count += this.mathResult(element).length
      })
      return count
    }

   mathResult(num){
    var me = this,
      i = 0,
      len,
      j = 0,
      len2,
      result = [];
    
    for(;i < 10;i++){
      for(j= 0;j < 10;j++){
        if(j - i == num){
          result.push([i,j]);
          if(i != j){
            result.push([j,i]);
          }
        }
      }
    }
    return result;
   }
}
