import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClientProvider } from '../../../providers/http-client/http-client'


@IonicPage()
@Component({
  selector: 'page-bank-list',
  templateUrl: './bank-list.html',
})
export class BankListPage {

  currentBank=null
  userInfo;
  callback;
  bankList=[{
    id:0,
    name:'',
    identifier:''
  }]

  constructor(public http:HttpClientProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.callback = this.navParams.get("callback")
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.currentBank = this.navParams.data
  }

  ionViewDidLoad() {
    this.getAllBankList().then(data=>{
      this.bankList = data.data
    })
  }

  async getAllBankList(){
    return await this.http.fetchData('/h5api-bank-cards/getallbanklist?_t='+this.userInfo.auth_token)
  }

  selectBank(bank){
    let currentBank = bank
    this.callback(currentBank).then((data)=>{
      console.log(data)
      this.navCtrl.pop();
    });
  }

}
