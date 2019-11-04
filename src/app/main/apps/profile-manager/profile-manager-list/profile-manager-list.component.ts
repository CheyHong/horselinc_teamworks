import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ProfileManagerService } from 'app/main/apps/profile-manager/profile-manager.service';

@Component({
    selector     : 'apps-profile-manager-list',
    templateUrl  : './profile-manager-list.component.html',
    styleUrls    : ['./profile-manager-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileManagerListComponent implements OnInit, OnDestroy
{
    selectedProfileNo: number;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {ProfileManagerService} _profileService
     * @param {Location} _location
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _profileService: ProfileManagerService,
        private _location: Location
    )
    {
        this.selectedProfileNo = 0;
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
        this._profileService.onSelectedProfileNoChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(selectedProfileNo => {
            this.selectedProfileNo = selectedProfileNo;
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
    onSelectedProfile(profileNo: any): void
    {
        console.log("profile-list-onSelectedProfile:", profileNo);
        this.selectedProfileNo = profileNo; 
        this._profileService.selectProfile(this.selectedProfileNo);
//        this._location.go('apps/profile/navigation1' + '/' + itemUri);
    }
    editProfile(): void
    {
        console.log("EditProfile");
    }
}
