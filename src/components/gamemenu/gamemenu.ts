import { Component,Input,Output,EventEmitter,OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { trigger ,state,transition,animate,style} from "@angular/animations";
import { CommonProvider } from "../../providers/common/common";
import { Events } from 'ionic-angular';

import * as $ from 'jquery';
import { UtilProvider } from '../../providers/util/util'

/**
 * Generated class for the GamemenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'gamemenu',
  templateUrl: 'gamemenu.html',
  animations:[
      trigger('fading',[
          state('visable',style({
              opacity: 1,
              transform:'scale(1,1)'
              //transform:'translate3d(0, 0, 0)'
          })),
          state('invisable', style({
              opacity: 0,
              transform:'scale(1,0)'
              //transform:'translate3d(0, -100%, 0)'
          })),
          transition('* => *',animate('.3s'))
      ])
  ]
})
export class GamemenuComponent implements OnDestroy{
    @Output('switch') switch:EventEmitter<any> = new EventEmitter<any>()
    @Output('changeMethod') changeMethod:EventEmitter<any> = new EventEmitter<any>()
    @Input('isPlay') isPlay:any
    choosen:any;

    //大玩法
    method:string;
    small:any;
    //小玩法
    smallMethod:string;

    bigIndex:number = 0;


    constructor(public common:CommonProvider,public util:UtilProvider, public events:Events) {
       console.log('Hello GamemenuComponent Component');
   
    }

    ngOnDestroy(){
        console.log('destroy')
        //this.events.unsubscribe('getMethod')
    }

    // dawan fa
    setMethodIndex(index){
        this.bigIndex = index
       // this.method = this.common.gameMethodConfig[index].name_cn
        this.common.bigId = this.common.gameMethodConfig[index].id
        if(this.common.gameMethodConfig[index].children.length){
            this.common.small = this.common.gameMethodConfig[index].children
            console.log(this.common.smallId)
            //this.smallMethod = this.common.gameMethodConfig[index].children[0].children[0].name_cn
        }
        console.log('dddddd')
        //this.switch.emit(this.method + this.smallMethod)
    }

    //小玩法切换
    setSmallIndex(j,k){
        this.common.toggle()
        let index ;
     
        // if(this.common.gameMethodConfig[this.bigIndex].name_cn == this.common.method 
        //     && this.common.secondKind == this.common.gameMethodConfig[this.bigIndex].children[j].name_cn
        //     && this.common.smallMethod == name
        // ){
        //     console.log('same')
        //     //this.toggle()
        //     return 
        // }
       // let index = $('.big-method li.active').index()
console.log(this.bigIndex,j,k)
console.log(this.common.gameMethodConfig[this.bigIndex].children[j].children[k])

        if(this.common.tempSmallId == this.common.gameMethodConfig[this.bigIndex].children[j].children[k].id){
            console.log('same')
            return 
        }

     
        this.common.setGameConfig(this.bigIndex,j,k)
        this.util.resetData()

        // console.log(name)
        console.log(this.common.secondKind)

        if(this.common.method == '二星' || this.common.method == '任选'){
            this.switch.emit(this.common.method + this.common.secondKind + this.common.smallMethod)
        }else{
            this.switch.emit(this.common.method + this.common.smallMethod)
        }
    }


    //点击黑色背景
    toggle(){
        console.log('dddd')
        this.common.visible = 'invisable';
      
        $('.body-bg').fadeOut(300)
    }

    changeActive(i){
        
        console.log(i)
        console.log($('.play-li').eq(i))
         $('.play-li').eq(i).addClass('active').siblings().removeClass('active')
         this.changeMethod.emit($('.big-method li').eq(i).text())
         this.common.toggle()
    }
}
