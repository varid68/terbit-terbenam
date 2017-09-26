import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
/**
 * Generated class for the TentangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-simpan',
  templateUrl: 'simpan.html',
})
export class SimpanPage {
	list: any;
  kosong: boolean;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public alertCtrl: AlertController,
    public modalCtrl: ModalController,
  	public storage: Storage) {
  }

  ionViewWillEnter() {
    this.storage.get('detail').then((val) => {
    	if (val !== null){
	    	this.list = JSON.parse(val);
        this.kosong = false;
    	}
      else {
        this.kosong = true;
      }
    })
  }

  back(){
  	this.navCtrl.pop();
  }

  ambilTanggal(tanggal){
    let a = tanggal.split(", ");
    let hariAngka = a[1].substring(0,2);

    return hariAngka;
  }

  ambilBulan(tanggal){
    let a = tanggal.split(", ");
    let b = a[1].split(' ');
    let bulan = b[1].substring(0,6);

    return bulan;
  }

  hapusRiwayat(){
  	let alert = this.alertCtrl.create({
    title: 'Confirm Delete',
    message: 'Apakah Kamu Yakin Ingin Menghapus Semua?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Hapus',
        handler: () => {
          this.storage.remove('detail');
          this.list = null;
          this.kosong = true;
        }
      }]
  	});
  	alert.present();
  }

  detailItem(item){
    let modal = this.modalCtrl.create('ModalDetailPage',{val:item});
    modal.onDidDismiss(data => {
      if (data == 'ok'){
        this.storage.get('detail').then((val) => {
          this.list = JSON.parse(val);
          if (JSON.parse(val) == null){
            this.kosong = true;
          }
        })
      }
    })
    modal.present();
  }

}
