import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  api_url = "http://127.0.0.1:8000/api/";
  s3_url = "https://canayell-dev.s3.ap-northeast-1.amazonaws.com/user_profile/";
  httpOptions: any;
  profile_id: any;
  user_token:any;
  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private firebaseAuthentication: FirebaseAuthentication,
  ) {
    this.storage.create();
    this.storage.get('profile id').then((profile_id) => {
      this.profile_id = profile_id.toString();
    });
    
  }

  getHeaderOptions(token) {
    return this.httpOptions = {
      headers: new HttpHeaders({
        'User-Id': this.profile_id,
        'Authorization': 'Bearer ' + token
      })
    };
  }

  getFirebaseRefreshToken() {
    return this.firebaseAuthentication.getIdToken(true);
  }

  getEvaluationRatingData() {
    return this.httpClient.get('./assets/json/evaluationScore.json');
  }

  getStaffCommitmentData() {
    return this.httpClient.get('./assets/json/staffCommitmentData.json');
  }
}
