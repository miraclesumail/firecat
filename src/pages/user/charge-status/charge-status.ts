import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-charge-status',
  templateUrl: './charge-status.html',
})
export class ChargeStatusPage {
  statusData= {
    bank:'',
    money:0.00,
    status:null,
    statusText:''
  }

  constructor( public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    console.log(this.navParams)
    this.statusData ={
      bank: this.navParams.get('bank'),
      money:this.navParams.get('money'),
      status: this.navParams.get('status'),
      statusText: this.navParams.get('statusText')
    }
  }


  viewDismiss(){
    this.navCtrl.pop()
  }
}
