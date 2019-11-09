import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';

interface Food {
    value: string;
    viewValue: string;
  }
  
@Component({
    selector     : 'horse-manager-confirm',
    templateUrl  : './horse-manager-confirm.component.html',
    styleUrls    : ['./horse-manager-confirm.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorseManagerConfirmComponent implements OnInit, OnDestroy
{
    hasSelectedHorseSearchProfileComponent: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentHorseSearchProfileComponent: HorseManagerConfirmComponent;

    foods:Food[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     * 
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
     
        private _fuseSidebarService: FuseSidebarService,
    )     
      
    {
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();    
    }

 
    ngOnInit(): void
    {
        this.searchInput.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        );
            
    }

    ngOnDestroy():void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    confirmCancel():void
    {
        this._fuseSidebarService.getSidebar('horse-manager-confirm-panel').toggleOpen();
        this._fuseSidebarService.getSidebar('horse-manager-schedule-panel').toggleOpen();
    }   
}