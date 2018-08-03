import {Directive, ElementRef,  Renderer, EventEmitter} from '@angular/core';

/**
 * Generated class for the BallTouchDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[ball-touch]' // Attribute selector
})
export class BallTouchDirective {

  constructor(private el:ElementRef, private renderer:Renderer) {
    console.log('Hello BallTouchDirective Directive');

    el.nativeElement.addEventListener('touchstart', () => {console.log('sssd')}, false)
    
  }

}
