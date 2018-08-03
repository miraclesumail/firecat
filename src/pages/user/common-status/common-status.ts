import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-common-status',
  templateUrl: './common-status.html',
})
export class CommonStatusPage {

  statusData = {
    status:'',
    text:'waiting'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.statusData = this.navParams.data;
  }

}
