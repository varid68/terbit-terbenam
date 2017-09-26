import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController } from 'ionic-angular';

/**
 * Generated class for the TentangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tentang',
  templateUrl: 'tentang.html',
})
export class TentangPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController) {}

  openModal(){
  	let modal = this.modalCtrl.create('ModalTentangPage');
    this.viewCtrl.dismiss().then(() => {
      modal.present();
    })
  }

}
