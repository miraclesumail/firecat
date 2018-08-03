import {Component, ViewChild,Output, ElementRef,EventEmitter,OnInit } from '@angular/core'
import { UtilProvider } from '../../../providers/util/util'
import { Slides } from 'ionic-angular';
import * as $ from 'jquery';

import { CommonProvider } from "../../../providers/common/common";
/**
 * Generated class for the DaxiaodanshuangComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

function throttle(fn,delay,options) {
  var wait=false;
 if (!options) options = {};
 return function(e){
     var that = this;
      if(!wait){
          if (options.leading === false){
              // 非截流操作
              fn.apply(that)
             }
          else { 
             // 截流操作
             wait=true;
             setTimeout(function () {
                fn.call(that,e);
                wait=false;
             },delay);
         }
     }
 }
}

@Component({
  selector: 'daxiaodanshuang',
  templateUrl: 'daxiaodanshuang.html'
})
export class DaxiaodanshuangComponent implements OnInit{
  @ViewChild('contentSlides') contentSlides: Slides;

  @ViewChild('drag') drag:ElementRef
  
  menus:string[];

  choose:string = '开奖';

  chooseIndex:number;
  originX:number;

  gap:number = 0;
  historyRecord: any;

  kaijiangData:any[];

  //weiData:any = ['百位','十位']
  weiData:any[];

  rangeData:any = ['大','小','单','双']

  daxiaoData:any[]

  //位置记录
  position:any

  constructor(public common:CommonProvider,public util:UtilProvider) {
    console.log('Hello DaxiaodanshuangComponent Component');
  }

  ngOnInit(){
     this.produceAllData()
  }

  ngAfterViewInit(){
    this.contentSlides.initialSlide = this.chooseIndex
    setTimeout(() => {
      this.contentSlides.lockSwipes(true)
    },500)
    //this.contentSlides.lockSwipes(true)
   
     this.drag.nativeElement.addEventListener('touchstart', (e)=>{
        this.originX = e.changedTouches[0].pageX        
     }, false)

      this.drag.nativeElement.addEventListener('touchmove', throttle(function(e){
        
        let x = e.changedTouches[0].pageX
        let total = this.gap + x - this.originX
        console.log(total)
        console.log($('#hezhi-container').width())
        if( total > 0 || total < -(+($('.union-part').width()*(this.weiData.length - 2)/this.weiData.length))){
          return
        }
        this.gap = this.gap + x - this.originX
        $('.union-part').css('left', this.gap + 'px')
      }.bind(this), 80, {leading:true}
          
    ),false)
  }

  ionChange($event){
    this.contentSlides.lockSwipes(false)
    console.log($event.value)
    this.contentSlides.slideTo(this.menus.indexOf($event.value))
    this.contentSlides.lockSwipes(true)
  }

  slideChanged(){
    let index = this.contentSlides.getActiveIndex()
    this.choose = this.menus[index]
  }

  //形成所有页面需要的数据
  produceAllData(){
    this.historyRecord = this.common.historyList.map(ele => {
      return {...ele, number:ele.number.substr(2,ele.number.length),history:ele.code.split('').map(ele => parseInt(ele))}
    })
    console.log(this.historyRecord)
    this.getKaijiang()
    this.getDaxiao()
  }

  getKaijiang(){
      switch(this.common.smallMethod){
           case '后二大小单双':
              this.weiData = ['十位','个位']
              this.kaijiangData = this.historyRecord.map((ele,index) => {
                  let shi = this.judgeKind(ele.history[3])
                  let ge = this.judgeKind(ele.history[4])
                  return {...ele,shi,ge}       
            })      
            break  

           case '后三大小单双':
              this.weiData = ['百位','十位','个位']
              this.kaijiangData = this.historyRecord.map((ele,index) => {
                  let bai = this.judgeKind(ele.history[2])
                  let shi = this.judgeKind(ele.history[3])
                  let ge = this.judgeKind(ele.history[4])
                  let xingtai = this.tellZu(ele.history.slice(2,5))
                  return {...ele,bai,shi,ge,xingtai}       
            })  
            break    

            case '前二大小单双':
              this.weiData = ['万位','千位']
              this.kaijiangData = this.historyRecord.map((ele,index) => {
                  let wan = this.judgeKind(ele.history[0])
                  let qian = this.judgeKind(ele.history[1])
                  return {...ele,wan,qian}
              })
              break  

            case '前三大小单双':
              this.weiData = ['万位','千位','百位']
              this.kaijiangData = this.historyRecord.map((ele,index) => {
                  let wan = this.judgeKind(ele.history[0])
                  let qian = this.judgeKind(ele.history[1])
                  let bai = this.judgeKind(ele.history[2])
                  let xingtai = this.tellZu(ele.history.slice(0,3))
                  return {...ele,wan,qian,bai,xingtai}   
              })
              break  
            
            case '中三大小单双':
              this.weiData = ['千位','百位','个位']
              this.kaijiangData = this.historyRecord.map((ele,index) => {
                  let qian = this.judgeKind(ele.history[1])
                  let bai = this.judgeKind(ele.history[2])
                  let shi = this.judgeKind(ele.history[3])
                  let xingtai = this.tellZu(ele.history.slice(1,4))
                  return {...ele,qian,bai,shi,xingtai}
              })
              break              
      }
  }

  getDaxiao(){
    //this.position
    let tempData = this.historyRecord.map(ele => 
        { return  ele.history[0] ? {...ele,history:ele.history.slice(this.position[0],this.position[1])} : 
         {...ele, history:Array.apply(null,Array(this.position[1] - this.position[0])).map((v,i) => -1)}
    }) 

    let tempArr = Array.apply(null,Array(this.position[1] - this.position[0])).map((v,i) => i)

    let statisticData = tempArr.reduce((a,b) => {
        let sumData = []
        tempData.forEach(ele => {
            sumData.push(ele.history[b])
        }) 
        a.push(sumData)
        return a
    },[])
    
    console.log(statisticData)
    this.getResultData(statisticData)
  }

  getResultData(arr:Array<any>){
      let length = arr.length, total = []
      for(let i = 0;i<length;i++){
          total.push(this.processData(arr[i]))
      }
      this.daxiaoData = total
      console.log(this.daxiaoData)
  }

  processData(arr:any[]){
     let total = []
     for(let i =0;i<arr.length;i++){
      let temp = []
      if(i == 0){
        temp.push(...this.test(arr[i]))
      }else{
        let ss = this.test(arr[i])
        for(let j = 0;j<4;j++){
            if(total[i-1][j] === true && ss[j] !== true)
                temp.push(1)
            if(ss[j] === true)
                temp.push(true)
            if(total[i-1][j] !== true && ss[j] !== true)
                temp.push(total[i-1][j] + 1)
        }
      }
         total.push(temp)
    }
    return total
  }

  tellZu(balls){
      let temp = [],count = 1;
      
      for(let i = 0;i<balls.length;i++){
          if(temp.indexOf(balls[i]) != -1)
             count++
          temp.push(balls[i])
          
      }    
      switch(count){
          case 1:
             return '组六'
          case 2:
             return '组三'
          case 3:
             return '豹子'      
      }
  }

  judgeKind(number){
    if(number%2 == 0 && number >=5)
        return '大双'
    if(number%2 == 0 && number < 5)
        return '小双'
    if(number%2 != 0 && number >= 5)
        return '大单'
    if(number%2 != 0 && number < 5)
        return '小单'
  }

  judge(number){
    switch(number){
    case 0:
        return '大'
    case 1:
        return '小'
    case 2:
        return '单'  
    case 3:
        return '双'           
   }
  }

  test(number){
    if(number == -1)
       return [1,1,1,1]

    if(number>=5 && number%2)
       return [true,1,true,1]
    if(number>=5 && !(number%2))
       return [true,1,1,true]
 
    if(number<5 && !(number%2))
      return [1,true,1,true]
    if(number<5 && number%2)
      return [1,true,true,1]
  }
   
 
   qq(i){
     switch(i){
       case 0:
         return '大'
       case 1:
         return '小'
       case 2:
         return '单'
       case 3:
         return '双'      
     }
   }

   existZuxuan(){
    let data = this.common.componentRef.instance.getCommonData(),flag = false;
    data.forEach(ele => {
         if(ele.length){
              flag = true
              return flag
         }
            
    })
    return flag
 }

  trueExist(item){
      return item.filter(ele => ele === true).length ? false : true
  }

  refreshData():Promise<any>{
    console.log('fwfwfwef')

    this.produceAllData()
    return new Promise((resolve,reject) =>{
      resolve()
    })
  }
}
