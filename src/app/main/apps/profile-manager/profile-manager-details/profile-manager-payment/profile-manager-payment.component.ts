import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ProfileManagerService } from 'app/main/apps/profile-manager/profile-manager.service';

@Component({
    selector     : 'apps-profile-manager-payment',
    templateUrl  : './profile-manager-payment.component.html',
    styleUrls    : ['./profile-manager-payment.component.scss'],
    
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileManagerPaymentComponent implements OnInit, OnDestroy
{
    /**
     * Constructor
     *
     * @param {profileService} _profileService
     */
    constructor(
        private _profileService: ProfileManagerService
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
