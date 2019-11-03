import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';

import { Profile } from 'app/main/apps/profile/profile.model';
import { ProfileService } from 'app/main/apps/profile/profile.service';

@Component({
    selector     : 'apps-profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileDetailsComponent implements OnInit, OnDestroy
{
    selectedProfileNo: number;
    hasSelectedProfiles: boolean;
    select_component: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _profileService: ProfileService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseConfigService: FuseConfigService,
        private _activatedroute: ActivatedRoute,
    )
    
        // Configure the layout
    { 
        this.selectedListNo = 0;
        this._unsubscribeAll = new Subject();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {

         this._profileService.onSelectedListNoChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(selectedListNo => {
            this.selectedListNo = selectedListNo;
        });

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
