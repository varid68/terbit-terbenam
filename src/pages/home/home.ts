import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, ToastController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

import * as moment from 'moment-timezone';
import { DataWaktu } from './terbit-terbenam'
import { DatePicker } from '@ionic-native/date-picker';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	tanggal: string;
	dataWaktu: DataWaktu;
	date: any;
  lat: any;
  long: any;
  stillLoading: boolean= true;

  constructor(
  	public navCtrl: NavController, 
  	public popoverCtrl: PopoverController,
  	public toastCtrl: ToastController,
  	public storage: Storage,
  	public datePicker: DatePicker,
  	public restApi: RestApiProvider) {
  }

  ionViewWillLoad() {
    this.getCurrentDate(null);
    this.terbitTerbenam();
    this.lat = -6.2087634;
    this.long = 106.84559899999999;
  }

  toSavePage(){
  	this.navCtrl.push('SimpanPage');
  }


  getCurrentDate(date2){
  	if (date2 == null) date2 = new Date();
  	
  	let hari = date2.getDay();
  	let tanggal = addZero(date2.getDate());
  	let bulan = date2.getMonth();
  	let tahun = date2.getFullYear();

  	function addZero(i){
      if (i < 10)
        i = '0'+i;
      return i;
    }

    let arrayHari = ['Minggu','Senin','Selasa','Rabu','Kamis','jumat','Sabtu'];

    let arrayBulan = ['Januari','Februari','Maret','April',
    'Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

  	this.tanggal = `${arrayHari[hari]}, ${tanggal} ${arrayBulan[bulan]} ${tahun}`;
  }


  terbitTerbenam(){
    this.stillLoading = true;
    this.dataWaktu = {};
    let lat = -6.2087634;
    let long = 106.84559899999999;

  	this.restApi.terbitTerbenam(lat, long, this.date).subscribe((k) => {
  		this.dataWaktu.terbit = this.convertToGmt(k.results.sunrise);
	  	this.dataWaktu.terbenam = this.convertToGmt(k.results.sunset);
	  	this.dataWaktu.lamaBersinar = this.secondToHours(k.results.day_length);
	  	this.dataWaktu.tepatDiatas = this.convertToGmt(k.results.solar_noon);
	  	this.dataWaktu.twilightMulai = this.convertToGmt(k.results.civil_twilight_begin);
	  	this.dataWaktu.twilightEnd = this.convertToGmt(k.results.civil_twilight_end);
	  	this.dataWaktu.nauticalMulai = this.convertToGmt(k.results.nautical_twilight_begin);
	  	this.dataWaktu.nauticalEnd = this.convertToGmt(k.results.nautical_twilight_end);
	  	this.dataWaktu.astroMulai = this.convertToGmt(k.results.astronomical_twilight_begin);
	  	this.dataWaktu.astroEnd = this.convertToGmt(k.results.astronomical_twilight_end);
      this.stillLoading = false;
  	},(err) => {
      this.presentToast('Gagal Mengambil Data');
    })
  }

  convertToGmt(utc){
  	let date = moment(utc);
  	let hasil = date.tz("Asia/Jakarta").format('HH:mm:ss');

  	return hasil;
  }

  convertDate(date){
  	let a = moment(date);
  	let hasil = a.format('YYYY-MM-DD');

  	this.date = hasil;
  }

  secondToHours(value){
  	let angka = parseInt(value);
  	let jam = Math.floor(angka / 3600);
  	let h = angka - (jam * 3600);
  	let menit = Math.floor(h / 60);
  	let detik = h - (menit * 60);

  	let hasil = `${jam} jam ${menit} menit ${detik} detik`;
  	return hasil;
  }

  showDatePicker(){
  	this.datePicker.show({
  		date: new Date(),
  		mode: 'date',
  		androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  	}).then(
  	date => {
  		this.getCurrentDate(date);
  		this.convertDate(date);
  		this.terbitTerbenam();
  	},
  	err => console.log(err));
  }

  simpan(){
  	let value = {
  		tanggal: this.tanggal,
  		lokasi: {lat: this.lat, long: this.long},
  		waktu: this.dataWaktu
  	};
  	this.getStorage().then((val) => {
  		if (val === null){
  			this.storage.set('detail',JSON.stringify([value]));
  			this.presentToast('Berhasil Menyimpan');
  		}
  		else {
  			let hasil = JSON.parse(val);
        let jumlah = 0;
  			hasil.forEach((item,index) => {
  				if (item.tanggal == this.tanggal){
            this.presentToast('Waktu Sudah Kamu Simpan');
  					jumlah++;
  				}
  			});
        if (jumlah == 0){
          hasil.push(value);
          this.storage.set('detail',JSON.stringify(hasil));
          this.presentToast('Berhasil Menyimpan');
        }
  		}
  	});
  }

  getStorage(){
    return this.storage.get('detail');
  }

  presentToast(text){
  	let toast = this.toastCtrl.create({
  		message: text,
  		duration: 3000,
  		showCloseButton: true,
  		closeButtonText:'OK'
  	});
  	toast.present();
  }


  tentangApps(myEvent){
  	let popover = this.popoverCtrl.create('TentangPage');
  	popover.present({
  		ev: myEvent
  	});
  }

}
