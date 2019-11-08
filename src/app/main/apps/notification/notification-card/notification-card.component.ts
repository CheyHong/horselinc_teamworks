import { Component, OnInit, Input } from '@angular/core';

interface Card {
  avatar: string;
  txt: string;
  date: string;
}

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})

export class NotificationCardComponent implements OnInit {

  @Input() card: Card;

  constructor() { }

  ngOnInit() {
  }

}
