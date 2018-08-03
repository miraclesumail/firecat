import {Component} from '@angular/core';
import {HttpClientProvider} from '../../../providers/http-client/http-client'


@Component({
  selector: 'y-distribute',
  templateUrl: './y-distribute.html'
})
export class YDistributeComponent {
  userInfo;
  resultsData = {data:[]}
  lottoryId = '0'

  distribute = {
    sazi: [1, 2, 3, 4, 5, 6],
    missed: {
      average: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      current: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hot: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      max: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  }

  constructor(public http: HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.lottoryId = localStorage.getItem('lottoryId');
    this.loadthirty('ninetyData', 90, this.lottoryId)
  }

  async loadthirty(group, num, id) {
    await this.http.fetchData('/api-lotteries-h5/getnewlottterymissed/' + id + '/' + num ).then(data => {
      console.log(data)
      // this.distribute[group]=data.data.k3dtys.hot;
      if(data.IsSuccess){
        this.distribute.missed = data.data.eleven
      }


    })
  }

}
