import { Component } from '@angular/core';

/**
 * Generated class for the DiermingfushiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'diermingfushi',
  templateUrl: '../pk10.html'
})
export class DiermingfushiComponent {

  text: string;

  constructor() {
    console.log('Hello DiermingfushiComponent Component');
    this.text = 'Hello World';
  }

}
