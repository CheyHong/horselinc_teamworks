import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';

import { Schedule } from 'app/main/apps/schedule/schedule.model';
import { ScheduleService } from 'app/main/apps/schedule/schedule.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class ScheduleComponent implements OnInit {

    currentSchedule: Schedule;
    
    constructor() { }

    ngOnInit() {
    }

}
