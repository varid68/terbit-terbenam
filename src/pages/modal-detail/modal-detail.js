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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ModalDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ModalDetailPage = (function () {
    function ModalDetailPage(navCtrl, navParams, viewCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
    }
    ModalDetailPage.prototype.ionViewWillLoad = function () {
        this.dataWaktu = this.navParams.get('val');
    };
    ModalDetailPage.prototype.hapus = function () {
        var _this = this;
        this.storage.get('detail').then(function (val) {
            var a = JSON.parse(val);
            if (a.length == 1) {
                _this.storage.remove('detail');
                _this.viewCtrl.dismiss('ok');
            }
            else {
                a.forEach(function (item, index) {
                    if (item.tanggal == _this.dataWaktu.tanggal) {
                        a.splice(index, 1);
                        _this.setStorage(a).then(function (dismiss) {
                            _this.viewCtrl.dismiss('ok');
                        });
                    }
                });
            }
        });
    };
    ModalDetailPage.prototype.setStorage = function (val) {
        return this.storage.set('detail', JSON.stringify(val));
    };
    ModalDetailPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return ModalDetailPage;
}());
ModalDetailPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-modal-detail',
        templateUrl: 'modal-detail.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ViewController, Storage])
], ModalDetailPage);
export { ModalDetailPage };
//# sourceMappingURL=modal-detail.js.map