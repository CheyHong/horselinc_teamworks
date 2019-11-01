import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { Profile } from 'app/main/apps/profile/profile.model';
import { ProfileService } from 'app/main/apps/profile/profile.service';



@Component({
    selector     : 'profile-details',
    templateUrl  : './profile-details.component.html',
    styleUrls    : ['./profile-details.component.scss'],
    
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileDetailsComponent implements OnInit, OnDestroy
{
    profile: Profile;
    labels: any[];
    showDetails: boolean;
    selectedDate: any;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {profileService} _profileService
     */
    constructor(
        private _profileService: ProfileService
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
        this._profileService.onCurrentProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentProfile => {
                this.profile = currentProfile;
            });

        // Subscribe to update on label change
        this._profileService.onLabelsChanged
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

        this.profile.toggleStar();

        this._profileService.updateProfile(this.profile);
    }

    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.profile.toggleImportant();

        this._profileService.updateProfile(this.profile);
    }
    
}
