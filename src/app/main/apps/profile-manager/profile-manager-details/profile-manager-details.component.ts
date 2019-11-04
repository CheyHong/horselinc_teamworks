import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ProfileManagerService } from 'app/main/apps/profile-manager/profile-manager.service';

@Component({
    selector     : 'apps-profile-manager-details',
    templateUrl  : './profile-manager-details.component.html',
    styleUrls    : ['./profile-manager-details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileManagerDetailsComponent implements OnInit, OnDestroy
{
    selectedProfileNo: number;
    isSelectedProfile: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileManagerService} _profileService
     */
    constructor(
        private _profileService: ProfileManagerService,
    )
    
        // Configure the layout
    { 
        this.selectedProfileNo = 0;
        this._unsubscribeAll = new Subject();

        console.log("profile-detail-constructor", this.selectedProfileNo);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {

         this._profileService.onSelectedProfileNoChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(selectedProfileNo => {
            this.selectedProfileNo = selectedProfileNo;

            console.log("profile-detail-onSelectedProfileNoChanged", this.selectedProfileNo);
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
