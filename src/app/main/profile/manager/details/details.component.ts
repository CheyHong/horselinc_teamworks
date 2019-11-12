import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ProfileService } from 'app/main/profile/profile.service';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector     : 'apps-profile-manager-details',
    templateUrl  : './details.component.html',
    styleUrls    : ['./details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileManagerDetailsComponent implements OnInit, OnDestroy
{
    selectedProfileNo: number;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private _fuseConfigService: FuseConfigService,
    )
        // Configure the layout
    {
            // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: false
                },
                toolbar  : {          
                    hidden: false
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
         
        this.selectedProfileNo = 0;
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
}
