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
    selectedItemNo: number;
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
        this.selectedItemNo = 0;
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
    onClickItem(itemUri: any): void
    {
        
        this.selectedItemNo = itemUri; 
        this._profileService.setSelectedListNo(this.selectedItemNo);
        this._location.go('apps/profile/navigation1' + '/' + itemUri);

    }
}
