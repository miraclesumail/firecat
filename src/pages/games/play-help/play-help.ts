import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common'
/**
 * Generated class for the PlayHelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play-help',
  templateUrl: 'play-help.html',
})
export class PlayHelpPage {
  playInstructions:any[] 

  gameMethod:any

  targetGame:any[]

  detailInfo:any[]


  constructor(public navCtrl: NavController, public navParams: NavParams, public common:CommonProvider) {
    console.log(this.common.gameMethodConfig)

   this.gameMethod = this.common.method 
   if(this.common.series_id==1)
      this.detailInfo = [
        ['黑龙江时时彩', '08:50-22:40', '10分钟', '84期', '08:48:00', '22:38:00'],
        ['新疆时时彩', '10:10-02:00', '10分钟', '96期', '10:08:00', '01:58:30'],
        ['天津时时彩', '09:10-23:00', '10分钟', '84期', '09:07:30', '22:57:30'],
        ['夺金60秒', '全天', '1分钟', '1440期', '00:01:00', '24:00:00'],
        ['金星1.5分彩', '09:00-06:00', '1.5分钟', '840期', '09:01:30', '06:00:00'],
        ['腾讯分分彩', '全天', '1分钟', '1440期', '00:01:00', '24:00:00']
    ]
   else
      this.detailInfo = [
        // ['山东11选5', '08:35-22:55', '10分钟', '87期', '08:33:30', '22:53:30'],
        ['广东11选5', '09:10-23:00', '10分钟', '84期', '09:09:00', '22:59:00'],
        ['江西11选5', '09:10-23:00', '10分钟', '84期', '09:08:00', '22:58:00'],
        ['山东11选5', '08:35-22:55', '10分钟', '87期', '08:33:30', '22:53:30'],
        // ['江苏11选5', '08:35-22:05', '10分钟', '82期', '08:33:00', '22:03:00'],
        ['上海11选5', '09:00-23:50', '10分钟', '90期', '00:01:00', '24:00:00'],
        ['山西11选5', '08:26-23:56', '10分钟', '94期', '08:24:00', '23:54:00'],
        ['安徽11选5', '08:41-22:01', '10分钟', '81期', '08:39:00', '21:59:00']
      ]

   this.playInstructions =  this.common.gameMethodConfig.reduce((a,b) => {
        let name = b.name_cn, arr = []
        b.children.forEach(ele => {
            ele.children.forEach(item => {
                arr.push({name:item.name_cn, tip:item.bet_note})
            })
        })
        a.push({method:name, children:arr})
        return a
    },[])

    this.targetGame = this.playInstructions.filter(ele => ele.method == this.gameMethod)
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayHelpPage');
  }

  changeMethod($event){
      console.log($event)
      this.targetGame = this.playInstructions.filter(ele => ele.method == $event)
  }
}
