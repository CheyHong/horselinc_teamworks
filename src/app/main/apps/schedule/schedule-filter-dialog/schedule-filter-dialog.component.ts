import { Component, OnInit } from '@angular/core';

interface Sortby {
    value: string;
    viewValue: string;
}


@Component({
  selector: 'schedule-filter-dialog',
  templateUrl: './schedule-filter-dialog.component.html',
  styleUrls: ['./schedule-filter-dialog.component.scss']
})
export class ScheduleFilterDialogComponent implements OnInit {
    toggle: boolean;

    sortbys: Sortby[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];
    

    constructor() { }

    ngOnInit() {
        this.toggle = true;
    }

    toggleFilter() {
        this.toggle = !this.toggle;
    }

}
