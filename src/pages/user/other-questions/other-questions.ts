import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClientProvider} from '../../../providers/http-client/http-client'

@IonicPage()
@Component({
  selector: 'page-other-questions',
  templateUrl: './other-questions.html',
})
export class OtherQuestionsPage {
  userInfo;
  QAQdata = {parent: {name: '', id: 4}, data: [{id: 4, title: '', content: ''}]}

  constructor(public http: HttpClientProvider, public navCtrl: NavController, public navParams: NavParams) {

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (this.navParams.data.data) {
      this.QAQdata.parent = this.navParams.data.data
      this.getQasContext(this.QAQdata.parent.id).then(data => {
        this.QAQdata.data = data.data
      })
    } else {
      this.getQasContext(this.QAQdata.parent.id).then(data => {
        this.QAQdata.data = data.data
      })
    }

  }

  async getQasContext(id) {
    return await this.http.fetchData('/h5api-announcements/getarticles?cid=' + id)
  }


}
