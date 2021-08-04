import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';
import { NgCalendarModule  } from 'ionic2-calendar';
import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    CalendarModule,
    NgCalendarModule,
  ],
  declarations: [CalendarPage],
  providers :[
    { provide: LOCALE_ID, useValue: 'en-EN' }
  ]
})
export class CalendarPageModule {}
