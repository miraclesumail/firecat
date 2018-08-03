import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular'
/**
 * Generated class for the CountTipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'count-tip',
  templateUrl: 'count-tip.html'
})
export class CountTipComponent {
  count = 3
  text: any;

  constructor(public params:NavParams, public viewCtrl:ViewController) {
      this.text = params.get('qishu')
      let timmers = setInterval(() => {
               this.count--
               if(this.count == 0){
                     clearInterval(timmers)
               }
      },1000)
  }

  
}
