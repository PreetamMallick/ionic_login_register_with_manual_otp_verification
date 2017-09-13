import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModalController, NavParams } from 'ionic-angular';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()

export class deleteService {
	public deleteDetails = '';

	constructor(public http: Http, public modalCtrl: ModalController) {}

	deleteNow(event) {
	    //console.log(event);   
	    this.deleteDetails = 'All Deleted';

		const body = event;

		//post to database
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

		//console.log(body);

		return this.http.post('http://localhost/ionic/delete_data.php', body, {
		 	headers: headers
		})
		.map(res => res.text());
    
  	}


}