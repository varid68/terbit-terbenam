import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalTentangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-tentang',
  templateUrl: 'modal-tentang.html',
})
export class ModalTentangPage {

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public viewCtrl: ViewController) {
  }


  close(){
  	this.viewCtrl.dismiss();
  }

  dismissModal(ev){
    this.close();
  }

}
