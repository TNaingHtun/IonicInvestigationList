import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {

  constructor(private httpClient : HttpClient, private global : GlobalService) { }

  updateProfile(profile_id,updateData) {
    return this.httpClient.post(this.global.api_url + 'profile/edit/'+profile_id, updateData);
  }
}
