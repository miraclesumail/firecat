import { Component } from '@angular/core';

@Component({
  selector: 'lhc-shengxiao',
  templateUrl: './lhc-shengxiao.html'
})
export class LhcShengxiaoComponent {

  shengxiao = {
    niu: ['10', '22', '34', '46'],
    hu: ['09', '21', '33', '45'],
    tu: ['08', '20', '32', '44'],
    long: ['07', '19', '31', '43'],
    she: ['06', '18', '30', '42'],
    ma: ['05', '17', '29', '41'],
    yang: ['04', '16', '28', '40'],
    hou: ['03', '15', '27', '39'],
    ji: ['02', '14', '26', '38'],
    gou: ['01', '13', '25', '37', '49'],
    pig: ['12', '24', '36', '48'],
    shu: ['11', '23', '35', '47']
  }
  resultsData = {data:[]}

  constructor() {

  }

}
