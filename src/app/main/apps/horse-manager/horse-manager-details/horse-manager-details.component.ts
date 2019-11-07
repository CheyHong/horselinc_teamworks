import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { HorseManager } from 'app/main/apps/horse-manager/horse-manager.model';
import { HorseManagerService } from 'app/main/apps/horse-manager/horse-manager.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
@Component({
    selector     : 'horse-manager-details',
    templateUrl  : './horse-manager-details.component.html',
    styleUrls    : ['./horse-manager-details.component.scss'],
    
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HorseManagerDetailsComponent implements OnInit, OnDestroy
{
    horsemanager: HorseManager;
    labels: any[];
    showDetails: boolean;
    selectedDate: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {horsemanagerService} _horsemanagerService
     */
    constructor(
        private _horsemanagerService: HorseManagerService,
        private _fuseSidebarService: FuseSidebarService,
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
        this._horsemanagerService.onCurrentHorseManagerChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentHorseManager => {
                this.horsemanager = currentHorseManager;
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
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.horsemanager.toggleImportant();

        this._horsemanagerService.updateHorseManager(this.horsemanager);
    }
    ScheduleService():void
    {
        this._fuseSidebarService.getSidebar('horse-manager-schedule-panel').toggleOpen();
    }
    editHorseProfile():void{
        this._fuseSidebarService.getSidebar('horse-manager-profile-panel').toggleOpen();
    }
    
}
