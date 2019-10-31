import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'profile-sidebar',
    templateUrl  : './profile-sidebar.component.html',
    styleUrls    : ['./profile-sidebar.component.scss'],
//    encapsulation: ViewEncapsulation.None,
//    animations   : fuseAnimations
})
export class ProfileSidebarComponent implements OnInit, OnDestroy
{
    // Private

    /**
     * Constructor
     *
     * @param {Router} _router
     */
    constructor(
        private _router: Router
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
}
