import { Component } from '@angular/core';

/**
 * Generated class for the ZuxuanliuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'zuxuanliu',
  templateUrl: 'zuxuanliu.html'
})
export class ZuxuanliuComponent {

  text: string;

  constructor() {
    console.log('Hello ZuxuanliuComponent Component');
    this.text = 'Hello World';
  }

}
