import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpOptions:any;
  constructor(private httpClient : HttpClient, private global : GlobalService) {
    // this.httpOptions = this.global.httpOptions;
    // console.log(this.httpOptions);
   }

  getProfileDetail(profile_id,token) {
    return this.httpClient.get(this.global.api_url + 'profile/' + profile_id,this.global.getHeaderOptions(token));
  }

  getProfileList(token){
    return this.httpClient.get(this.global.api_url + 'profile',this.global.getHeaderOptions(token));
  }
}
