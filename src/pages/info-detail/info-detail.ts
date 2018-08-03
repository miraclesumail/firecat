import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-info-detail',
  templateUrl: 'info-detail.html',
})
export class InfoDetailPage {

  detail = {updated_at:'',title:"",content:''}
  title = ''
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.detail = navParams.data.detail
    this.title = navParams.data.title
    console.log(this.detail)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoDetailPage');
  }

}
