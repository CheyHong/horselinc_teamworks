import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { ProfileService } from 'app/main/apps/profile/profile.service';

@Component({
    selector     : 'apps-profile-manager-payment',
    templateUrl  : './payment.component.html',
    styleUrls    : ['./payment.component.scss'],
    
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
        private _profileService: ProfileService,
        private _fuseSidebarService: FuseSidebarService,
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
    onAddPayment(): void
    {
        this._fuseSidebarService.getSidebar('profile-manager-addpayment').toggleOpen();
    }
}
