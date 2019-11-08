import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'schedule-current',
  templateUrl: './schedule-current.component.html',
  styleUrls: ['./schedule-current.component.scss']
})

export class ScheduleCurrentComponent implements OnInit {

    date: string;
    status: string;
    desc: string;

    constructor() {
        this.date = "TODAY";
        this.status = null;
        this.desc = "Short special request description on specific braiding or warning about horse temperment";
    }

    ngOnInit() {
    }

}
