import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'schedule-filter-dialog',
  templateUrl: './schedule-filter-dialog.component.html',
  styleUrls: ['./schedule-filter-dialog.component.scss']
})
export class ScheduleFilterDialogComponent implements OnInit {
    toggle: boolean;

    constructor() { }

    ngOnInit() {
        this.toggle = true;
    }

    toggleFilter() {
        this.toggle = !this.toggle;
    }

}
