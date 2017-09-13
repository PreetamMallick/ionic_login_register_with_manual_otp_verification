import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-success-modal',
  templateUrl: 'success-modal.html',
})
export class SuccessModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
