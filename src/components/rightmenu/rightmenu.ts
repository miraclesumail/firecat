import { Component,Input,Output,EventEmitter } from '@angular/core';
import * as $ from 'jquery'
import { NavController} from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common'

/**
 * Generated class for the RightmenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rightmenu',
  templateUrl: 'rightmenu.html'
})
export class RightmenuComponent {
  @Input('menus')menus:any;
  @Input('open')open:any;
  @Output('switch') change: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(public navCtrl:NavController, public common:CommonProvider) {
    console.log('Hello RightmenuComponent Component');
  }

  switch(val){
    //this.change.emit(title)
    
    this.common.open = false

    $('.tri-arrow').removeClass('current')
    this.common.visible = 'invisable'
    $('.body-bg').fadeOut(300)
    if(val == '走势图')
       this.navCtrl.push('GameTrendPage',{'index':1}) 

    if(val == '近期开奖')
       this.navCtrl.push('GameTrendPage',{'index':0})   

    if(val == '玩法说明')  
       this.navCtrl.push('PlayHelpPage')

    if(val == '号码统计'){
        if($('.modal').hasClass('active')){
            $('.body-bg').fadeOut(300)
        }else{
            $('.body-bg').fadeIn(300)
        }
        $('.modal').toggleClass('active')

    }         
  }
}
