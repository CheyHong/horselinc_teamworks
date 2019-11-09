
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { HorseManager } from 'app/main/apps/horse/horse-manager/horse-manager.model';
import { HorseManagerService } from 'app/main/apps/horse/horse-manager/horse-manager.service';

interface Data {
    value: string;
    viewValue: string;
  }
  
@Component({
    selector     : 'horse-manager-list',
    templateUrl  : './horse-manager-list.component.html',
    styleUrls    : ['./horse-manager-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HorseManagerListComponent implements OnInit, OnDestroy
{
    horsemanagers: HorseManager[];
    currentHorseManager: HorseManager;
    toggle: boolean;
    datas: Data[];


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {HorseService} _horseService
     * @param {Location} _location
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _horseManagerService: HorseManagerService,
        private _location: Location,
        private _fuseSidebarService: FuseSidebarService,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to update horses on changes
        this.toggle = true;

        this.datas = [
            {value: 'steak-0', viewValue: 'Steak'},
            {value: 'pizza-1', viewValue: 'Pizza'},
            {value: 'tacos-2', viewValue: 'Tacos'}
          ];

        this._horseManagerService.onHorseManagersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(horsemanagers => {
                this.horsemanagers = horsemanagers;
            });

        // Subscribe to update current horse on changes
        this._horseManagerService.onCurrentHorseManagerChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentHorseManager => {
                if ( currentHorseManager )
                {
                
                    this.currentHorseManager = currentHorseManager;
                }
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read horse
     *
     * @param horseId
     */
    readHorseManager(horseManagerId): void
    {
       
        this._horseManagerService.setCurrentHorseManager(horseManagerId);
        this._horseManagerService.setCurrentHorseFlag(true);
    
    }
    editHorseProfile(): void
    {
        this._fuseSidebarService.getSidebar('horse-manager-profile-panel').toggleOpen();
    }
    HorseFilter() {
        this.toggle = !this.toggle;
    }
    
}
