import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClientProvider } from '../../../providers/http-client/http-client'


@IonicPage()
@Component({
  selector: 'page-help-center',
  templateUrl: './help-center.html',
})
export class HelpCenterPage {
  questionList = [{id:4,name:''}]
  commonList = [{content:'',title:''}]
  iconList = ['question','account','transfer','lottory','clain','safety','method','football','gamimg']

  constructor(public http:HttpClientProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.getQuestions();
  }

  pushPage(question) {
      this.navCtrl.push('OtherQuestionsPage',{
        data:question
      })
    // })


  }

  async getQuestions(){
    await this.http.fetchData('/h5api-announcements/getcategorylist?parent_id=3').then(data=>{
      if(data.IsSuccess){
        this.questionList = data.data;
        this.getQasContext(this.questionList[0].id).then(data=>{
          this.commonList = data.data;
          for(let item of this.commonList){
            item.flag = false
          }
          this.commonList[0].flag=true;
          console.log(this.commonList)
        })
      }
    })
  }

  async getQasContext(id){
    return await this.http.fetchData('/h5api-announcements/getarticles?cid='+id)
  }

  toggleDetail(question){
    question.flag = !question.flag
  }

}
