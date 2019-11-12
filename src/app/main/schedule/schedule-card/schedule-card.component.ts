import { Component, OnInit, Input } from '@angular/core';

interface Card {
  desc: string;
  type: string;
}

@Component({
  selector: 'schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})

export class ScheduleCardComponent implements OnInit {

  @Input() card: Card;

  constructor() {

  }

  ngOnInit() {
  }

}
