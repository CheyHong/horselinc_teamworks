import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';

interface Food {
    value: string;
    viewValue: string;
  }
  
@Component({
    selector     : 'horse-manager-schedule',
    templateUrl  : './horse-manager-schedule.component.html',
    styleUrls    : ['./horse-manager-schedule.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorseManagerScheduleComponent implements OnInit, OnDestroy
{
    hasSelectedHorseScheduleComponent: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentHorseScheduleComponent: HorseManagerScheduleComponent;
    toggle: boolean;
    foods: Food[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * 
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
     
        private _fuseSidebarService: FuseSidebarService,
        private _fuseConfigService: FuseConfigService,
       
    )
    
    {
        this.searchInput = new FormControl('');
        this._unsubscribeAll = new Subject();   
    }

    
    ngOnInit(): void
    {
      
        this.foods = [
            {value: 'steak-0', viewValue: 'Steak'},
            {value: 'pizza-1', viewValue: 'Pizza'},
            {value: 'tacos-2', viewValue: 'Tacos'}
          ];

        this.toggle = true;

    }
  
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
   
    ScheduleCancel():void
    {
        this._fuseSidebarService.getSidebar('horse-manager-schedule-panel').toggleOpen();
    }
    ScheduleNext():void
    {
        this._fuseSidebarService.getSidebar('horse-manager-schedule-panel').toggleOpen();
        this._fuseSidebarService.getSidebar('horse-manager-confirm-panel').toggleOpen();
    }    
}

