import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { Profile } from 'app/main/apps/profile/profile.model';
import { ProfileService } from 'app/main/apps/profile/profile.service';

import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector     : 'apps-profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, OnDestroy
{
    hasSelectedProfiles: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentProfile: Profile;

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
    )
    
        // Configure the layout
        
    
    {
        // Load the translations
        
        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();

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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._profileService.onSelectedProfilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedProfiles => {
                setTimeout(() => {
                    this.hasSelectedProfiles = selectedProfiles.length > 0;
                    this.isIndeterminate = (selectedProfiles.length !== this._profileService.profiles.length && selectedProfiles.length > 0);
                }, 0);
            });

        this._profileService.onFoldersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.folders = this._profileService.folders;
            });

        this._profileService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this._profileService.filters;
            });

        this._profileService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = this._profileService.labels;
            });

        this._profileService.onCurrentProfileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentProfile => {
                if ( !currentProfile )
                {
                    this.currentProfile = null;
                }
                else
                {
                    this.currentProfile = currentProfile;
                }
            });

        this.searchInput.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        )
            .subscribe(searchText => {
                this._profileService.onSearchTextChanged.next(searchText);
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
     * Toggle select all
     */
    toggleSelectAll(): void
    {
         this._profileService.toggleSelectAll();
    }

    /**
     * Select profiles
     *
     * @param filterParameter
     * @param filterValue
     */
    selectProfiles(filterParameter?, filterValue?): void
    {
         this._profileService.selectProfiles(filterParameter, filterValue);
    }

    /**
     * Deselect profiles
     */
    deselectProfiles(): void
    {
         this._profileService.deselectProfiles();
    }

    /**
     * Deselect current profile
     */
    deselectCurrentProfile(): void
    {
        this._profileService.onCurrentProfileChanged.next(null);
    }

    /**
     * Toggle label on selected profiles
     *
     * @param labelId
     */
    toggleLabelOnSelectedProfiles(labelId): void
    {
         this._profileService.toggleLabelOnSelectedProfiles(labelId);
    }

    /**
     * Set folder on selected profiles
     *
     * @param folderId
     */
    setFolderOnSelectedProfiles(folderId): void
    {
         this._profileService.setFolderOnSelectedProfiles(folderId);
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
         this._fuseSidebarService.getSidebar(name).toggleOpen();
    }

}
