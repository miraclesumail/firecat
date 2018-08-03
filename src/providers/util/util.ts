import { HttpClient } from '@angular/common/http';
import { HttpClientProvider } from '../http-client/http-client'

import { Injectable } from '@angular/core';
import { CommonProvider } from '../common/common'
import {Observable} from 'rxjs/Observable';
import { Vibration } from '@ionic-native/vibration';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {
  shake:boolean = false;
  
  // 走势图头部选择
  choose:any
  menus: Array<string> 

  historyList:any[]

  historyNumbers = [
    {number:'01期', history:[5,7,7,5,7]},
    {number:'02期', history:[3,3,3,8,5]},
    {number:'03期', history:[9,6,6,9,5]},
  ]
  fakeData:any = {}

  statisticCategory:any[] = ['出现次数', '平均遗漏', '最大遗漏', '当前遗漏']

  trendData:any = {
    '出现次数':{
        '万位走势':[3,4,5,6,7,8,9,1,2,5],
        '千位走势':[3,4,5,6,7,8,9,1,2,5],
        '百位走势':[3,4,5,6,7,8,9,1,2,5],
        '十位走势':[3,4,5,6,7,8,9,1,2,5],
        '个位走势':[3,4,5,6,7,8,9,1,2,5]
    },
    '平均遗漏':{
        '万位走势':[7,4,1,2,7,3,6,1,2,5],
        '千位走势':[3,4,5,6,7,8,9,1,2,5],
        '百位走势':[3,4,5,6,7,8,9,1,2,5],
        '十位走势':[3,4,5,6,7,8,9,1,2,5],
        '个位走势':[3,4,5,6,7,8,9,1,2,5]
    },
    '最大遗漏':{
        '万位走势':[7,4,1,2,7,3,6,1,2,5],
        '千位走势':[3,4,5,6,7,8,9,1,2,5],
        '百位走势':[3,4,5,6,7,8,9,1,2,5],
        '十位走势':[3,4,5,6,7,8,9,1,2,5],
        '个位走势':[3,4,5,6,7,8,9,1,2,5]
    } ,
    '当前遗漏':{
        '万位走势':[7,4,1,2,7,3,6,1,2,5],
        '千位走势':[3,4,5,6,7,8,9,1,2,5],
        '百位走势':[3,4,5,6,7,8,9,1,2,5],
        '十位走势':[3,4,5,6,7,8,9,1,2,5],
        '个位走势':[3,4,5,6,7,8,9,1,2,5]
    }  
  }

 

  listeners:any = []

  fakeTrend:Array<any> = []
  constructor(public http: HttpClientProvider,public common:CommonProvider, public vibration: Vibration) {
    

this.fakeTrend = [0,1,2,3,4].reduce((a,b) =>{
        let arr = []
        for(let i = 0;i<this.historyNumbers.length;i++){
            arr.push(this.historyNumbers[i].history[b])
        }
        a.push(arr)
        return a
    },[])
    

   // this.generateFake()
    //console.log(this.fakeData)

    //遗漏冷热  yilou 当前遗漏 
    let yilou = {},lengre = {},maxYi = {},avgYi = {}

    for(let aa in this.fakeData){
        yilou[aa.substr(0,2)] = []
        lengre[aa.substr(0,2)] = []
        maxYi[aa.substr(0,2)] = []
        avgYi[aa.substr(0,2)] = []
        let length = this.fakeData[aa].length, arr = this.fakeData[aa]

        for(let i = 1 ; i<this.fakeData[aa][length-1].length;i++){
            let item = this.fakeData[aa][length-1][i], temp = [], local = []

            arr.forEach((ele,index) => {
                temp.push(ele[i])
                if(index < arr.length - 1){
                    if(!ele[i].choose && arr[index+1][i].choose){
                        local.push(ele[i])
                    }
                }else if(index = arr.length - 1){
                    if(!ele[i].choose)
                        local.push(ele[i])
                }        
            })

            console.log(local)
            let leng = temp.filter(ele => ele.choose).length
            let max = Math.max(...temp.filter(ele => !ele.choose).map(item => item.number))
            let avg = Math.floor(local.reduce((a,b) => a + b.number,0)/local.length)

            maxYi[aa.substr(0,2)].push(max)
            avgYi[aa.substr(0,2)].push(avg)
            lengre[aa.substr(0,2)].push(leng)

            if(!item.choose)
                yilou[aa.substr(0,2)].push(item.number)
            else
                yilou[aa.substr(0,2)].push(this.fakeData[aa][length-2][i].number)
                    
        }
    }
   
  
   // this.generateFake()
  }

   //生成走势统计数据
   generateFake(){
    for(let k = 0; k<this.fakeTrend.length;k++){
      let tempData = this.fakeTrend[k]
      let arr = []
      for(let i = 1; i<=tempData.length; i++){
        let inner = []
       // inner.push({number:this.historyNumbers[i-1].number, choose:false})
        for(let j = 0; j<=9;j++){
            if(j == tempData[i-1]){
               inner.push({number:tempData[i-1], choose:true})
            }else{
               if(i == 1){
                 inner.push({number:1,choose:false})
               }else{
                 if(arr[i-2][j].choose){
                    inner.push({number:1, choose:false})
                 }else{
                    inner.push({number:arr[i-2][j].number+1, choose:false})
                 }
               }
            }  
        }  
        
        arr.push(inner)
       }
       for(let i=0;i<arr.length;i++){
           arr[i].unshift({number:this.historyNumbers[i].number, choose:false})
       }
       this.fakeData[this.deal(k)] = arr
    }
   
  }

    deal(number){
     // 根据玩法判断  如果common.pid == ssc    
     if(number == 0)
        return '万位走势'
     if(number == 1)
        return '千位走势'
     if(number == 2)
        return '百位走势'
     if(number == 3)
        return '十位走势'
     if(number == 4)
        return '个位走势'
  }

  //走势图头部菜单
//   setData(){
//     console.log('ggg');
//     console.log(this.common.method);

//     this.menus = ['开奖']
//     if(this.common.method){
//       this.trendKind[this.common.method].forEach(ele => {
//         this.menus.push(ele)
//       })
//       this.choose = this.menus[0]
//     }   
//      console.log(this.menus)
    
//    }

    //单个选球
    // changeToggle(row,column?){
    //     if(column!=null){
    //         this.common.ballData = this.common.ballData.map((item,index) => {
    //             if(index == row){
    //                 item.value = item.value.map((ele,index) => {
    //                     if(index == column){
    //                         return ele == 1 ? 0 : 1
    //                     }else{
    //                         return ele
    //                     }
    //                 })
    //                 return item
    //             }else{
    //                 return item
    //             }
    //         })
    //     }else{

    //     }
       
    //     this.common.calculate()
    // }

    // 重置选球数据
    resetData(){
        this.common.componentRef.instance.arr = []
        this.common.ballData = this.common.ballData.map(item => {
            let balls = item.value.map(ele => 0)
            item.value = balls
            return item
        })
        //this.common.cartNumber = 0
        console.log('reset data')
        this.common.calculate()
    }

    formatMoney(num){
        let re = /(-?\d+)(\d{3})/;
        if (Number.prototype.toFixed) {
            num = (+num).toFixed(2)
        } else {
            num = Math.round(+num * 100) / 100
        }
        num = '' + num;
        while (re.test(num)) {
            num = num.replace(re, "$1,$2")
        }
        return num
    }

   randomChoose(){
     this.common.componentRef.instance.randomChoose()
   }  

   shakePhone(func:Function){
     var speed = 15,self = this;    // 用来判定的加速度阈值，太大了则很难触发
     var x, y, z, lastX, lastY, lastZ;
     x = y = z = lastX = lastY = lastZ = 0;

     function shake(event){
        var acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        //alert(this.shake)
        if((Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) && !self.shake){
            // 用户设备摇动了，触发响应操作
            // 此处的判断依据是用户设备的加速度大于我们设置的阈值
            self.shake = true;
            new Observable(observer => {
                setTimeout(() => {
                  observer.next();
                   }, 300);
            }).subscribe(value => {
                  func.bind(self)()
                  self.shake = false
                  self.vibration.vibrate(500)
            })
        }
        lastX = x;
        lastY = y;
    }
     this.listeners.push(shake)
     window.addEventListener('devicemotion',shake,false);
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
        x,y,z;
        
    for (x=nBegin;x<=nEnd ;x++ ){
        for (y=nBegin;y<=nEnd ;y++ ){
            for (z=nBegin;z<=nEnd ;z++ ){
                if(x+y+z==sum && me.arrIndexOf(x, [x,y,z]) != 3){
                    var postArray = [x,y,z].sort(function(a, b){
                        return a-b;
                    });
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

  mathHezhiResult(sum, nBegin, nEnd){
    var me = this,
        arr = [],
        checkArray = [],
        x,y,z;
        
    for (x=nBegin;x<=nEnd ;x++ ){
        for (y=nBegin;y<=nEnd ;y++ ){
            for (z=nBegin;z<=nEnd ;z++ ){
                if(x+y+z==sum){
                   arr.push([x,y,z])
                }
            }
        }
    }
    return arr
  }

}
