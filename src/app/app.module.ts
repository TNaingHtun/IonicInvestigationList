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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [NgCalendarModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [
    HttpClient,
    Storage,
    Camera,
    CameraPreview,
    NavParams,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
