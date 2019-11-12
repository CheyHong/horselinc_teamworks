import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ProfileService } from 'app/main/profile/profile.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector     : 'apps-profile-provider',
    templateUrl  : './provider.component.html',
    styleUrls    : ['./provider.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileProviderComponent implements OnInit, OnDestroy
{
    selectedProfileNo: number;
    currentProfileFlag: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private _fuseSidebarService: FuseSidebarService,
    )
    
        // Configure the layout
    { 
        this.selectedProfileNo = 0;
        this.currentProfileFlag = false;
        this._unsubscribeAll = new Subject();

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
            console.log('SelectedProfileNo:', this.currentProfileFlag);
        });

         this._profileService.onCurrentProfileFlagChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(currentProfileFlag => {
            this.currentProfileFlag = currentProfileFlag;
            console.log('CurrentProfileFlag:', this.currentProfileFlag);
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
    gotoList(): void
    {
        this._profileService.setCurrentProfileFlag(false);
    }
}
