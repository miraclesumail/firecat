import { Component } from '@angular/core';
import { HttpClientProvider } from '../../../providers/http-client/http-client'

@Component({
  selector: 'k3-cood-hot',
  templateUrl: './k3-cood-hot.html'
})
export class K3CoodHotComponent {

  lottoryId=0;
  userInfo=null
  k3cood={
    sazi:[1,2,3,4,5,6],
    thirtyData:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0},
    sixtyData:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0},
    ninetyData:{'1':0,'2':0,'3':0,'4':0,'5':0,'6':0}
  }

  constructor(public http:HttpClientProvider) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.lottoryId =parseInt(localStorage.getItem('lottoryId')) ;
    this.loadthirty('thirtyData',30,this.lottoryId)
    this.loadthirty('sixtyData',60,this.lottoryId)
    this.loadthirty('ninetyData',90,this.lottoryId)
  }




  async loadthirty(group,num,id){
     await this.http.fetchData('/api-lotteries-h5/getnewlottterymissed/'+id+'/'+num).then(data=>{
       this.k3cood[group]=data.data.k3dtys.hot;
       console.log(this.k3cood[group])
     })
  }

}
