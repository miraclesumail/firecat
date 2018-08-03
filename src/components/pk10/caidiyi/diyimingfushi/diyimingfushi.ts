import { Component } from '@angular/core';

/**
 * Generated class for the DiyimingfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'diyimingfushi',
  templateUrl: '../pk10.html'
})
export class DiyimingfushiComponent {

  text: string;

  constructor() {
    console.log('Hello DiyimingfushiComponent Component');
    this.text = 'Hello World';
  }

}
