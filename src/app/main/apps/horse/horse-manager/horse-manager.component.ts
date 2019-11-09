import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { HorseManager } from 'app/main/apps/horse/horse-manager/horse-manager.model';
import { HorseManagerService } from 'app/main/apps/horse/horse-manager/horse-manager.service';

import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector     : 'horse-manager',
    templateUrl  : './horse-manager.component.html',
    styleUrls    : ['./horse-manager.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorseManagerComponent implements OnInit, OnDestroy
{
    hasSelectedHorseManagers: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentHorseManager: HorseManager;
    currentHorseFlag: boolean;

    // Private
    
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {HorseManagerService} _horseManagerService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _horseManagerService: HorseManagerService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
    )
        
        // Configure the layout   
    {
        // Set the defaults
        this.searchInput = new FormControl('');
        this.currentHorseFlag = false;

        // Set the private defaults
        this._unsubscribeAll = new Subject();

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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this._horseManagerService.onCurrentHorseManagerChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentHorseManager => {
                if ( !currentHorseManager )
                {
                    this.currentHorseManager = null;
                }
                else
                {
                    this.currentHorseManager = currentHorseManager;
                }
            });

        
        this.searchInput.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        )
            .subscribe(searchText => {
                this._horseManagerService.onSearchTextChanged.next(searchText);
            });

        this._horseManagerService.onCurrentHorseFlagChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentHorseFlag => {
                this.currentHorseFlag = currentHorseFlag;
                console.log('CurrentHorseFlag:', this.currentHorseFlag);
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

   
    gotoList():void
    {
        this._horseManagerService.setCurrentHorseFlag(false);
    }
    
}
