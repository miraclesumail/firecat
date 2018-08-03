import { Component } from '@angular/core';
import { CommonProvider } from '../../../providers/common/common'

/**
 * Generated class for the HouerdaxiaodanshuangComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'houerdaxiaodanshuang',
  templateUrl: 'houerdaxiaodanshuang.html'
})
export class HouerdaxiaodanshuangComponent {

  text: string;

  constructor(public common:CommonProvider) {
    console.log('Hello HouerdaxiaodanshuangComponent Component');
    this.text = 'Hello World';
  }

  
}
