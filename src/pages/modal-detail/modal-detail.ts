import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ModalDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-detail',
  templateUrl: 'modal-detail.html',
})
export class ModalDetailPage {
	dataWaktu: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public storage: Storage) {
  }

  ionViewWillLoad() {
    this.dataWaktu = this.navParams.get('val');
  }

  hapus(){
  	this.storage.get('detail').then((val) => {
  		let a = JSON.parse(val);
      if (a.length == 1) this.storage.remove('detail');
      else {
        a.forEach((item,index) => {
          if (item.tanggal == this.dataWaktu.tanggal){
            a.splice(index,1);
            this.setStorage(a)
          }
        });
      }
  	});
    this.viewCtrl.dismiss('ok');
  }


  setStorage(val){
  	return this.storage.set('detail',JSON.stringify(val));
  }

  close(){
  	this.viewCtrl.dismiss();
  }

  dismissModal(){
    this.close();
  }

}
