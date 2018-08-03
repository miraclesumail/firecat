import { Component, Input} from '@angular/core';
import { CommonProvider } from '../../../../providers/common/common'
import { ToolsProvider } from '../../../../providers/tools/tools'
import { UtilProvider } from '../../../../providers/util/util'
import { commonMethod } from '../../../common.method'
import { BasketDataProvider } from '../../../../providers/basket-data/basket-data'

/**
 * Generated class for the QiansanyimabudingweiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'qiansanyimabudingwei',
  templateUrl: 'qiansanyimabudingwei.html'
})
export class QiansanyimabudingweiComponent extends commonMethod{
  @Input('choose') choose: any[] = [];
  
  text: string;

  constructor(public common:CommonProvider, public tool:ToolsProvider, public util:UtilProvider,public basket:BasketDataProvider){
    super(common,util,basket)    
    this.text = 'Hello World';
  }

  check(choice){
    return this.choose.indexOf(choice) > -1
  }
}
