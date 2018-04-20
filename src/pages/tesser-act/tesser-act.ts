import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {ActionSheetController, IonicPage, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";

import Tesseract from 'tesseract.js';
/**
 * Generated class for the TesserActPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tesser-act',
  templateUrl: 'tesser-act.html',
})
export class TesserActPage {
  @ViewChild('imageResult') private imageResult: ElementRef;
  @ViewChild('demoImg') private demoImg: ElementRef;

  private recognizedText: string;

  image: string = '';
  _zone: any;
  _ocrIsLoaded: boolean = false;

  brightness: number = 12;
  contrast: number = 52;
  unsharpMask: any = { radius: 100, strength: 2 };
  hue: number = -100;
  saturation: number = -100;

  showEditFilters: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform: Platform,
              public loadingCtrl: LoadingController,
              public actionsheetCtrl: ActionSheetController,
              private camera: Camera) {
    this._zone = new NgZone({ enableLongStackTrace: false });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TesserActPage');
  }

  takePicture() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();

    // Take a picture saving in device, as jpg and allows edit
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1000,
      sourceType: 1,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then((imageURI) => {
      loader.dismissAll();

      this.image = imageURI;


    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  filter() {
    /// Initialization of glfx.js
    /// is important, to use js memory elements
    /// access to Window element through (<any>window)
    try {
      var canvas = (<any>window).fx.canvas();
    } catch (e) {
      alert(e);
      return;
    }

    /// taken from glfx documentation
    var imageElem = this.imageResult.nativeElement; // another trick is acces to DOM element
    var texture = canvas.texture(imageElem);

    canvas.draw(texture)
      .hueSaturation(this.hue / 100, this.saturation / 100)//grayscale
      .unsharpMask(this.unsharpMask.radius, this.unsharpMask.strength)
      .brightnessContrast(this.brightness / 100, this.contrast / 100)
      .update();

    /// replace image src
    imageElem.src = canvas.toDataURL('image/png');
  }
  llamarAnalizar(){
    this.analyze(this.imageResult.nativeElement.src, false);
  }
  analyze(image, loadAPI) {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();

    if (loadAPI == true) {
      this._ocrIsLoaded = false;
    }
    /// Recognize data from image
    Tesseract.recognize(image, {})
      .progress((progress) => {
        this._zone.run(() => {
          loader.setContent(`${progress.status}: ${Math.floor(progress.progress * 100)}%`)
          console.log('progress:', progress);
        })
      })
      .then((tesseractResult) => {
        this._zone.run(() => {
          loader.dismissAll();
          if (loadAPI == true) {
            this._ocrIsLoaded = true;
          }
          console.log('Tesseract result: ');
          console.log(tesseractResult);
          /// Show a result if data isn't initializtion
          if (loadAPI != true) { this.recognizedText = tesseractResult.text; }
        });
      });
  }

}
