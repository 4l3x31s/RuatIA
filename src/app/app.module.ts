import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from "@ionic-native/camera";
import { GoogleCloudVisionProvider } from '../providers/google-cloud-vision/google-cloud-vision';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CloudVisionPage} from "../pages/cloud-vision/cloud-vision";
import {TesserActPage} from "../pages/tesser-act/tesser-act";
import {OcRadPage} from "../pages/oc-rad/oc-rad";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CloudVisionPage,
    TesserActPage,
    OcRadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CloudVisionPage,
    TesserActPage,
    OcRadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    GoogleCloudVisionProvider,
    HttpClient
  ]
})
export class AppModule {}
