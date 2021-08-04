import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { CalendarComponent } from 'ionic2-calendar';
import * as moment from 'moment'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  dateRange: { from: string; to: string; };

  type: 'string';
  optionsRange: CalendarComponentOptions = {
    monthFormat: 'YYYY 年 MM 月 ',
    weekdays: ['日', '月', '火', '水', '木', '金', '土'],
    weekStart: 1,
  };

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
      allDay: false,
      color: "success",
      endTime: new Date(new Date().getTime() + this.addDay),
      startTime: new Date(new Date().getTime() + this.addDay),
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "primary",
      endTime: new Date(new Date().getTime() + this.addDay * 2),
      startTime: new Date(new Date().getTime() + this.addDay * 2),
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "warning",
      endTime: new Date(new Date().getTime() + this.addDay * 5),
      startTime: new Date(new Date().getTime() + this.addDay * 5),
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "danger",
      endTime: new Date(new Date().getTime() + this.addDay * 4),
      startTime: new Date(new Date().getTime() + this.addDay * 4),
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "success",
      endTime: new Date(new Date().getTime() + this.addDay),
      startTime: new Date(new Date().getTime() + this.addDay),
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "warning",
      endTime: new Date(new Date().getTime() + this.addDay * 45),
      startTime: new Date(new Date().getTime() + this.addDay * 45),
      title: "All Day - 0"
    },
    {
      allDay: false,
      color: "warning",
      endTime: new Date(new Date().getTime() - this.addDay * 15),
      startTime: new Date(new Date().getTime() - this.addDay * 15),
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
 
  
  weekdays = ['月', '火', '水', '木', '金', '土', '日']
  lockSwipes: boolean;
  block: boolean;
  selectDate: boolean = false;
  selectedDateTitle: string;
  selectedDateFunctionWork = 0
  nowTime;
  myToast: Promise<void>;
  showToastMessage = false;
  segment;


  //Multi date
  dateMulti: Date[] = [new Date(2021, 7, 1), new Date(2021, 7, 10), new Date(2021, 6, 30)];
  // type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    monthFormat: 'YYYY 年 MM 月 ',
    weekdays: ['日', '月', '火', '水', '木', '金', '土'],
    weekStart: 1,
  };
  currentMonth: number;

  markDisabled = (date: Date) => {
    var d = new Date();
    // d.setDate(d.getDate() - 1);
    return date < d;
  };
  isToday: boolean;

  constructor(private toastCtrl: ToastController) {
    console.log(this.dateRange);
    this.segment = "schedule"
    //this.createRandomEvents()
    this.eventSource = this.eventSource1
  }

  ngOnInit() {
    //this.showToast()
    //const selected = new Date();
    //this.selectedDateTitle = moment(selected).format('YYYY') + "年" + moment(selected).format('MM')+ "月" + moment(selected).format('DD')+ "日" + " ( "+ this.weekDay(selected.toString())+" ) "

  }

  showToast() {
    this.myToast = this.toastCtrl.create({
      message: "<img src='assets/images/awesome-check-circle.svg' >  最終評価保存リストに保存しました",
      duration: 2000,
      position: 'top',
      cssClass: 'toast-custom-class',
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  next() {
    console.log('next')
    this.myCal.slideNext();
  }

  back() {
    console.log('back')
    this.myCal.slidePrev();
  }

  //Selected date reange and hence title changed
  onViewTitleChanged(title) {
    console.log('onViewTitleChanged')
    const selected = new Date(title);
    this.viewTitle = moment(selected).format('YYYY') + "年" + moment(selected).format('MM') + "月";
  }

  chooseDate() {
    console.log('chooseDate')
    if (this.selectDate == false) {
      this.selectDate = true
    } else {
      this.selectDate = false
    }
  }

  weekDay(selected) {
    let selectedDate = selected.toString();
    let weekDaySplit = selectedDate.split(" ");
    let weekDay = weekDaySplit[0];
    switch (weekDay) {
      case "Sun": return "月"
        break;
      case "Mon": return "火"
        break;
      case "Tue": return "水"
        break;
      case "Wed": return "木"
        break;
      case "Thu": return "金"
        break;
      case "Fri": return "土"
        break;
      case "Sat": return "日"
        break;
    }
  }

  segmentChanged(event) {
    console.log(this.segment)
    //this.showToast()
    //this.myCal.loadEvents()
  }

  // createRandomEvents() {
  //   let colors: string[] = ['primary', 'warning', 'danger', 'success'];

  //   var events = [];
  //   for (var i = 0; i < 5; i += 1) {
  //     var date = new Date();
  //     var eventType = Math.floor(Math.random() * 2);
  //     var startDay = Math.floor(Math.random() * 90) - 45;
  //     var endDay = Math.floor(Math.random() * 2) + startDay;
  //     var startTime;
  //     var endTime;
  //     if (eventType === 0) {
  //       startTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + startDay
  //         )
  //       );
  //       if (endDay === startDay) {
  //         endDay += 1;
  //       }
  //       endTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + endDay
  //         )
  //       );
  //       events.push({
  //         title: 'All Day - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: true,
  //         color: colors[Math.floor(Math.random()*colors.length)]
  //       });
  //     } else {
  //       var startMinute = Math.floor(Math.random() * 24 * 60);
  //       var endMinute = Math.floor(Math.random() * 180) + startMinute;
  //       startTime = new Date(
  //         date.getUTCFullYear(),
  //         date.getMonth(),
  //         date.getDate() + startDay,
  //         0,
  //         date.getMinutes() + startMinute
  //       );
  //       endTime = new Date(
  //         date.getUTCFullYear(),
  //         date.getMonth(),
  //         date.getDate() + endDay,
  //         0,
  //         date.getMinutes() + endMinute
  //       );
  //       events.push({
  //         title: 'Event - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: false,
  //         color: colors[Math.floor(Math.random()*colors.length)]
  //       });
  //     }
  //   }
  //   this.eventSource = events;
  //   console.log(events)
  // }

  removeEvents() {
    this.eventSource = [];
  }

  dataCarry(data) {
    console.log('dataCarry')
    console.log(data)
    this.selectDate = true;
  }

  doSchedule() {
    console.log('doSchedule')
    this.myCal.loadEvents();
  }

  reloadSource(ev) {
    console.log('reloadSource')
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  onCurrentDateChanged(event: Date) {
    console.log('onCurrentDateChanged')
  }

  onTimeSelected(event) {
    console.log('onTimeSelected');
    this.eventSource = this.eventSource1
    this.myCal.loadEvents();
  }
}
