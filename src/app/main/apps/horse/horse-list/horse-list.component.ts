import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { Horse } from 'app/main/apps/horse/horse.model';
import { HorseService } from 'app/main/apps/horse/horse.service';

@Component({
    selector     : 'horse-list',
    templateUrl  : './horse-list.component.html',
    styleUrls    : ['./horse-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HorseListComponent implements OnInit, OnDestroy
{
    horses: Horse[];
    currentHorse: Horse;

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
        private _horseService: HorseService,
        private _location: Location
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
        this._horseService.onHorsesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(horses => {
                this.horses = horses;
            });

        // Subscribe to update current horse on changes
        this._horseService.onCurrentHorseChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentHorse => {
                if ( !currentHorse )
                {
                    // Set the current horse id to null to deselect the current horse
                    this.currentHorse = null;

                    // Handle the location changes
                    const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
                          filterHandle = this._activatedRoute.snapshot.params.filterHandle,
                          folderHandle = this._activatedRoute.snapshot.params.folderHandle;

                    if ( labelHandle )
                    {
                        this._location.go('apps/horse/label/' + labelHandle);
                    }
                    else if ( filterHandle )
                    {
                        this._location.go('apps/horse/filter/' + filterHandle);
                    }
                    else
                    {
                        this._location.go('apps/horse/' + folderHandle);
                    }
                }
                else
                {
                    this.currentHorse = currentHorse;
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
    readhorse(horseId): void
    {
        const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
              filterHandle = this._activatedRoute.snapshot.params.filterHandle,
              folderHandle = this._activatedRoute.snapshot.params.folderHandle;

        if ( labelHandle )
        {
            this._location.go('apps/horse/label/' + labelHandle + '/' + horseId);
        }
        else if ( filterHandle )
        {
            this._location.go('apps/horse/filter/' + filterHandle + '/' + horseId);
        }
        else
        {
            this._location.go('apps/horse/' + folderHandle + '/' + horseId);
        }

        // Set current horse
        this._horseService.setCurrentHorse(horseId);
    }
}
