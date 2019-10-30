import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Horse } from 'app/main/apps/horse/horse.model';
import { HorseService } from 'app/main/apps/horse/horse.service';

@Component({
    selector     : 'horse-list-item',
    templateUrl  : './horse-list-item.component.html',
    styleUrls    : ['./horse-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorseListItemComponent implements OnInit, OnDestroy
{
    @Input() horse: Horse;
    labels: any[];

    @HostBinding('class.selected')
    selected: boolean;

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
        // Set the initial values
        this.horse = new Horse(this.horse);

        // Subscribe to update on selected horse change
        this._horseService.onSelectedHorsesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedhorses => {
                this.selected = false;

                if ( selectedhorses.length > 0 )
                {
                    for ( const horse of selectedhorses )
                    {
                        if ( horse.id === this.horse.id )
                        {
                            this.selected = true;
                            break;
                        }
                    }
                }
            });

        // Subscribe to update on label change
        this._horseService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
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
     * On selected change
     */
    onSelectedChange(): void
    {
        this._horseService.toggleSelectedhorse(this.horse.id);
    }

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
     * Toggle Important
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
