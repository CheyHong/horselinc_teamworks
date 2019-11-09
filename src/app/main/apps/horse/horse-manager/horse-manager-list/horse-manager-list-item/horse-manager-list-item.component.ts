import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HorseManager } from 'app/main/apps/horse/horse-manager/horse-manager.model';
import { HorseManagerService } from 'app/main/apps/horse/horse-manager/horse-manager.service';

@Component({
    selector     : 'horse-manager-list-item',
    templateUrl  : './horse-manager-list-item.component.html',
    styleUrls    : ['./horse-manager-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorseManagerListItemComponent implements OnInit, OnDestroy
{
    @Input() horsemanager: HorseManager;
    labels: any[];

    @HostBinding('class.selected')
    selected: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {HorseManagerService} _horsemanagerService
     * 
     */

    constructor(
        private _horsemanagerService: HorseManagerService
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
        this.horsemanager = new HorseManager(this.horsemanager);

        // Subscribe to update on selected horse change
        this._horsemanagerService.onSelectedHorseManagersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedHorseManagers => {
                this.selected = false;

                if ( selectedHorseManagers.length > 0 )
                {
                    for ( const horsemanager of selectedHorseManagers )
                    {
                        if ( horsemanager.id === this.horsemanager.id )
                        {
                            this.selected = true;
                            break;
                        }
                    }
                }
            });

        // Subscribe to update on label change
        this._horsemanagerService.onLabelsChanged
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
    

    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void
    {
        event.stopPropagation();

        this.horsemanager.toggleStar();

        this._horsemanagerService.updateHorseManager(this.horsemanager);
    }

    /**
     * Toggle Important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.horsemanager.toggleImportant();

        this._horsemanagerService.updateHorseManager(this.horsemanager);
    }
}
