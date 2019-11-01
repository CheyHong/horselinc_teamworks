import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { Profile } from 'app/main/apps/profile/profile.model';
import { ProfileService } from 'app/main/apps/profile/profile.service';

@Component({
    selector     : 'profile-list',
    templateUrl  : './profile-list.component.html',
    styleUrls    : ['./profile-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileListComponent implements OnInit, OnDestroy
{
    profiles: Profile[];
    currentProfile: Profile;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {ProfileService} _profileService
     * @param {Location} _location
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _profileService: ProfileService,
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
        this._profileService.onProfilesChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(profiles => {
            this.profiles = profiles;
        });

    // Subscribe to update current horse on changes
    this._profileService.onCurrentProfileChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(currentProfile => {
            if ( !currentProfile )
            {
                // Set the current horse id to null to deselect the current horse
                this.currentProfile = null;

                // Handle the location changes
                const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
                      filterHandle = this._activatedRoute.snapshot.params.filterHandle,
                      folderHandle = this._activatedRoute.snapshot.params.folderHandle;

                if ( labelHandle )
                {
                    this._location.go('apps/profile/label/' + labelHandle);
                }
                else if ( filterHandle )
                {
                    this._location.go('apps/profile/filter/' + filterHandle);
                }
                else
                {
                    this._location.go('apps/profile/' + folderHandle);
                }
            }
            else
            {
                this.currentProfile = currentProfile;
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
     * Read profile
     *
     * @param profileId 
     */   
    readProfile(profileId): void
    {
        const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
              filterHandle = this._activatedRoute.snapshot.params.filterHandle,
              folderHandle = this._activatedRoute.snapshot.params.folderHandle;

        if ( labelHandle )
        {
            this._location.go('apps/profile/label/' + labelHandle + '/' + profileId);
        }
        else if ( filterHandle )
        {
            this._location.go('apps/profile/filter/' + filterHandle + '/' + profileId);
        }
        else
        {
            this._location.go('apps/profile/' + folderHandle + '/' + profileId);
        }

        // Set current mail
        this._profileService.setCurrentProfile(profileId);
    }
}
