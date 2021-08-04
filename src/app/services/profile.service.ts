import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient : HttpClient, private global : GlobalService) { }

  getProfileDetail(profile_id) {
    return this.httpClient.get(this.global.api_url + 'profile/' + profile_id);
  }
}
