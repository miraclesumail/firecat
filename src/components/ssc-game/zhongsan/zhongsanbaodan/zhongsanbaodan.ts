import { Component, Input } from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'
/**
 * Generated class for the ZhongsanbaodanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zhongsanbaodan',
  templateUrl: 'zhongsanbaodan.html'
})
export class ZhongsanbaodanComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
    super(common,util,basket)   
    console.log('Hello ZhongsanbaodanComponent Component');
    this.text = 'Hello World';
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }

  qqq(number){
    return number + 5
  }

  changeToggle(row,column){
    if(column!=null){
    this.common.ballData = this.common.ballData.map((item,index) => {
        if(index == row){
            item.value = item.value.map((ele,index) => {
                if(index == column){
                    return ele == 1 ? 0 : 1 
                }else{
                    return 0
                }
            })
            return item
        }else{
            return item
        }
    })
    }
    this.calculate()
  } 

  getCount(){
    let count = 0;
    this.common.ballData[0].value.forEach((item,index) => {
        if(item){
          console.log(this.mathResult(index,0,9))
          count += this.mathResult(index,0,9).length
        }
          
    })
    return count
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
}
