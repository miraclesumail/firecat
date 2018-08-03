import { Component, Input} from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the HousanyimabudingweiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'housanyimabudingwei',
  templateUrl: 'housanyimabudingwei.html'
})
export class HousanyimabudingweiComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider, public util:UtilProvider,public basket:BasketDataProvider){
    super(common,util,basket)
    console.log('Hello HousanyimabudingweiComponent Component');
    this.text = 'Hello World';
  }

  qqq(number){
    return number + 5
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }
  
}