import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

interface Card {
  avatar: string,
  txt: string,
  date: string
}

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

export class NotificationComponent implements OnInit {

  cardInfo: Card = {
    avatar: "assets/images/avatars/katherine.jpg",
    txt: "Misty Pleiness has completed request from dima to Tezmecal",
    date: "Sep 20, 2019"
  };

  constructor(
    private _fuseConfigService: FuseConfigService,
  ) {
    this._fuseConfigService.config = {
      layout: {
          navbar   : {
              hidden: false
          },
          toolbar  : {          
              hidden: false
          },
          footer   : {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
    };
  }

  ngOnInit() {
  }

}
