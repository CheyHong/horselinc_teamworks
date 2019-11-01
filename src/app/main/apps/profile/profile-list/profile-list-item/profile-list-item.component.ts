import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Profile } from 'app/main/apps/profile/profile.model';
import { ProfileService } from 'app/main/apps/profile/profile.service';

@Component({
    selector     : 'profile-list-item',
    templateUrl  : './profile-list-item.component.html',
    styleUrls    : ['./profile-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileListItemComponent implements OnInit, OnDestroy
{
      @Input() profile: Profile;
      labels: any[];

    @HostBinding('class.selected')
    selected: boolean;

    // // Private
     private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
         private _profileService: ProfileService
    )
    {
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
        // Set the initial values
        this.profile = new Profile(this.profile);

        // Subscribe to update on selected horse change
        this._profileService.onSelectedProfilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedhorses => {
                this.selected = false;

                if ( selectedhorses.length > 0 )
                {
                    for ( const horse of selectedhorses )
                    {
                        if ( horse.id === this.profile.id )
                        {
                            this.selected = true;
                            break;
                        }
                    }
                }
            });

        // Subscribe to update on label change
        this._profileService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
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

    /**
     * On selected change
     */
    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void
    {
        event.stopPropagation();

        this.profile.toggleStar();

        this._profileService.updateProfile(this.profile);
    }

    /**
     * Toggle Important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.profile.toggleImportant();

        this._profileService.updateProfile(this.profile);
    }
}
