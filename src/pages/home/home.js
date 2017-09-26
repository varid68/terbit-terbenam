var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import * as moment from 'moment-timezone';
import { DatePicker } from '@ionic-native/date-picker';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HomePage = (function () {
    function HomePage(navCtrl, navParams, popoverCtrl, toastCtrl, storage, geolocation, datePicker, restApi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.geolocation = geolocation;
        this.datePicker = datePicker;
        this.restApi = restApi;
        this.tanggal = '2018-09-07';
        this.dataWaktu = {};
        this.stillLoading = true;
    }
    HomePage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.getCurrentDate(null);
        this.terbitTerbenam();
        this.geolocation.watchPosition({ enableHighAccuracy: true }).subscribe(function (pos) {
            console.log(pos);
            _this.pos = pos;
        }, function (err) {
            console.log(err);
        });
        this.lat = -6.2087634;
        this.long = 106.84559899999999;
    };
    HomePage.prototype.toSavePage = function () {
        this.navCtrl.push('SimpanPage');
    };
    HomePage.prototype.getCurrentDate = function (date2) {
        if (date2 == null) {
            date2 = new Date();
        }
        var hari = date2.getDay();
        var tanggal = addZero(date2.getDate());
        var bulan = date2.getMonth();
        var tahun = date2.getFullYear();
        function addZero(i) {
            if (i < 10)
                i = '0' + i;
            return i;
        }
        var arrayHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'jumat', 'Sabtu'];
        var arrayBulan = ['Januari', 'Februari', 'Maret', 'April',
            'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        this.tanggal = arrayHari[hari] + ", " + tanggal + " " + arrayBulan[bulan] + " " + tahun;
    };
    HomePage.prototype.terbitTerbenam = function () {
        var _this = this;
        var lat = -6.2087634;
        var long = 106.84559899999999;
        this.restApi.terbitTerbenam(lat, long, this.date).subscribe(function (k) {
            _this.dataWaktu.terbit = _this.convertToGmt(k.results.sunrise);
            _this.dataWaktu.terbenam = _this.convertToGmt(k.results.sunset);
            _this.dataWaktu.lamaBersinar = _this.secondToHours(k.results.day_length);
            _this.dataWaktu.tepatDiatas = _this.convertToGmt(k.results.solar_noon);
            _this.dataWaktu.twilightMulai = _this.convertToGmt(k.results.civil_twilight_begin);
            _this.dataWaktu.twilightEnd = _this.convertToGmt(k.results.civil_twilight_end);
            _this.dataWaktu.nauticalMulai = _this.convertToGmt(k.results.nautical_twilight_begin);
            _this.dataWaktu.nauticalEnd = _this.convertToGmt(k.results.nautical_twilight_end);
            _this.dataWaktu.astroMulai = _this.convertToGmt(k.results.astronomical_twilight_begin);
            _this.dataWaktu.astroEnd = _this.convertToGmt(k.results.astronomical_twilight_end);
            _this.stillLoading = false;
        });
    };
    HomePage.prototype.convertToGmt = function (utc) {
        var date = moment(utc);
        var hasil = date.tz("Asia/Jakarta").format('HH:mm:ss');
        return hasil;
    };
    HomePage.prototype.convertDate = function (date) {
        var a = moment(date);
        var hasil = a.format('YYYY-MM-DD');
        this.date = hasil;
    };
    HomePage.prototype.secondToHours = function (value) {
        var angka = parseInt(value);
        var jam = Math.floor(angka / 3600);
        var h = angka - (jam * 3600);
        var menit = Math.floor(h / 60);
        var detik = h - (menit * 60);
        var hasil = jam + " jam " + menit + " menit " + detik + " detik";
        return hasil;
    };
    HomePage.prototype.showDatePicker = function () {
        var _this = this;
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(function (date) {
            _this.getCurrentDate(date);
            _this.convertDate(date);
            _this.terbitTerbenam();
        }, function (err) { return console.log(err); });
    };
    HomePage.prototype.simpan = function () {
        var _this = this;
        var value = {
            tanggal: this.tanggal,
            lokasi: { lat: this.lat, long: this.long },
            waktu: this.dataWaktu
        };
        this.getStorage().then(function (val) {
            if (val === null) {
                _this.storage.set('detail', JSON.stringify([value]));
                _this.presentToast('Berhasil Menyimpan');
            }
            else {
                var hasil = JSON.parse(val);
                var jumlah_1 = 0;
                hasil.forEach(function (item, index) {
                    if (item.tanggal == _this.tanggal) {
                        _this.presentToast('Waktu Sudah Kamu Simpan');
                        jumlah_1++;
                    }
                });
                if (jumlah_1 == 0) {
                    hasil.push(value);
                    _this.storage.set('detail', JSON.stringify(hasil));
                    _this.presentToast('Berhasil Menyimpan');
                }
            }
        });
    };
    HomePage.prototype.getStorage = function () {
        return this.storage.get('detail');
    };
    HomePage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 2000,
            showCloseButton: true,
            closeButtonText: 'OK'
        });
        toast.present();
    };
    HomePage.prototype.tentangApps = function (myEvent) {
        var popover = this.popoverCtrl.create('TentangPage');
        popover.present({
            ev: myEvent
        });
        setTimeout(function () {
            popover.dismiss();
        }, 1900);
    };
    return HomePage;
}());
HomePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        PopoverController,
        ToastController,
        Storage,
        Geolocation,
        DatePicker,
        RestApiProvider])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map