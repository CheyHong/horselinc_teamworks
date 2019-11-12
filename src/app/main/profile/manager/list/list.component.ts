import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { ProfileService } from 'app/main/profile/profile.service';

@Component({
    selector     : 'apps-profile-manager-list',
    templateUrl  : './list.component.html',
    styleUrls    : ['./list.component.scss'],
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
     * @param {ProfileService} _profileService
     * @param {Location} _location
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _profileService: ProfileService,
        private _location: Location,
        private _fuseSidebarService: FuseSidebarService,
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
        this.selectedProfileNo = profileNo; 
        this._profileService.setSelectProfileNo(this.selectedProfileNo);
        this._profileService.setCurrentProfileFlag(true);
    }
    editProfile(): void
    {
        this._fuseSidebarService.getSidebar('profile-manager-editprofile').toggleOpen();
    }
    addServiceProvider(): void
    {
        this._fuseSidebarService.getSidebar('profile-manager-addprovider').toggleOpen();
    }
}
