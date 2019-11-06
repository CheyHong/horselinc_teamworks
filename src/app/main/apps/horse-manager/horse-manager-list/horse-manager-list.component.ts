
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { HorseManager } from 'app/main/apps/horse-manager/horse-manager.model';
import { HorseManagerService } from 'app/main/apps/horse-manager/horse-manager.service';

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
        private _horsemanagerService: HorseManagerService,
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
        this._horsemanagerService.onHorseManagersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(horsemanagers => {
                this.horsemanagers = horsemanagers;
            });

        // Subscribe to update current horse on changes
        this._horsemanagerService.onCurrentHorseManagerChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentHorseManager => {
                if ( !currentHorseManager )
                {
                    // Set the current horse id to null to deselect the current horse
                    this.currentHorseManager = null;

                    // Handle the location changes
                    const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
                          filterHandle = this._activatedRoute.snapshot.params.filterHandle,
                          folderHandle = this._activatedRoute.snapshot.params.folderHandle;

                    if ( labelHandle )
                    {
                        this._location.go('apps/horse-manager/label/' + labelHandle);
                    }
                    else if ( filterHandle )
                    {
                        this._location.go('apps/horse-manager/filter/' + filterHandle);
                    }
                    else
                    {
                        this._location.go('apps/horse-manager/' + folderHandle);
                    }
                }
                else
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
    readhorsemanager(horsemanagerId): void
    {
        const folderHandle = this._activatedRoute.snapshot.params.folderHandle;
             
        // if ( labelHandle )
        // {
        //     this._location.go('apps/horse/label/' + labelHandle + '/' + horseId);
        // }
        // else if ( filterHandle )
        // {
        //     this._location.go('apps/horse/filter/' + filterHandle + '/' + horseId);
        // }
        // else
        {
            this._location.go('apps/horse/manager/' + folderHandle + '/' + horsemanagerId);
        }

        // Set current horse
        this._horsemanagerService.setCurrentHorseManager(horsemanagerId);
    }
    editHorseProfile(): void
    {
        this._fuseSidebarService.getSidebar('horse-manager-profile-panel').toggleOpen();
    }
    HorseFilter() {
        this.toggle = !this.toggle;
    }
    
}
