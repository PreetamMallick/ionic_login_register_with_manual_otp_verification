import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { NavController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { RegistedInfoPage } from '../registed-info/registed-info';
import { LoginPage } from '../login/login';

import { registerService } from '../../services/register.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	registeredName = '';
	register_name = '';
	register_email = '';
	register_password = '';
	register_confirm_password = '';

  constructor(public fb: FormBuilder, public regServ:registerService, public navCtrl: NavController, public http: Http) {
  
  }

  public registerForm = this.fb.group({
  	name: ["", Validators.compose([Validators.required,Validators.minLength(5)])],
    email: ["", Validators.compose([Validators.required])],
    password: ["", Validators.compose([Validators.required,Validators.minLength(8)])],
    confirmpassword: ["", Validators.compose([Validators.required,Validators.minLength(8)])]
  });

  registerToApp(event) {
  	// console.log('Name = '+ value.uname);

  	// console.log(this.registerForm.value);
  	// console.log(this.registerForm.value.password);

  	//going to registered info page
  	// this.navCtrl.push(RegistedInfoPage);
  	//check if inputs are valid
    if(!this.registerForm.controls.name.errors && !this.registerForm.controls.email.errors && !this.registerForm.controls.password.errors) {

    	const register_form_value = this.registerForm.value;

	  	this.regServ.doLogin(register_form_value).subscribe(
			data => {

				// console.log(data);


				if(data.message=="success") {
					console.log(this.registeredName = data.data);
					console.log('Registration Successful');
		       		// console.log(this.loginDetails);
		       		alert(this.registeredName);
		       		this.register_name = '';
					this.register_email = '';
					this.register_password = '';
					this.register_confirm_password = '';
				}
				else {
					console.log('Email already exist');
	  				alert('Sorry! Email already exist');
	  				this.register_email = '';
				}
			},
	       	err => console.log(err)
		);

	}
	else {
    	console.log("invalid input field(s)");
    	alert('Invalid Input Field(s)');
    }
  }

  gotoLogin() {
  	//going to login page
  	this.navCtrl.push(LoginPage);
  }

}
