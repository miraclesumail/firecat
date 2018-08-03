import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../providers/common/common'
import { UtilProvider } from '../../../providers/util/util'
import { ToolsProvider } from '../../../providers/tools/tools'

import { commonMethod } from '../../common.method'
import { BasketDataProvider } from '../../../providers/basket-data/basket-data'

/**
 * Generated class for the QianSanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qian-san',
  templateUrl: 'qian-san.html'
})
export class QianSanComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  
  text: string;

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

  getCount(){
      if(this.common.smallMethod == '包胆'){
      let count = 0;
      this.common.ballData[0].value.forEach((item,index) => {
          if(item){
            console.log(this.mathResult(index,0,9))
            count += this.mathResult(index,0,9).length
          }
            
      })
      return count
    }

    if(this.common.smallMethod == '特殊号码'){
      let count = 0
      this.common.ballData[0].value.forEach(item => {
           if(item)
              count++
      })
      return count
    }

    if(this.common.smallMethod == '特殊号码'){
      let count = 0
      this.common.ballData[0].value.forEach(item => {
           if(item)
              count++
      })
      return count
    }

    if(this.common.smallMethod == '直选和值'){
      let count = 0
      this.getOriginData().forEach(item => {
          count += this.util.mathHezhiResult(item,0,9).length
      })
      return count
    }

    if(this.common.smallMethod == '直选跨度'){
      let count = 0
      this.getOriginData().forEach(element => {
          count += this.mathResultkuadu(element).length
      })
      return count
    }
   
    if(this.common.smallMethod == '直选组合'){
      let flag = this.common.ballData.every(item => {
        return item.value.some(ele => ele == 1)
      }), count = 3
      
      if(flag){
        this.common.ballData.forEach(item => {
              count *= item.value.filter(ele => ele == 1).length
        })
      }else{
        count = 0
      }
      return count
    }

    if(this.common.smallMethod == '直选组合'){
      let flag = this.common.ballData.every(item => {
        return item.value.some(ele => ele == 1)
      }), count = 3
      
      if(flag){
        this.common.ballData.forEach(item => {
              count *= item.value.filter(ele => ele == 1).length
        })
      }else{
        count = 0
      }
      return count
    }

    if(this.common.smallMethod == '组三'){
      let total = this.common.ballData[0].value.reduce((a,b) => { 
        if(b)
           return a + 1
        else
           return a
      },0),count;
  
      if(total >= 2){
         count = this.tool.zuhe1(total,2)*2
      }else{
         count = 0
      }
      return count
    }
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

   //检测结果重复
		checkResult(data, array){
			//检查重复
			for (var i = array.length - 1; i >= 0; i--) {
				if(array[i].join('') == data){
					return false;
				}
			};
			return true;
    }
    
		//计算各种结果
		mathResult(sum, nBegin, nEnd){
			var me = this,
				arr = [],
				checkArray = [],
				x,y,z;
				
			for (x=nBegin;x<=nEnd ;x++ ){
				for (y=nBegin;y<=nEnd ;y++ ){
					for (z=nBegin;z<=nEnd ;z++ ){
						if(x == sum && me.arrIndexOf(x, [x,y,z]) != 3
						|| y == sum && me.arrIndexOf(x, [x,y,z]) != 3
						|| z == sum && me.arrIndexOf(x, [x,y,z]) != 3){
						 	var postArray = [x,y,z].sort(function(a, b){
								return a-b;
							})
							if(me.checkResult(postArray.join(''), checkArray)){
								checkArray.push(postArray)
								arr.push([x,y,z]);
							}
						}
					}
				}
			}
			return arr
    }
    
    //计算各种结果
    mathResultkuadu(num){
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
