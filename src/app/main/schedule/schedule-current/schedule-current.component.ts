import { Component, OnInit } from '@angular/core';

interface Card {
  desc: string;
  type: string;
}

@Component({
  selector: 'schedule-current',
  templateUrl: './schedule-current.component.html',
  styleUrls: ['./schedule-current.component.scss']
})

export class ScheduleCurrentComponent implements OnInit {

    card_today: Card = {
      desc:"Short special request description on specific braiding or warning about horse temperment",
      type: "today"
    };

    card_sun: Card = {
      desc: null,
      type: "sun"
    }

    card_accepted: Card = {
      desc: null,
      type: "sun_accepted"
    }

    constructor() {

    }

    ngOnInit() {
    }

}
