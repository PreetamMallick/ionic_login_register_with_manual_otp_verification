import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { Flashlight } from '@ionic-native/flashlight';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistedInfoPage } from '../pages/registed-info/registed-info';
import { SuccessModalPage } from '../pages/success-modal/success-modal';
import { LoginPage } from '../pages/login/login';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { registerService } from '../services/register.service';
import { loginService } from '../services/login.service';
import { updateService } from '../services/update.service';
import { deleteService } from '../services/delete.service';
import { sendOtpService } from '../services/sendOtp.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistedInfoPage,
    SuccessModalPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistedInfoPage,
    SuccessModalPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    registerService,
    loginService,
    updateService,
    deleteService,
    Flashlight,
    Facebook,
    GooglePlus,
    sendOtpService
  ]
})
export class AppModule {}
