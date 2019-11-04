import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from 'app/main/apps/profile/profile.service';

@Component({
    selector     : 'profile-editpayment',
    templateUrl  : './profile-editpayment.component.html',
    styleUrls    : ['./profile-editpayment.component.scss'],
    
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileEditPaymentComponent implements OnInit, OnDestroy
{
    /**
     * Constructor
     *
     * @param {profileService} _profileService
     */
    constructor(
        private _profileService: ProfileService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
    }

    
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
}