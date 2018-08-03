import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the QisanzhixuankuaduComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qisanzhixuankuadu',
  templateUrl: 'qisanzhixuankuadu.html'
})
export class QisanzhixuankuaduComponent extends commonMethod{

  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)     
    console.log('Hello QisanzhixuankuaduComponent Component');
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

   //计算各种结果
    mathResult(num){
			var me = this,
				i = 0,
				len,
				j = 0,
				k = 0,
				len2,
				result = [];
			
			for(;i < 10;i++){
				for(j= 0;j < 10;j++){
					for(k= 0;k < 10;k++){
						var numList = [i,j,k];
						let minNums = Math.min.apply(Math, numList);
						let maxNums = Math.max.apply(Math, numList);
						if(maxNums - minNums == num){
							result.push(numList);
						}
					}
				}
			}
			return result;
		}
}
