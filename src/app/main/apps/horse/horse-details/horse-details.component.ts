import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { Horse } from 'app/main/apps/horse/horse.model';
import { HorseService } from 'app/main/apps/horse/horse.service';



@Component({
    selector     : 'horse-details',
    templateUrl  : './horse-details.component.html',
    styleUrls    : ['./horse-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HorseDetailsComponent implements OnInit, OnDestroy
{
    horse: Horse;
    labels: any[];
    showDetails: boolean;
    selectedDate: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {horseService} _horseService
     */
    constructor(
        private _horseService: HorseService
    )
    {
        // Set the defaults
        this.showDetails = false;

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
        // Subscribe to update the current horse
        this._horseService.onCurrentHorseChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentHorse => {
                this.horse = currentHorse;
            });

        // Subscribe to update on label change
        this._horseService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
            });
    }

    onSelect(event){
        console.log(event);
        this.selectedDate = event;
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
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void
    {
        event.stopPropagation();

        this.horse.toggleStar();

        this._horseService.updateHorse(this.horse);
    }

    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.horse.toggleImportant();

        this._horseService.updateHorse(this.horse);
    }
    
}
