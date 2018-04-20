import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";

/**
 * Generated class for the OcRadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oc-rad',
  templateUrl: 'oc-rad.html',
})
export class OcRadPage {

  srcImage: string;
  OCRAD: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public loadingCtrl: LoadingController,
              private camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcRadPage');
  }
  getPicture(sourceType: number) {
    // You can check the values here:
    // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
    this.camera.getPicture({
      quality: 100,
      destinationType: 0, // DATA_URL
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;

    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  analyze() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    (<any>window).OCRAD(document.getElementById('image'), text => {
      loader.dismissAll();
      alert(text);
      console.log(text);
    });
  }

}
