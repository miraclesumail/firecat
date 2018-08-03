import { Component } from '@angular/core';

@Component({
  selector: 'k3-base-trend',
  templateUrl: './k3-base-trend.html'
})
export class K3BaseTrendComponent {

  resultsData = {data:[]}

  k3Blankit = [0]
  constructor() {

  }

  ngAfterViewInit(){
    console.log(this.resultsData)
  }


}
