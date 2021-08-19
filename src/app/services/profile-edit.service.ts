import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {
  httpOptions:any;
  constructor(private httpClient : HttpClient, private global : GlobalService) { 
    // this.httpOptions = this.global.httpOptions;
    // console.log(this.httpOptions);
  }

  updateProfile(profile_id,updateData,token) {
    return this.httpClient.post(this.global.api_url + 'profile/edit/'+profile_id, updateData,this.global.getHeaderOptions(token));
  }
  
}
