import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CloudVisionPage } from './cloud-vision';

@NgModule({
  declarations: [
    CloudVisionPage,
  ],
  imports: [
    IonicPageModule.forChild(CloudVisionPage),
  ],
})
export class CloudVisionPageModule {}
