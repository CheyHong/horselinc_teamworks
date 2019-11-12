import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';

import { Schedule } from 'app/main/schedule/schedule.model';
import { ScheduleService } from 'app/main/schedule/schedule.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class ScheduleComponent implements OnInit {
    
    currentSchedule: Schedule;

    
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _fuseConfigService: FuseConfigService,
    ) {
            // Configure the layout
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

    ngOnInit(): void {
        
    }

    

}
