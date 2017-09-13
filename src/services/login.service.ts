import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModalController, NavParams } from 'ionic-angular';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()

export class loginService {
	public loginDetails = 'preet';

	constructor(public http: Http, public modalCtrl: ModalController) {}

	loginNow(event) {
	    //console.log(event);   
	    this.loginDetails = 'name changed';

		const body = event;

		console.log(body);

		//post to database
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

		//console.log(body);

		return this.http.post('http://localhost/ionic/select_data.php', body, {
		 	headers: headers
		})
		.map(res => res.json());
    
  	}
  	getFbdata(url:any) {
  		return this.http.get('https://graph.facebook.com/me?fields=id,name,email,picture&access_token='+url).map(res => res.json());;
  	}


}