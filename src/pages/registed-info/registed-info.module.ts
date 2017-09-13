import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistedInfoPage } from './registed-info';

@NgModule({
  declarations: [
    RegistedInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistedInfoPage),
  ],
})
export class RegistedInfoPageModule {}
