import { Component,Input,Output,EventEmitter,OnInit,ViewChildren,QueryList } from '@angular/core';
import { ToolsProvider } from '../../providers/tools/tools'
import * as $ from 'jquery';

/**
 * Generated class for the MenumodalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menumodal',
  templateUrl: 'menumodal.html'
})
export class MenumodalComponent implements OnInit{
  @Input('hasChoosen')hasChoosen:any[];
  @Output('toggle') change: EventEmitter<any> = new EventEmitter<any>()

  @ViewChildren('qwe') children:QueryList<any>

  chooseCopy:any[] = []

  text: string

  choice:string[] = ['当前遗漏', '30期冷热', '平均遗漏', '最大遗漏']

  constructor(public tool:ToolsProvider) {
    console.log('Hello MenumodalComponent Component');
    this.text = 'Hello World';
  }

  ionViewDidEnter(){
     
  }

  ngOnInit(){
    console.log('dddd')
    setTimeout(() => {
      this.chooseCopy = this.tool.copy(this.hasChoosen,true)
      console.log(this.chooseCopy)
    },0)
   
  }

  toggleChoose(choice,dom){
    $(dom).toggleClass('active')
    if(this.chooseCopy.indexOf(choice) > -1){
         this.chooseCopy.splice(this.chooseCopy.indexOf(choice),1)
    }else{
         this.chooseCopy.push(choice)
    }
    //this.change.emit(choice)
  }

  isActive(item){
    return this.hasChoosen.indexOf(item) > -1
  }

  cancel(){
    console.log(this.children)
    this.children.forEach(ele => {
        console.log(ele.nativeElement)
        let text = $(ele.nativeElement).next('span').text()
        if(this.hasChoosen.indexOf(text) == -1){
           $(ele.nativeElement).removeClass('active')
           if(this.chooseCopy.indexOf(text) != -1)
              this.chooseCopy.splice(this.chooseCopy.indexOf(text),1)
        }else{
           $(ele.nativeElement).addClass('active')
           if(this.chooseCopy.indexOf(text) == -1)
              this.chooseCopy.push(text)
        }
    })
    $('.modal').removeClass('active')
    $('.body-bg').fadeOut(1000)
  }

  confirm(){
    this.change.emit(this.chooseCopy)
    $('.modal').removeClass('active')
    $('.body-bg').fadeOut(1000)
  }
}
