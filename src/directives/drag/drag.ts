import { Directive, ElementRef, Renderer, Output, EventEmitter } from '@angular/core';
import { DomController } from 'ionic-angular';

/**
 * Generated class for the DragDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[drag]' // Attribute selector
})

export class DragDirective {
  @Output() dismiss: any = new EventEmitter();

  constructor(public element: ElementRef, public renderer: Renderer, public domCtrl: DomController) {}

  ngAfterViewInit(){
  	let modal = document.getElementsByTagName('ion-modal')[0];
  	this.renderer.setElementStyle(modal, 'top', 270+'px');

  	let hammer = new window['Hammer'](this.element.nativeElement);
  	hammer.get('pan').set({direction: window['Hammer'].DIRECTION_ALL});

  	hammer.on('pan', (ev) => {
  		this.handlePan(ev);
  	})
  }

  handlePan(ev){
    var end: boolean= true;
  	var newTop: any = ev.center.y -20 ;
  	if (newTop < 0)	newTop = 0;
  	else if (newTop > 500) {
      this.dismiss.emit(ev);
      end = false;
    }

    if (end){
    	this.domCtrl.write(() => {
    		let modal = document.getElementsByTagName('ion-modal')[0];
    		this.renderer.setElementStyle(modal, 'top', newTop +'px');
    	});
    }
  }

}
