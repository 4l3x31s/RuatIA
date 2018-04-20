import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GoogleCloudVisionProvider} from "../../providers/google-cloud-vision/google-cloud-vision";
import {CameraOptions, Camera} from '@ionic-native/camera';

/**
 * Generated class for the CloudVisionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cloud-vision',
  templateUrl: 'cloud-vision.html',
})
export class CloudVisionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,
              private vision: GoogleCloudVisionProvider, private alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CloudVisionPage');
  }

  tomarFoto(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      //TODO: tomar foto
      this.vision.getLabels(imageData).subscribe((result:any) => {
        console.log(result);
        console.log(JSON.stringify(result));
      }, err => {
        console.log(err);
        this.showAlert(JSON.stringify(err));
      });
    }, err => {
      console.log(err);
      this.showAlert(JSON.stringify(err));
    });
  }
  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
