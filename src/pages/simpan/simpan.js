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
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TentangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SimpanPage = (function () {
    function SimpanPage(navCtrl, navParams, alertCtrl, modalCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
    }
    SimpanPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('detail').then(function (val) {
            if (val !== null) {
                _this.list = JSON.parse(val);
                _this.kosong = false;
            }
            else {
                _this.kosong = true;
            }
        });
    };
    SimpanPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    SimpanPage.prototype.ambilTanggal = function (tanggal) {
        var a = tanggal.split(", ");
        var hariAngka = a[1].substring(0, 2);
        return hariAngka;
    };
    SimpanPage.prototype.ambilBulan = function (tanggal) {
        var a = tanggal.split(", ");
        var b = a[1].split(' ');
        var bulan = b[1].substring(0, 6);
        return bulan;
    };
    SimpanPage.prototype.hapusRiwayat = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Apakah Kamu Yakin Ingin Menghapus Semua?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Hapus',
                    handler: function () {
                        _this.storage.remove('detail');
                        _this.list = null;
                        _this.kosong = true;
                    }
                }
            ]
        });
        alert.present();
    };
    SimpanPage.prototype.detailItem = function (item) {
        var _this = this;
        var modal = this.modalCtrl.create('ModalDetailPage', { val: item });
        modal.onDidDismiss(function (data) {
            if (data == 'ok') {
                _this.storage.get('detail').then(function (val) {
                    _this.list = JSON.parse(val);
                    if (JSON.parse(val) == null) {
                        _this.kosong = true;
                    }
                });
            }
        });
        modal.present();
    };
    return SimpanPage;
}());
SimpanPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-simpan',
        templateUrl: 'simpan.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AlertController,
        ModalController,
        Storage])
], SimpanPage);
export { SimpanPage };
//# sourceMappingURL=simpan.js.map