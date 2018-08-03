import { NavController, NavParams } from 'ionic-angular';

export abstract class ComonDef{

  constructor(public navCtrl: NavController ){

  }

  pushPage(page) {
    this.navCtrl.push(page);
  }
}











