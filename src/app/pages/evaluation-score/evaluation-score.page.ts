import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-evaluation-score',
  templateUrl: './evaluation-score.page.html',
  styleUrls: ['./evaluation-score.page.scss'],
})
export class EvaluationScorePage implements OnInit {
  @ViewChild(IonSlides) slider: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pagination: false,
  };
  currentPage = 0;
  total = null;
  progress = 0;
  // progress = this.currentPage / this.total;
  percent = this.progress * 100;

  evaluationDataList = [];

  definitiveEvaluationRate: any = 0;
  definitiveEvaluation1: string;
  definitiveEvaluation2: string;
  definitiveEvaluation3: string;
  definitiveEvaluation4: string;

  date: any;
  evaluationData: any;
  definitiveRatingData = [];

  currentUserId = 1;
  evaluationSlideData: any;

  public now: Date = new Date();
  timeAgo: any;
  seconds: any;

  constructor(
    private router: Router,
    private global: GlobalService,
    private storage: Storage,
  ) {
    this.ngOnInit();
    this.storage.create();
    this.getJsonData();
    setInterval(() => {
      this.now = new Date();
      this.createdDateChanged(this.evaluationSlideData.created_at);
    }, 1000);
  }

  ngOnInit() {
    this.getJsonData();
  }

  ionViewWillEnter() {
    this.getJsonData();
    this.slideDidChange();
  }

  ionViewDidLeave() {

    if (this.currentPage === this.total) {
      console.log(this.total);
      this.definitiveEvaluationRate = 0;
      this.currentPage = 0;
      this.definitiveRatingData = [];
    }
    this.calculateProgressBar(this.currentPage);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      if (this.slider) {
        this.slider.lockSwipes(false);
        this.slider.slideTo(this.currentPage);
        this.slider.lockSwipes(true);
      }
    }, 100);
  }
  //get Json Data
  getJsonData() {
    this.global.getEvaluationRatingData().subscribe(response => {
      console.log('enter');
      console.log(response);
      const evaMasterData: any = response;
      console.log(evaMasterData);
      this.evaluationDataList = evaMasterData.data;
      this.total = this.evaluationDataList.length;
      console.log(this.evaluationDataList.length);
      this.checkStardefinitiveEvaluation(this.definitiveEvaluationRate);
    });
  }

  // move to next,increase currentPage,progress bar when user select answer
  moveToNextSlide() {
    this.slider.lockSwipes(false);
    this.currentPage += 1;
    this.calculateProgressBar(this.currentPage);
    this.slider.slideNext().then(() => {
      this.slider.lockSwipes(true);

      if (this.currentPage < this.total) {
        this.storage.get('definiteEvaluationData').then((data) => {
          console.log('check enter');
          if (data) {
            let prevPage = this.currentPage + 1;
            console.log('data', data);
            console.log('current page', prevPage);

            //check evaluation_data_id in storage
            let check_evaluation_data_id = data.definitiveRatingData.some(function (el) { return el.evaluation_data.id === prevPage });
            console.log('current data is or not', check_evaluation_data_id);

            if (check_evaluation_data_id) {
              data.definitiveRatingData.forEach(element => {
                if (element.evaluation_data.id == prevPage) {
                  console.log(this.currentPage);
                  console.log(element.definitive_rate);
                  this.checkStardefinitiveEvaluation(element.definitive_rate);
                }
              });
            } else {
              this.definitiveEvaluationRate = 0;
              this.checkStardefinitiveEvaluation(this.definitiveEvaluationRate);
            }
          } else {
            this.definitiveEvaluationRate = 0;
            this.checkStardefinitiveEvaluation(this.definitiveEvaluationRate);
          }
        });
      }

    });
  }

  // move to previous slide when user click back button
  moveToPrevSlide() {
    if (this.currentPage > 0) {
      this.slider.lockSwipes(false);
      this.currentPage--;
      this.calculateProgressBar(this.currentPage);
      this.slider.slidePrev();
      this.getStorage();
      this.slider.lockSwipes(true);
    } else {
      this.router.navigate(['home']);
    }
  }

  getStorage() {
    this.storage.get('definiteEvaluationData').then((data) => {
      if (data) {
        let prevPage = this.currentPage + 1;
        console.log(data);
        data.definitiveRatingData.forEach(element => {
          if (element.evaluation_data.id == prevPage) {
            console.log(this.currentPage);
            console.log(element.definitive_rate);
            this.checkStardefinitiveEvaluation(element.definitive_rate);
          }
        });
      }
    });
  }

  checkStardefinitiveEvaluation(num) {
    if (num == 1) {
      this.definitiveEvaluation1 = "gray"
      this.definitiveEvaluation2 = "white"
      this.definitiveEvaluation3 = "white"
      this.definitiveEvaluation4 = "white"

    } else if (num == 2) {
      this.definitiveEvaluation1 = "gray"
      this.definitiveEvaluation2 = "gray"
      this.definitiveEvaluation3 = "white"
      this.definitiveEvaluation4 = "white"

    }
    else if (num == 3) {
      this.definitiveEvaluation1 = "gray"
      this.definitiveEvaluation2 = "gray"
      this.definitiveEvaluation3 = "gray"
      this.definitiveEvaluation4 = "white"

    }
    else if (num == 4) {
      this.definitiveEvaluation1 = "gray"
      this.definitiveEvaluation2 = "gray"
      this.definitiveEvaluation3 = "gray"
      this.definitiveEvaluation4 = "gray"

    }
    else if (num == 5) {
      this.definitiveEvaluation1 = "gray"
      this.definitiveEvaluation2 = "gray"
      this.definitiveEvaluation3 = "gray"
      this.definitiveEvaluation4 = "gray"
    } else if (num == 0) {
      this.definitiveEvaluation1 = "white"
      this.definitiveEvaluation2 = "white"
      this.definitiveEvaluation3 = "white"
      this.definitiveEvaluation4 = "white"

    }
  }

  // calculate the progree bar and percentage
  calculateProgressBar(currentPage) {
    this.progress = currentPage / this.total;
    this.percent = Math.round(this.progress * 100);
  }

  ratingValueChange(evaluationData, rateValue) {
    if (this.currentPage < this.total) {
      this.definitiveEvaluationRate = rateValue;
      this.checkStardefinitiveEvaluation(this.definitiveEvaluationRate);
      console.log(evaluationData);
      console.log(this.definitiveEvaluationRate);
      let evaluationAllDataObj = {
        evaluation_data: evaluationData,
        definitive_rate: rateValue
      };
      console.log(evaluationAllDataObj.evaluation_data.id);
      if (this.definitiveRatingData && this.definitiveRatingData.length) {
        console.log(this.definitiveRatingData.length);
        let check_evaluation_data_id = this.definitiveRatingData.some(function (el) { return el.evaluation_data.id === evaluationData.id });
        if (check_evaluation_data_id) {
          this.definitiveRatingData.forEach(element => {
            console.log('enter');
            if (element.evaluation_data.id == evaluationAllDataObj.evaluation_data.id) {
              console.log('update data' + evaluationAllDataObj.evaluation_data.id);
              element.definitive_rate = evaluationAllDataObj.definitive_rate;
            }
          });
        } else {
          console.log('data' + evaluationAllDataObj.evaluation_data.id);
          this.definitiveRatingData.push(evaluationAllDataObj);
        }

      } else {
        console.log('null array');
        this.definitiveRatingData.push(evaluationAllDataObj);
      }

      console.log(this.definitiveRatingData);
      setTimeout(() => {
        this.moveToNextSlide();
        this.saveToStorage();
        if (this.currentPage === this.total) {
          this.storage.clear().then(() => {
            this.router.navigate(['home']);
          });
        }
      }, 400);
    }
  }

  footerRatingValueChange(rateValue) {
    let evaluationData = this.evaluationSlideData;
    if (this.currentPage < this.total) {
      this.definitiveEvaluationRate = rateValue;
      this.checkStardefinitiveEvaluation(this.definitiveEvaluationRate);
      console.log(evaluationData);
      console.log(this.definitiveEvaluationRate);
      let evaluationAllDataObj = {
        evaluation_data: evaluationData,
        definitive_rate: rateValue
      };
      console.log(evaluationAllDataObj.evaluation_data.id);
      if (this.definitiveRatingData && this.definitiveRatingData.length) {
        console.log(this.definitiveRatingData.length);

        //check evaluation_data_id from slide all store data
        let check_evaluation_data_id = this.definitiveRatingData.some(function (el) { return el.evaluation_data.id === evaluationData.id });
        if (check_evaluation_data_id) {
          this.definitiveRatingData.forEach(element => {
            console.log('enter');
            if (element.evaluation_data.id == evaluationAllDataObj.evaluation_data.id) {
              console.log('update data' + evaluationAllDataObj.evaluation_data.id);
              element.definitive_rate = evaluationAllDataObj.definitive_rate;
            }
          });
        } else {
          console.log('data' + evaluationAllDataObj.evaluation_data.id);
          this.definitiveRatingData.push(evaluationAllDataObj);
        }

      } else {
        console.log('null array');
        this.definitiveRatingData.push(evaluationAllDataObj);
      }

      console.log(this.definitiveRatingData);
      setTimeout(() => {
        this.moveToNextSlide();
        this.saveToStorage();
        if (this.currentPage === this.total) {
          this.storage.clear().then(() => {
            this.router.navigate(['home']);
          });
        }
      }, 400);
    }
  }

  saveToStorage() {
    this.storage
      .set('definiteEvaluationData', {
        definitiveRatingData: this.definitiveRatingData,
        progress: this.progress,
        percent: this.percent,
        currentPage: this.currentPage,
      });
  }

  reanswerQuestion() {
    this.moveToPrevSlide();
  }

  slideDidChange() {
    this.slider.getActiveIndex().then(index => {
      console.log('Current index is', index);
      console.log('User List is', this.evaluationDataList);
      this.currentUserId = this.evaluationDataList[index].id;
      console.log('Current user index is', this.currentUserId);
      this.evaluationDataList.forEach(element => {
        if (element.id == this.currentUserId) {
          this.evaluationSlideData = element;
          console.log(this.evaluationSlideData);
          this.createdDateChanged(this.evaluationSlideData.created_at);
        }
      });
    });
  };

  createdDateChanged(date: any): any {
    console.log('enter date');
    if (date) {
      this.seconds = Math.floor((+this.now - +new Date(date)) / 1000);
      if (this.seconds < 29) // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(this.seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return this.timeAgo = counter + ' ' + i + ' ago'; // singular (1 day ago)
            // console.log(this.timeAgo);
          } else {
            return this.timeAgo = counter + ' ' + i + 's ago'; // plural (2 days ago)
            // console.log(this.timeAgo);
          }
      }
    }
    return date;
  }
}
