import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { Storage } from '@ionic/storage';
import { NavParams } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Badge } from '@ionic-native/badge/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [NgCalendarModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireStorageModule],
  providers: [
    HttpClient,
    Storage,
    Camera,
    CameraPreview,
    NavParams,
    FirebaseAuthentication,
    UniqueDeviceID,
    FCM,
    FirebaseX,
    Badge,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
