import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar';
import { connectListeners } from '@ionic/core/dist/types/utils/overlays';

export interface DayEvent {
  id?: string;
  title: string;
  endTime: Date;
  startTime: Date;
  allDay: boolean;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  unsubscribeBackEvent: any;
  taskSegment: string;
  scheduleSegment: string;
  showTask: boolean;
  taskList = [];
  scheduleList = [];
  now: Date = new Date();

  //schedule
  dateRange: { from: string; to: string; };

  type: 'string';
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
  eventSource = [];
  addDay = 1000 * 60 * 60 * 24;
  eventSource1 = [
    
    {
      
      color: "success",
      endTime: new Date(new Date().getTime() + this.addDay), 
      startTime:  new Date(new Date().getTime() + this.addDay), 
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "primary",
      endTime: new Date(new Date().getTime() + this.addDay * 2), 
      startTime:  new Date(new Date().getTime() + this.addDay * 2),  
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "danger",
      endTime: new Date(new Date().getTime() + this.addDay * 2), 
      startTime:  new Date(new Date().getTime() + this.addDay * 2),  
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "warning",
      endTime: new Date(new Date().getTime() + this.addDay * 2), 
      startTime:  new Date(new Date().getTime() + this.addDay * 2),  
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "warning",
      endTime: new Date(new Date().getTime() + this.addDay * 5), 
      startTime:  new Date(new Date().getTime() + this.addDay * 5),  
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "danger",
      endTime: new Date(new Date().getTime() + this.addDay * 4), 
      startTime:  new Date(new Date().getTime() + this.addDay * 4), 
      title: "All Day - 0"
    },
    {
      
      color: "danger",
      endTime: new Date(new Date().getTime() + this.addDay), 
      startTime:  new Date(new Date().getTime() + this.addDay), 
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "warning",
      endTime: new Date(new Date().getTime() + this.addDay * 45), 
      startTime:  new Date(new Date().getTime() + this.addDay * 45),  
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "warning",
      endTime: new Date(new Date().getTime() - this.addDay * 15), 
      startTime:  new Date(new Date().getTime() - this.addDay * 15),  
      title: "All Day - 0"
    },
    {
      allDay: true,
      eventColor: "Schedule",
      startTime:  new Date(new Date().getTime()- this.addDay * 15),
      endTime: new Date(new Date().getTime() + this.addDay * 8),   
      title: "All Day - 0"
    },
  ]
  viewTitle;
  selectedDate = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      }
    }
  };

  weekdays = ['日','月', '火', '水', '木', '金', '土'];
  selectDate: boolean = false;

  constructor(
    private router: Router,
    public platform: Platform,
  ) {

    this.taskSegment = '';
    this.scheduleSegment = 'selectedbutton';
    this.showTask = false;

    const selected = new Date();
    this.viewTitle  = selected.getFullYear() + '年' + (selected.getMonth() + 1) + '月'
      
    this.eventSource = this.eventSource1
   }

  ngOnInit() {
  }

  segmentClick(selectButton){
    if (selectButton === 'task'){
      this.taskSegment = 'selectedbutton';
      this.scheduleSegment = '';
      this.showTask = true;
    }else{
      this.taskSegment = '';
      this.scheduleSegment = 'selectedbutton';
      this.showTask = false;
    }
  }

  checkTaskType(type){
    var typeNumber = parseInt(type)
    if (typeNumber == 1){
      return 'assets/icon/to-do-list.svg'
    }else if (typeNumber == 2){
      return 'assets/icon/to-do-schedule.svg'
    }else{
      return 'assets/icon/to-do-notification.svg'
    }
  }

  // calculate time ago function
  timeAgoSinceDate(time){
    const value = time;
    if (value) {
      const seconds = Math.floor((+this.now - +new Date(value)) / 1000);
      if (seconds < 60) {
        return 'たった今';
      }
      const intervals = {
        year: 31536000,   // year
        月前: 2592000,     // month
        週間前: 604800,    // week
        日前: 86400,       // day
        時間前: 3600,      // hour
        分前: 60,          // minute
      };
      let counter;
      const days = Math.floor(seconds / intervals[3]);
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        const day = Math.floor(seconds / 86400);
        if (counter > 0){
          if (intervals[i] === 31536000){
            return formatDate(new Date(value), 'yyyy.MM.dd HH:mm', 'en');
          }
          else if (intervals[i] === 2592000){
            return this.calculateMonth(time, day, counter);
          }
          else if ( intervals[i] === 604800){
            return this.calculateWeek(Math.floor(seconds / 86400));
          }else{
            return counter + '' + i ;
          }
        }
      }
    }
    return value;
  }

  calculateMonth(time, day , count) {
    const differenceInMonths = (this.now.getMonth()) - new Date(time).getMonth();
    if ( differenceInMonths === 1 && new Date(time).getDate() > this.now.getDate()){
      return day + '日前';
    }else if (differenceInMonths < 0){
      return count + '月前';
    }else if ( day > (differenceInMonths * 30) && day < 364){
      return differenceInMonths + '月前';
    }else if (day <= 364 && differenceInMonths !== 1){
      return (count - 1) + '月前';
    }else{
      return (differenceInMonths) + '月前';
    }
  }

  calculateWeek(totalDay){
    const modulus = totalDay % 7;
    const division = totalDay / 7;
    if (modulus === 0 && division >= 1){
      return division + '週間前';
    }else if (modulus !== 0){
      return totalDay + '日前';
    }
  }

  // schedule
  dataCarry(data){
    console.log('dataCarry')
    console.log(data)
    this.selectDate = true;
  }

  doSchedule(){
    console.log('doSchedule')
    this.myCal.loadEvents();
  }

  reloadSource(ev) {
    console.log('reloadSource')
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  onCurrentDateChanged(event: Date) {
    const selected = new Date(event);
    let date  = selected.getFullYear() + '年' + (selected.getMonth() + 1) + '月'
    this.viewTitle = date
    console.log('onCurrentDateChanged' + date)
  }

  onTimeSelected(event) {
    console.log('onTimeSelected');
    this.eventSource = this.eventSource1;
    this.myCal.loadEvents();
  }

  //Selected date reange and hence title changed
  onViewTitleChanged(title) {
    const selected = new Date(title);
    var date  = selected.getFullYear() + '年' + (selected.getMonth() + 1) + '月'
    console.log('onViewTitleChanged'+ date + "date 1 : " )
  }

  chooseDate(){
    console.log('chooseDate')
    if(this.selectDate == false){
      this.selectDate = true
    }else{
      this.selectDate = false
    }
  }

  next() {
    console.log('next')
    this.myCal.slideNext();
  }

  back() {
    console.log('back')
    this.myCal.slidePrev();
  }

  backClick(){
    this.router.navigate(['tabs/tabTab/home']);
  }

  ionViewDidEnter() {
    this.initializeBackButtonCustomHandler();
  }

  initializeBackButtonCustomHandler(): void {

    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(10, () => {
      this.router.navigate(['tabs/tabTab/home']);
    });
  }

  ionViewWillLeave() {
    this.unsubscribeBackEvent.unsubscribe();
  }

  getCustomClass(events,date) {
    console.log(events);
    console.log(date);
    let scheduleColor;
    let startDate;
    let endDate;
    events.forEach(element => {
      console.log(element.eventColor);
      scheduleColor = element.eventColor;
      startDate = element.startTime;
      endDate = element.endTime;
    });

    let date1 = new Date(startDate);
    let date2 =new Date(endDate);
    console.log(date1);
    console.log(date2);
    let startDay= date1.getDate();
    let endDay = date2.getDate();
    console.log(startDay);
    console.log(endDay);
    if(startDay == date){
      return 'test'+scheduleColor+'Start';
    }else if(endDay == date){
      return 'test'+scheduleColor+'End';
    }else{
      return 'test'+scheduleColor;
    }
    
  }
}
