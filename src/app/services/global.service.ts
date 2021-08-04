import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  api_url = "https://4b62f8550ef6.ngrok.io/api/";
  s3_url = "https://jobscale-dev.s3.ap-northeast-1.amazonaws.com/user_profile/";
  constructor(private httpClient : HttpClient) { }

  getEvaluationRatingData() {
    return this.httpClient.get('./assets/json/evaluationScore.json');
  }
}
