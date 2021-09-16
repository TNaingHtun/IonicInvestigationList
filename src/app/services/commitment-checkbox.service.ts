import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CommitmentCheckboxService {

  user_id = 14;
  constructor(private httpClient: HttpClient, private global: GlobalService) { }

  getCommitmentInfo(commitmentSheetId) {
    let params = new HttpParams().set("commitment_sheet_id", commitmentSheetId);
    const httpOptions = {
      headers: new HttpHeaders({
        'User-Id': this.user_id.toString()
      }),
      params: params
    };
    return this.httpClient.get(this.global.api_url + 'commitment-sheet/', httpOptions);
  }
  getCommitmentJson() {
    return this.httpClient.get('./assets/json/commitmentInfo.json')
  }

  updateCommitmentCheck(updateActionPlanData) {
    return this.httpClient.put(this.global.api_url + 'action-plan/', updateActionPlanData);
  }
}
