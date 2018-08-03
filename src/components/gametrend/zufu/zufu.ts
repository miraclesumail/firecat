import { Component,Output,ViewChild,ElementRef, EventEmitter} from '@angular/core';
import { Slides } from 'ionic-angular';
import { UtilProvider } from '../../../providers/util/util'
import { CommonProvider } from "../../../providers/common/common"
/**
 * Generated class for the ZufuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zufu',
  templateUrl: 'zufu.html'
})
export class ZufuComponent {
  @ViewChild('contentSlides') contentSlides: Slides;
  
     menus:string[];
    
     choose:string = '开奖';

     category:any[] = ['hot','average','max','current']
     //记录号码走势
     trendData:any[];
  
     chooseIndex:number;
   
     historyRecord: any;
  
     position:any;
   
     load:boolean = false;
   
     kaijiangData:any[];
    
     finish:boolean = false
  
     text: string;
  
     zhixuan:boolean;
  
     fakeTrend:any
  
     sumData:any[]
  

  constructor(public common:CommonProvider,public util:UtilProvider) {
      console.log('Hello ZufuComponent Component');
      this.text = 'Hello World'

      this.historyRecord = this.common.historyList.map(ele => {
        return {...ele, number:ele.number.substr(2,ele.number.length),
          history: this.common.series_id == 2 ? ele.code.split(' ').map(ele => ele ? ('0' + ele).slice(-2) : null) : ele.code.split('').map(ele => parseInt(ele))}
      })
  
      console.log(this.historyRecord)
      console.log(this.common.ballData)
  }

  ngOnInit(){
    console.log(this.chooseIndex)
    console.log(this.position)
    // this.fakeTrend = this.initialArr(this.position[1], this.position[0]).reduce((a,b) =>{
    //   let arr = []
    //   for(let i = 0;i<this.historyRecord.length;i++){
    //       arr.push(+this.historyRecord[i].history[b])
    //   }
    //   a.push(arr)
    //   return a
    // },[])

    this.contentSlides.initialSlide = this.chooseIndex
    this.choose = this.menus[this.chooseIndex]
    this.getKaijiang()
    this.getNumberTrend()   
  }

  getKaijiang(){
    console.log(this.common.method)
    this.kaijiangData = this.historyRecord.map((ele,index) => {
        let sum, gap, daxiao, oddeven
      if(ele.history[0]){
        sum = ele.history.reduce((l,r) => (+l) + (+r))
        let max = Math.max(...ele.history)
        let min = Math.min(...ele.history)
        gap = max - min
        let da = ele.history.filter(el => el >= 6).length
        daxiao = da + ':' + (5 - da)
        let odd = ele.history.filter(el => el%2 != 0).length
        oddeven = odd + ':' + (5 -odd)
      }
    
      return ele.history[0]? {...ele, sum,gap, daxiao, oddeven} : ele
    })
   // return  
  }  

  initialArr(end, start = 0){
    return Array.apply(null, Array(end - start)).map((v,i) => i + start)
  }

  getNumberTrend(){
    // let asd = [[3,4,5],[5,6,7],[2,2,3],[4,5,6],[5,5,8],[7,8,9],[1,3,7],[2,4,6],[4,5,9],[5,7,8],[3,6,9]]
        let asd = [],totals = []
        this.historyRecord.forEach(ele => {
              let temp = []
              if(ele.history[0])
                 temp.push(...ele.history.slice(this.position[0],this.position[1]))
              else
                 temp.push(...Array.apply(null, Array(this.position[1] - this.position[0])).map((v,i) => -1))
              asd.push(temp)
        })

        //  let asd = this.initialArr(this.position[1], this.position[0]).reduce((a,b) =>{
        //   let arr = []
        //   for(let i = 0;i<this.historyRecord.length;i++){
        //       arr.push(+this.historyRecord[i].history[b])
        //   }
        //   a.push(arr)
        //   return a
        // },[]), totals = []

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
            for(let j = 1; j<=11; j++){
                if(check(asd[i],j)){
                  arr.push({number:('0' + j).slice(-2),choose:check(asd[i],j)})
                }else{
                  if(i == 0 ){
                        arr.push({number:1,choose:0})
                    }else{
                        if(totals[i-1][j-1].choose > 0){
                            arr.push({number:1,choose:0})
                        }else{
                            arr.push({number:totals[i-1][j-1].number + 1, choose:0})
                        }
                    }
                }
            }   
         
          //arr.unshift({number:('00' + i).slice(-2) + '期'})
          totals.push(arr)
         
        }
        console.log(totals)
        totals = totals.map(ele => ele.filter(item => item.choose).length ? ele : [{'noNumber':'等待开奖'}])
        for(let i =0;i<totals.length;i++){
            totals[i].unshift({number:this.historyRecord[i].number})
        }
        console.log(totals)
        this.trendData = totals
        //this.getComplexData(this.trendData)
    }


    slideChanged(){
      let index = this.contentSlides.getActiveIndex()
      this.choose = this.menus[index]
    }

    ionChange($event){
      console.log($event.value)
      this.contentSlides.slideTo(this.menus.indexOf($event.value))
   }

   existNumber(arr){
    return arr.filter(ele => ele == 1).length ? true : false
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

   processName(name){
     if(this.common.method == '任选复式')
         return this.common.smallMethod.substr(0,3)
    let temp;
    switch(name) {
      case 'danma':
           return '胆码';
      case 'tuoma':
           return '拖码';  
      case 'qiansan':
           return '前三组选'      
      case 'qianer':
           return '前二组选'                 
    }
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
}
