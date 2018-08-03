import { Component, Output, EventEmitter } from '@angular/core';
import { CommonProvider } from '../../providers/common/common'
import { UtilProvider } from '../../providers/util/util'
import { BasketDataProvider } from '../../providers/basket-data/basket-data'
import * as $ from 'jquery'

import { ToolsProvider } from '../../providers/tools/tools'
/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
let tt = 0;

function easeOutCubic(t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
}

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {
  @Output('goBasket') goBasket:EventEmitter<any> = new EventEmitter<any>()
  @Output('clear') clear:EventEmitter<any> = new EventEmitter<any>()
  
  text: string;

  constructor(public common:CommonProvider, public util:UtilProvider,public tool:ToolsProvider,public basket:BasketDataProvider) {
    console.log('Hello FooterComponent Component');
    this.text = 'Hello World';
  }

   //添加至购彩篮
   addToCart(){
      // console.log(dom.innerText)
      if(this.common.count == 0){return}
      console.log(this.common.cartNumber)
      // 把数据放进购彩蓝  如果超过余额
      let flag = this.basket.addBetData()
        
      if(flag){
        $('<div id="ball"></div>').appendTo($('#bet-statistic'));
        console.log('move')
        this.move()
        this.util.resetData()
      }  
   }

   goToBasket(){
      if(!this.common.count && !this.basket.betData.length)
         return 

      if(this.common.count)
         this.basket.addBetData()
      this.goBasket.emit()
   }

   move(){
    tt += 1000/60;
    let width = document.getElementById('bet-statistic').offsetWidth
    let ball = document.getElementById('ball');
    if(tt < 600){
        let left = Math.ceil(easeOutCubic(tt,50,width,600))
        ball.style.left = left + 'px'

        // let high = -(width*(left - 150 ) -((left - 150)*(left - 150)))/500;
        let high = width*width/1200
        let top = -(width - left + 50)*(left -50)/200
        // y = -(x- width)x/300 = (width - left + 150)(left -150)/300   high = width*width/1200
        ball.style.top =  top  + 'px'
        if(Math.abs(top)>=high){
            let time = 600 - tt
            $('#ball').animate({width:0,height:0},time,function(){
                console.log('finish')
            })
        }
        top = Math.abs(high)

        requestAnimationFrame(this.move.bind(this))
    }else{
        this.common.cartNumber++
        $('#ball').remove()
        tt = 0
    }
   }

  clearData(){
      this.clear.emit()
  }
}
