import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';


interface Sortby {
    value: string;
    viewValue: string;
}


@Component({
  selector: 'horse-manager-dialog',
  templateUrl: './horse-manager-dialog.component.html',
  styleUrls: ['./horse-manager-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HorseManagerDialogComponent implements OnInit {
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
