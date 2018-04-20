import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcRadPage } from './oc-rad';

@NgModule({
  declarations: [
    OcRadPage,
  ],
  imports: [
    IonicPageModule.forChild(OcRadPage),
  ],
})
export class OcRadPageModule {}
