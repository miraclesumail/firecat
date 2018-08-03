import {Component, ViewChild,Output, EventEmitter,OnInit } from '@angular/core';
import { UtilProvider } from '../../../providers/util/util'

import { CommonProvider } from "../../../providers/common/common";
import { Slides } from 'ionic-angular';

/**
 * Generated class for the KuadutrendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'kuadutrend',
  templateUrl: 'kuadutrend.html'
})
export class KuadutrendComponent {
    @ViewChild('contentSlides') contentSlides: Slides;
    menus:string[];
    choose:string = '开奖';
    
    text: string;
    historyRecord: any;
    load:boolean = false;

    kaijiangData:any[];

    //记录号码走势
    trendData:any[];

    //记录跨度走势
    kuaDuData:any[];

    //冷热号码走势
    lengreData:any[]

    //平均 最大 当前 冷热统计
    sumData:any[];
    weiData:any[] 

    category:any[] = ['hot','average','max','current']
    //位置记录
    position:any;

    chooseIndex:number;

    complexData:any

    //遗漏数据
    statisticData:any[]

    constructor(public common:CommonProvider,public util:UtilProvider) {
      console.log('Hello KuadutrendComponent Component');
    }

    ngOnInit(){
      console.log(this.chooseIndex)
      console.log(this.position)

      this.weiData = ['w','q','b','s','g'].slice(this.position[0], this.position[1])
      this.contentSlides.initialSlide = this.chooseIndex
      this.choose = this.menus[this.chooseIndex]
      this.produceAllData()
    }

    produceAllData(){
        this.historyRecord = this.common.historyList.map(ele => {
            return {...ele, number:ele.number.substr(2,ele.number.length),history:ele.code.split('').map(ele => parseInt(ele))}
        })
 
        console.log(this.historyRecord)
        this.judgeHeadTitle()
        this.getKaijiang()
        this.getNumberTrend()
        this.getKuaduData()
        this.getColdHot()
    }

    ionChange($event){
      console.log($event.value)
      this.contentSlides.slideTo(this.menus.indexOf($event.value))
    }

    slideChanged(){
      let index = this.contentSlides.getActiveIndex()
      this.choose = this.menus[index]
    }

    getKaijiang(){
        this.kaijiangData = this.historyRecord.map((ele,index) => {
            let arr = []

            if(ele.history[0]){
                if(this.common.secondKind == '五星不定位'){
                    let sum = ele.history.reduce((l,r) => (+l) + (+r))
                    let max = Math.max(...ele.history)
                    let min = Math.min(...ele.history)
                    let gap = max - min
                    let da = ele.history.filter(el => el >= 5).length
                    let daxiao = da + ':' + (5 - da)
                    let odd = ele.history.filter(el => el%2 != 0).length
                    let oddeven = odd + ':' + (5 -odd)
                    arr.push(...[sum,gap,daxiao,oddeven])
                }else{
                    for(let i = this.position[0]; i<this.position[1]; i++){
                        arr.push(this.judgeKind(ele.history[i]))
                    }
                    if(this.position[1] - this.position[0] == 3)
                    arr.push(this.tellZu(ele.history.slice(this.position[0],this.position[1])))
                }
            }
              
            return ele.history[0] ? {...ele, data:arr} : ele
          })      
    }


    tellZu(balls){
      let temp = []
      for(let i = 0;i<balls.length;i++){
          if(temp.indexOf(balls[i]) != -1)
              return '组三'
          temp.push(balls[i])
      }    
      return '组六'
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

    judgeHeadTitle(){
        if(this.position[0] == 0 && this.position[1] == 3){
            this.complexData =  {title:['万位','千位','百位','前三形态'], class:'qiansan'}
            this.statisticData = this.common.missData.qsbdw
        }

        if(this.position[0] == 1 && this.position[1] == 4){
            this.complexData =  {title:['千位','百位','十位','中三形态'], class:'zhongsan'}
            this.statisticData = this.common.missData.zsbdw
        }

        if(this.position[0] == 2 && this.position[1] == 5){
            this.complexData =  {title:['百位','十位','个位','后三形态'], class:'housan'}
            this.statisticData = this.common.missData.hsbdw
        }

        if(this.position[0] == 1 && this.position[1] == 5){
            this.complexData =  {title:['千位','百位','十位','个位'], class:'sixing'}
            this.statisticData = this.common.missData.sixbdw
        }

        if(this.position[0] == 0 && this.position[1] == 5){
            this.complexData =  {title:['和值','跨度','大小比','奇偶比'], class:'wuxing'}
            this.statisticData = this.common.missData.wxbdw
        }

        if(this.position[0] == 0 && this.position[1] == 2){
            this.complexData =  {title:['万位','千位'], class:'qianer'}
            this.statisticData = this.common.missData.qezuxfs
        }

        if(this.position[0] == 3 && this.position[1] == 5){
            this.complexData =  {title:['十位','个位'], class:'houer'}
            this.statisticData = this.common.missData.hezuxfs
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

      getNumberTrend(){
        // let asd = [[3,4,5],[5,6,7],[2,2,3],[4,5,6],[5,5,8],[7,8,9],[1,3,7],[2,4,6],[4,5,9],[5,7,8],[3,6,9]]
            let asd = [],totals = []
            this.historyRecord.forEach(ele => {
                  let temp = []
                  temp.push(...ele.history.slice(this.position[0],this.position[1]))
                  asd.push(temp)
            })

            function check(arr,num){
              let total = 0
              for(let i =0;i<arr.length;i++){
                    if(arr[i] == num)
                      total++
              }
              return total
            }

            for(let i =0;i<asd.length;i++){
                let arr:any[] = []
                for(let j =0;j<=9;j++){
                    if(check(asd[i],j)){
                      arr.push({number:j,choose:check(asd[i],j)})
                    }else{
                      if(i == 0 ){
                            arr.push({number:1,choose:0})
                        }else{
                            if(totals[i-1][j].choose > 0){
                                arr.push({number:1,choose:0})
                            }else{
                                arr.push({number:totals[i-1][j].number + 1, choose:0})
                            }
                        }
                    }
                }   
              //arr.unshift({number:('00' + i).slice(-2) + '期'})
              totals.push(arr)
            }

            for(let i =0;i<totals.length;i++){
                totals[i].unshift({number:this.historyRecord[i].number, choose:false})
            }
            totals = totals.map(ele => ele.filter(item => item.choose).length ? ele : [ele[0], {'noNumber':'等待开奖'}])
            console.log(totals)
            this.trendData = totals
          
        }

        getKuaduData(){
          let asd = [], totals = []
          this.historyRecord.forEach(ele => {
                if(ele.history[0]){
                    let tempArr = ele.history.slice(this.position[0],this.position[1])
                    asd.push(Math.max(...tempArr) - Math.min(...tempArr))
                }else
                    asd.push(-1)
               
          })
          console.log(asd)

          for(let i =0;i<asd.length;i++){
            let arr:any[] = []
            for(let j =0;j<=9;j++){
                if(j == asd[i]){
                  arr.push({number:j,choose:true})
                }else{
                  if(i == 0 ){
                        arr.push({number:1,choose:false})
                    }else{
                        if(totals[i-1][j].choose ){
                            arr.push({number:1,choose:false})
                        }else{
                            arr.push({number:totals[i-1][j].number + 1, choose:false})
                        }      
                      }
                }
        }   
          //arr.unshift({number:('00' + i).slice(-2) + '期'})
          console.log(arr)
          totals.push(arr)
        }

        for(let i =0;i<totals.length;i++){
            totals[i].unshift({number:this.historyRecord[i].number, choose:false})
        }
        console.log(totals)
        totals = totals.map(ele => ele.filter(item => item.choose).length ? ele : [ele[0], {'noNumber':'等待开奖'}])
        console.log(totals)
           this.kuaDuData = totals
        }

  //计算冷热
  getColdHot(){
    let arr = [],asd = []
    for(let i =0; i<= 9; i++){
        arr.push(i)
    }

    this.historyRecord.forEach(ele => {
         let tempArr = ele.history.slice(this.position[0],this.position[1])
         asd.push(Math.max(...tempArr) - Math.min(...tempArr))
    })

    this.lengreData = arr.map(number => {
        let leng30 = asd.slice(-30).filter(item => number == item).length
        let leng60 = asd.slice(-60).filter(item => number == item).length
        let leng100 = asd.slice(-90).filter(item => number == item).length
        let yilou = asd.length - asd.lastIndexOf(number) - 1
        return {number, leng30, leng60, leng100, yilou}
    })
  }  

  getTitle(item){
    switch(item) {
      case 'hot':
           return '出现次数';
      case 'average':
           return '平均遗漏';
      case 'max':
           return '最大遗漏';
      case 'current':
           return '当前遗漏';                       
    }
  }

  processData(number){
      if(this.common.smallMethod == '特殊号码'){
        switch(number) {
            case 0:
                 return '豹子';
            case 1:
                 return '顺子';
            case 2:
                 return '对子';                     
          }
      }else
          return number
  }

  refreshData():Promise<any>{
    console.log('fwfwfwef')
    this.produceAllData()
    return new Promise((resolve,reject) =>{
      resolve()
    })
  }
}
