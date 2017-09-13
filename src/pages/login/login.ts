import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { NavController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Flashlight } from '@ionic-native/flashlight';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { loginService } from '../../services/login.service';
import { updateService } from '../../services/update.service';
import { deleteService } from '../../services/delete.service';
import { sendOtpService } from '../../services/sendOtp.service';

declare var window: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	loginDetails:any = {};
	updateDetails:any = {};
	login_email = '';
	login_password = '';
	editForm:boolean;
	loggedin:boolean;

	yourLoggedinName = '';
	yourLoggedinEmail = '';
	yourLoggedinId = '';
	yourLoggedinPassword = '';
	yourLoggedinImage = '';

	public isToggled: boolean;
	isOn: boolean = true;
	userProfile: any = null;
	otpOption: boolean = true;

	fbLogId = '';
	fbLoginName = '';
	fbLoginEmail = '';
	fbLoginImg = '';

	yourSentOtp = '';
	yourOtpOne = '';
	yourOtpTwo = '';
	yourOtpThree = '';
	yourOtpFour = '';

	public smses:any;

  	constructor(private googlePlus: GooglePlus, private facebook: Facebook, private flashlight: Flashlight, public fb: FormBuilder, public logServ:loginService, public updateServ:updateService, public delServ:deleteService, public sendOtpServ:sendOtpService, public navCtrl: NavController, public http: Http) {

  		//check session
  		this.checkedLoggedin();
  		this.isToggled = false;
  	
  	}

  	public loginForm = this.fb.group({
	    email: ["", Validators.compose([Validators.required])],
	    password: ["", Validators.compose([Validators.required,Validators.minLength(8)])]
	});

	public updateForm = this.fb.group({
	    email: ["", Validators.compose([Validators.required])],
	    id: ["", Validators.compose([Validators.required])]
	});

	public deleteForm = this.fb.group({
	    id: ["", Validators.compose([Validators.required])]
	});

	public otpForm = this.fb.group({
	    otpOne: ["", Validators.compose([Validators.required])],
	    otpTwo: ["", Validators.compose([Validators.required])],
	    otpThree: ["", Validators.compose([Validators.required])],
	    otpFour: ["", Validators.compose([Validators.required])]
	});

	public sendOtpForm = this.fb.group({
	    sentOtp: ["", Validators.compose([Validators.required])]
	});

  	showUpdatForm(){
  		this.editForm = !this.editForm;	
  	}

  	gotoRegister() {
  		this.navCtrl.pop();
  	}

  	loginToApp(event) {
	  	//console.log(value);


	  	const login_form_value = this.loginForm.value;

	  	console.log(login_form_value);

	  	this.logServ.loginNow(login_form_value).subscribe(
			data => {
				console.log(data.message);

				//check if user exist
				if(data.message=="success") {
					console.log('Login Successful');
					this.loginDetails = data;
		       		// this.presentModal();
		       		// console.log(data.name);
		       		// alert(this.loginForm);
					this.login_email = '';
					this.login_password = '';
					this.otpOption = true;

	  				localStorage.setItem('stats','loggedin');
	  				localStorage.setItem('yourname',this.loginDetails.data.name);
	  				localStorage.setItem('youremail',this.loginDetails.data.email);
	  				localStorage.setItem('yourid',this.loginDetails.data.id);
	  				localStorage.setItem('yourpassword',this.loginDetails.data.password);
	  				localStorage.setItem('yourimage',this.fbLoginImg);
	  				this.checkedLoggedin();
	  				// console.log(localStorage.getItem('yourname'));
	  				// console.log(localStorage.getItem('stats'));
	  			}
	  			else {
					this.login_password = '';
	  				console.log('User not found');
	  				alert('User not found');
	  			}
			},
	       	err => console.log(err)
	       	
		);
  	
  	}

  	updateMyEmail(event) {
  		const update_form_value = this.updateForm.value;

	  	console.log(update_form_value);

	  	this.updateServ.updateNow(update_form_value).subscribe(
			data => {
				console.log('update Successful');
				console.log(data);

  				localStorage.setItem('youremail',update_form_value.email);

  				alert('Update Successful. Now your email is ' + localStorage.getItem('youremail'));
				this.editForm = false;

  				// console.log(localStorage.getItem('stats'));
			},
	       	err => console.log(err)
	       	
		);
  	}

  	logout() {
  		this.facebook.logout();
  		this.loggedin = false;
  		localStorage.setItem('stats','');
		localStorage.setItem('yourname','');
		localStorage.setItem('youremail','');
		localStorage.setItem('yourid','');
		localStorage.setItem('yourpassword','');
		localStorage.setItem('yourimage','');
  	}

  	checkedLoggedin() {
  		if(localStorage.getItem('stats')) {
  			//console.log(localStorage.getItem('stats'));
  			this.loggedin = true;
  			this.yourLoggedinName = localStorage.getItem('yourname');
  			this.yourLoggedinEmail = localStorage.getItem('youremail');
  			this.yourLoggedinId = localStorage.getItem('yourid');
  			this.yourLoggedinPassword = localStorage.getItem('yourpassword');
  			this.yourLoggedinImage = localStorage.getItem('yourimage');

  		}
  	}

  	delAccountFunc(delete_form_value) {
	   	this.delServ.deleteNow(delete_form_value).subscribe(
			data => {
				console.log('Delete Successful');
				console.log(data);
			},
	       	err => console.log(err)
	       	
		);
  	}

  	deleteAccount() {
  		const delete_form_value = this.deleteForm.value;

	  	console.log(delete_form_value);

	  	var result = confirm("Do you want to delete Account?");
		if (result) {

			this.loggedin = false;
	  		localStorage.setItem('stats','');
			localStorage.setItem('yourname','');
			localStorage.setItem('youremail','');
			localStorage.setItem('yourid','');
			localStorage.setItem('yourpassword','');
			localStorage.setItem('yourimage','');
			alert('Your Account is Deleted');

			setTimeout(this.delAccountFunc(delete_form_value), 2000)
		 
		}

	 
  	}

  	public notify() {

  		console.log(this.flashlight.available());

  		this.isToggled = !this.isToggled;
  		if(this.isToggled == true) {
  			this.flashlight.switchOn();
  			// console.log('torch is on');
  		}
  		else {
  			this.flashlight.switchOff();
  			// console.log('torch is off');
  		}
	}

	async isAvailable():Promise<boolean> {
		try {
			return await this.flashlight.available();
		}
		catch(e) {
			console.log(e);
		}
	}

	async toggleFlash():Promise<void> {
		try {
			let available = await this.isAvailable();
			if(available) {
				await this.flashlight.toggle();
				this.isOn = !this.isOn;
			}
			else {
				console.log("Isn't available");
			}
		}
		catch(e) {
			console.log(e);
		}
	}

	async turnOnFlash():Promise<void> {
		await this.flashlight.switchOn();
	}

	async turnOffFlash():Promise<void> {
		await this.flashlight.switchOff();
	}

	async isFlashOn():Promise<boolean> {
		return await this.flashlight.isSwitchedOn();
	}

	facebookLogin() {
		this.facebook.login(['public_profile', 'user_friends', 'email'])
  		.then((res: FacebookLoginResponse) => {
  				this.logServ.getFbdata(res.authResponse.accessToken).subscribe((data)=>{
  						console.log(data);

  						//after successful login via facebook
  						this.fbLogId = data.id;
  						this.fbLoginName = data.name;
  						this.fbLoginEmail = data.email;
  						this.fbLoginImg = data.picture.data.url;

  						this.otpOption = true;

  						console.log('Facebook Login Successful');
						this.loginDetails = data;
			       		// this.presentModal();
			       		// console.log(data.name);
			       		// alert(this.loginForm);
						this.login_email = '';
						this.login_password = '';

		  				localStorage.setItem('stats','loggedin');
		  				localStorage.setItem('yourname',this.fbLoginName);
		  				localStorage.setItem('youremail',this.fbLoginEmail);
		  				localStorage.setItem('yourid',this.fbLogId);
		  				localStorage.setItem('yourimage',this.fbLoginImg);
		  				// localStorage.setItem('yourpassword',this.loginDetails.data.password);
		  				this.checkedLoggedin();

  				});
  				//https://graph.facebook.com/me?fields=id,name,email,picture&access_token=
  		})
  		.catch(e => console.log('Error logging into Facebook', e));

  		// this.facebook.logEvent();
	}

	facebookLogout() {
		this.facebook.logout();
	}

	googleLogin() {
		this.googlePlus.login({})
	  	.then(res => console.log(res))
	  	.catch(err => console.error(err));
	}

	getSMS() {
    	if(window.SMS) window.SMS.listSMS({},data=>{
	        setTimeout(()=>{
	            console.log(data);
	            this.smses=data;
	        },0)
 
    	},error=>{
      		console.log(error);
    	});
  	}

	sendOtp(event) {

		const otp_to_number = this.sendOtpForm.value;
	  	console.log(otp_to_number);

	  	this.sendOtpServ.sendOtpNow(otp_to_number).subscribe(
	  		data => {
	  			console.log(data);
	  			// console.log(data.data[0].msg);
	  			sessionStorage.setItem('otp', data.data[0].msg);
	  			console.log('Your OTP is '+sessionStorage.getItem('otp'));

	  			setTimeout(function(){

	  			}, 2000);
	  			

	  		},
	  		err => console.log(err)
	  	);
	}

	verifyOtp($event) {
		const verify_otp_number = this.otpForm.value;
	  	console.log(verify_otp_number);
	  	var entered_otp_is = verify_otp_number.otpOne+verify_otp_number.otpTwo+verify_otp_number.otpThree+verify_otp_number.otpFour;
	  	console.log('Entered otp is '+entered_otp_is);
	  	sessionStorage.setItem('verified_otp', entered_otp_is);

	  	//if otp matches
	  	if(sessionStorage.getItem('otp') === sessionStorage.getItem('verified_otp')) {
	  		alert('OTP matched');
	  		sessionStorage.setItem('otp','');
	  		sessionStorage.setItem('verified_otp','');
	  		this.otpOption = false;
	  	}
	  	else {
	  		alert('Sorry! OTP not matched');
	  	}
	}

}
