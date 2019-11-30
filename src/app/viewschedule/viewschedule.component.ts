import { Component, OnInit, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';

@Component({
  selector: 'app-viewschedule',
  templateUrl: './viewschedule.component.html',
  styleUrls: ['./viewschedule.component.css']
})
export class ViewscheduleComponent implements OnInit {

  constructor() { 
    this.eventData = [
      {
         title: 'event1',
         start: moment()
      },
      {
         title: 'event2',
         start: "2019-11-29T07:00:00.000Z",
         end: "2019-11-30T01:52:11.645Z"
      }],
    this.defaultConfigurations = {
      editable: false,
               eventLimit: true,
               titleFormat: 'MMM D YYYY',
               header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay'
               },
               buttonText: {
                  today: 'Today',
                  month: 'Month',
                  week: 'Week',
                  day: 'Day'
               },
               views: {
                  agenda: {
                     eventLimit: 2
                  }
               },
               allDaySlot: false,
               slotDuration: moment.duration('00:15:00'),
               slotLabelInterval: moment.duration('01:00:00'),
               firstDay: 1,
               selectable: true,
               selectHelper: true,
               events: this.eventData
            };
           
         
  }
  @Input()
      set configurations(config: any) {
         if(config) {
            this.defaultConfigurations = config;  
         }
      }
     eventData: any;
     


   
   defaultConfigurations: any;

   
  

  //calendarPlugins = [dayGridPlugin, timeGridPlugin ];
 

  ngOnInit() {
    $('#full-calendar').fullCalendar(
      this.defaultConfigurations,
      this.eventData
   );
  }

}
