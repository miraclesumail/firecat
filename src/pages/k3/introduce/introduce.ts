import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-introduce',
  templateUrl: 'introduce.html',
})
export class IntroducePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewWillEnter() {

    console.log('wanfa hsuoming ~~~~')
   if(localStorage.which==3){

     $('.lhc_introduce').addClass('hide');
     $('.k3_introduce').removeClass('hide');

   }else{
     $('.lhc_introduce').removeClass('hide');
     $('.k3_introduce').addClass('hide');
   }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroducePage');
  }

}
