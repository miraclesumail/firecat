import { CommonProvider } from '../providers/common/common'

import { UtilProvider } from '../providers/util/util'
import { BasketDataProvider } from '../providers/basket-data/basket-data'
import * as $ from 'jquery'



$.fn.Press = function(fn1,fn2) {
    var timeout ;
    var $this = this;
    for(var i = 0;i<$this.length;i++){
        console.log($this[i])
        $this[i].addEventListener('touchstart', function(event) {
            console.log('dddd')
            timeout = setTimeout(fn1, 0);  //长按时间超过800ms，则执行传入的方法
            }, false);
        $this[i].addEventListener('touchend', function(event) {
            // setTimeout(fn2, 100);
           
            if (true) {
              fn2()
            }
            clearTimeout(timeout);  //长按时间少于800ms，不会执行传入的方法
            }, false);
    }
  }

export class commonMethod{
    choices:any[] = []
    timer:any = null;
    arr:any = []

   constructor(public common:CommonProvider, public util:UtilProvider,public basket:BasketDataProvider) {
        $('body').on('touchstart', '.ball-choose li', function(){
            $(this).find('.tip-block').show()
        }).on('touchend', '.ball-choose li', function(){
            $(this).find('.tip-block').hide()
        })
   }

  
   qqq(number){
    return number + 5
  }

  ppp(number){
    return ('0' + (number + 7)).slice(-2)
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

    getWei(str){
        switch(str){
            case 'w':
                return '万位'
            case 'q':
                return '千位'
            case 'b':
                return '百位'  
            case 's':
                return '十位'  
            case 'g':
                return '个位'                  
           }
    }

    getDWei(str){
        switch(str){
            case 'yiwei':
                return '一位'
            case 'erwei':
                return '二位'
            case 'sanwei':
                return '三位'               
           }
    }

    toggle(index,number){
        // 少于2个 选择
        if(this.choices.filter(ele => ele.choose).length == number && this.choices[index].choose )
           return 
        this.choices = this.choices.map((ele,indexs) => {
            if(index == indexs)
              return {...ele,choose:!ele.choose}
            else
              return ele
        })
        this.calculate()
     }

      changeToggle(row,column){
        if(column!=null){
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == row){
                item.value = item.value.map((ele,index) => {
                    if(index == column){
                        return ele == 1 ? 0 : 1
                    }else{
                        return ele
                    }
                })
                return item
            }else{
                return item
            }
        })
        }
        this.common.btn = this.common.btn.map((ele,index) => {
             if(row == index){
                 ele = ele.map(item => {return {...item, flag:false}})
                 return ele
             }else{
                 return ele
             }   
        })

        this.common.singleBtn= this.common.singleBtn.map(ele => {     
              return {...ele, flag:false}    
        })
        this.calculate()
    } 

    getOriginData():any{
     // let erchong = [], danhao = []
      let first = [], second = []
      this.common.ballData.forEach((ele,index) => {
           if(index == 0){
              ele.value.forEach((item,index) => {
                  if(item)
                    first.push(index)
              })
           }else{
              ele.value.forEach((item,index) => {
                  if(item)
                    second.push(index)
               })
           }
      })
      return {first, second}
   }

   getCommonData():any[]{
        let arr = []
        this.common.ballData.forEach((ele,index) => {
            let temp = []
            ele.value.forEach((item,index) => {
                if(item)
                    temp.push(index)
            })
            arr.push(temp)
        })
        return arr
   }

   /**
    * 
      [1,2,3,4] [2,3,4] [5,6,7]
      完全展开数组
    */
   getLotteryData(){
       return this.combination(this.getCommonData())
   }

   getLotteryText():any{
       if(this.common.series_id == 2)
         return this.getCommonData().filter(ele => ele.length > 0).map(ele => ele.map(item => ('0' + item).slice(-2) + '').join(' ')).join('|')
       else
         return this.getCommonData().filter(ele => ele.length > 0).map(ele => ele.map(item => item).join(' ')).join('|')
   }

   getOriginLotteryText(){
        if(this.common.series_id == 1)
            return this.getCommonData().filter(ele => ele.length > 0).map(ele => ele.join('')).join('|')  
        if(this.common.series_id == 2)
            return this.getCommonData().map(ele => ele.map(item => ('0' + (item + 1)).slice(-2)).join(' ')).join('|')
            //return this.getCommonData().filter(ele => ele.length > 0).map(ele => ele.map(item => item + 1).join('')).join('|')
   }

   getPositionArr(){
       return this.choices.length == 0? '' : this.choices.map(ele => ele.choose ? 1 : 0)
   }

   combination(arr2) {
        if (arr2.length < 1) {
            return [];
        }
        var w = arr2[0].length,
            h = arr2.length,
            i, j,
            m = [],
            n,
            result = [],
            _row = [];

        m[i = h] = 1;
        console.log(m)
        while (i--) {
            m[i] = m[i + 1] * arr2[i].length;
        }
        n = m[0];
        for (i = 0; i < n; i++) {
            _row = [];
            for (j = 0; j < h; j++) {
                _row[j] = arr2[j][~~(i % m[j] / m[j + 1])]
            }
            result[i] = _row;
        }
        return result
    }

    //机选注单
    randomChoose(number?, tempData?){
        let temp = tempData ? tempData : []
        if(number){
            this.randomOneOrder() 
            temp.push(this.basket.processOrder())

            if(number == 1){
                console.log(temp)
                this.basket.addBetData(temp) 
                return 
            }
            this.randomChoose(--number,temp)
            
        }else{
               // $("ul" ).not( ".statistic" ).find('li').removeClass('current');
             this.randomOneOrder() 
        }   
    }

    randomOneOrder(){
        this.common.ballData = this.common.ballData.map(item => {
            let random = Math.floor(Math.random()*item.value.length)
            //let arr = this.generateTwo(number)
            let balls = item.value.map((ele,index) => index == random ? 1 : 0)
            item.value = balls
            return item
        })
        this.calculate()
    }

    //游戏随机动画
    randomAnimateChoose(){
        console.log('suiji 1zhu')
        if(this.timer)
            return 
        this.util.resetData()
        let count = 0
        this.timer = setInterval(() => {
            this.common.ballData.forEach((item,index) => {
                if(index == count){
                    let random = Math.floor(Math.random()*item.value.length)
                    //let arr = this.generateTwo(number)
                    item.value[random]= 1    
                }       
            })
            console.log(this.common.ballData) 
            if(count == this.common.ballData.length - 1){
                clearInterval(this.timer)
                this.timer = null
                this.calculate()
            }
            count++
           
        },100)
    }

    createRandom(number):any[]{
        let arr = [0,1,2,3,4],data = []
        for(let i=0;i<number;i++){
            let temp = []
            let random = Math.floor(Math.random()*arr.length)
            temp.push(arr[random], Math.floor(Math.random()*10))
            arr.splice(random,1)
            data.push(temp)
        }
        return data
     }

     //奇偶 全清
     changeActive(index,choice,name){
        this.changeChooseStatus(index,choice)
    
    //this.changeChooseStatus(index,choice)
     switch(name){
         case "全":
             this.changeAll(index)
             break;
         case "奇":
             this.changeOdd(index)
             break;
         case "偶":
             this.changeEven(index)
             break;
         case "大":
             this.changeBig(index)
             break;
         case "小":
             this.changeSmall(index)
             break;
         case "清":
             this.changeClear(index)
             break;

     }
     this.calculate()
     //this.common.calculate()
    }

    changeXuanActive(index,choice,name){
        this.changeChooseStatus(index,choice)

        switch(name){
            case "全":
                this.changeAll(index)
                break;
            case "奇":
                this.changeXuanOdd(index)
                break;
            case "偶":
                this.changeXuanEven(index)
                break;
            case "大":
                this.changeBig(index)
                break;
            case "小":
                this.changeSmall(index)
                break;
            case "清":
                this.changeClear(index)
                break;
        }
        this.calculate()
    }

    changeClear(line){
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map(ele => 0)
                return item
            }else{
                return item
            }
        })       
    }

    changeAll(line){
        console.log(line)
      
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map(ele => 1)
                return item
            }else{
                return item
            }
        })      
    }

    changeBig(line){
     
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map((ele,index) => index > 4? 1:0)
                return item
            }else{
                return item
            }
        })
        
    }

    changeSmall(line){
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map((ele,index) => index > 4? 0:1)
                return item
            }else{
                return item
            }
        })     
    }

    changeOdd(line){
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map((ele,index) => index %2 == 0? 0 : 1)
                return item
            }else{
                return item
            }
        })   
    }

    changeXuanOdd(line){
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map((ele,index) => (index+1) %2 == 0 ? 0 : 1)
                return item
            }else{
                return item
            }
        })   
    }

    changeEven(line){    
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map((ele,index) => index %2 == 0? 1 : 0)
                return item
            }else{
                return item
            }
        })  
    }

    changeXuanEven(line){    
        this.common.ballData = this.common.ballData.map((item,index) => {
            if(index == line){
                item.value = item.value.map((ele,index) => (index+1) %2 == 0? 1 : 0)
                return item
            }else{
                return item
            }
        })  
    }

    changeChooseStatus(index1,index2){
        this.common.btn = this.common.btn.map((item,index) => {
            if(index == index1){
                let ele = item.map((todo,order) => order == index2 ? {...todo,flag:true}:{...todo,flag:false})
                return ele
            }else{
                return item
            }
        }) 
    }

    //计算注数
     getCount():any{
        let count = 1;
        this.common.ballData.forEach((item,index) => {
            count *=  item.value.filter(ele => ele == 1).length
        })
        return count
     }

    //计算注单
    calculate(){
        this.common.count = this.getCount()
        console.log(this.common.count)
        let percent = this.common.tabYuan == '元' ? 1 : this.common.tabYuan == '角' ? 0.1 : 0.01
        this.common.betPrice = this.common.count*2*percent
        this.common.profits = this.util.formatMoney(this.common.bonus - this.common.betPrice)
    }

    mathResult(sum, nBegin, nEnd){
        var arr = [],
          x,y;
    
          for (x=nBegin;x<=nEnd ;x++ ){
            for (y=nBegin;y<=nEnd ;y++ ){
              if(x+y == sum){
                arr.push([x,y]);
              }
            }
          }
          return arr
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

      //检测遗漏最大值
      checkMax(ele,arr){
          return ele == Math.max(...arr) ? true : false
      }

      //冷热标记
      checkLengRe(ele,arr){
          if(ele == Math.max(...arr)){
              return 'high'
          }else if(ele == Math.min(...arr)){
              return 'low'
          }else{
              return ''
          }
      }

}