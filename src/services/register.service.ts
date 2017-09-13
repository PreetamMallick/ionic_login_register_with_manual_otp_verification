import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModalController, NavParams } from 'ionic-angular';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { SuccessModalPage } from '../pages/success-modal/success-modal';

@Injectable()

export class registerService {

	constructor(public http: Http, public modalCtrl: ModalController) {}

	presentModal() {
    	let modal = this.modalCtrl.create(SuccessModalPage);
    	modal.present();
  	}

	doLogin(event) {
	    console.log(event);    

	    //can send data by this format or use full json format (const body)
	 	//   let postParams = {
		//   name: event.name,
		//   email: event.email,
		//   password: event.password,
		// };

		const body = event;

		//post to database
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

		// console.log(postParams);
		// alert(body.name + ' and '+body.email);

		return this.http.post('http://localhost/ionic/insert_data.php', body, {
			headers: headers
		}).map(res => res.json());
    
  	}

}