import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Profile } from 'app/main/apps/profile/profile.model';

@Injectable()
export class ProfileService implements Resolve<any>
{
    profiles: Profile[];
    selectedProfiles: Profile[];
    currentProfile: Profile;
    searchText = '';

    folders: any[];
    filters: any[];
    labels: any[];
    routeParams: any;

    onProfilesChanged: BehaviorSubject<any>;
    onSelectedProfilesChanged: BehaviorSubject<any>;
    onCurrentProfileChanged: BehaviorSubject<any>;
    onFoldersChanged: BehaviorSubject<any>;
    onFiltersChanged: BehaviorSubject<any>;
    onLabelsChanged: BehaviorSubject<any>;
    onSearchTextChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.selectedProfiles = [];
        this.onProfilesChanged = new BehaviorSubject([]);
        this.onSelectedProfilesChanged = new BehaviorSubject([]);
        this.onCurrentProfileChanged = new BehaviorSubject([]);
        this.onFoldersChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onLabelsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFolders(),
                this.getFilters(),
                this.getLabels(),
                this.getProfiles()
            ]).then(
                () => {
                    if ( this.routeParams.profileId )
                    {
                        this.setCurrentProfile(this.routeParams.profileId);
                    }
                    else
                    {
                        this.setCurrentProfile(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getProfiles();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getProfiles();
                        }
                    });

                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get all folders
     *
     * @returns {Promise<any>}
     */
    getFolders(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/profile-folders')
                .subscribe((response: any) => {
                    this.folders = response;
                    this.onFoldersChanged.next(this.folders);
                    resolve(this.folders);
                }, reject);
        });
    }

    /**
     * Get all filters
     *
     * @returns {Promise<any>}
     */
    getFilters(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/profile-filters')
                .subscribe((response: any) => {
                    this.filters = response;
                    this.onFiltersChanged.next(this.filters);
                    resolve(this.filters);
                }, reject);
        });
    }

    /**
     * Get all labels
     *
     * @returns {Promise<any>}
     */
    getLabels(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/profile-labels')
                .subscribe((response: any) => {
                    this.labels = response;
                    this.onLabelsChanged.next(this.labels);
                    resolve(this.labels);
                }, reject);
        });
    }

    /**
     * Get all Profiles
     *
     * @returns {Promise<Profile[]>}
     */
    getProfiles(): Promise<Profile[]>
    {
        if ( this.routeParams.labelHandle )
        {
            return this.getProfilesByLabel(this.routeParams.labelHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getProfilesByFilter(this.routeParams.filterHandle);
        }

        return this.getProfilesByFolder(this.routeParams.folderHandle);
    }

    /**
     * Get profiles by folder
     *
     * @param handle
     * @returns {Promise<profile[]>}
     */
    getProfilesByFolder(handle): Promise<Profile[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-folders?handle=' + handle)
                .subscribe((folders: any) => {

                    const folderId = folders[0].id;

                    this._httpClient.get('api/profile-profiles?folder=' + folderId)
                        .subscribe((profiles: any) => {

                            this.profiles = profiles.map(profile => {
                                return new Profile(profile);
                            });

                            this.profiles = FuseUtils.filterArrayByString(this.profiles, this.searchText);

                            this.onProfilesChanged.next(this.profiles);

                            resolve(this.profiles);

                        }, reject);
                });
        });
    }

    /**
     * Get profiles by filter
     *
     * @param handle
     * @returns {Promise<Profile[]>}
     */
    getProfilesByFilter(handle): Promise<Profile[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/profile-profiles?' + handle + '=true')
                .subscribe((profiles: any) => {

                    this.profiles = profiles.map(profile => {
                        return new Profile(profile);
                    });

                    this.profiles = FuseUtils.filterArrayByString(this.profiles, this.searchText);

                    this.onProfilesChanged.next(this.profiles);

                    resolve(this.profiles);

                }, reject);
        });
    }

    /**
     * Get profiles by label
     *
     * @param handle
     * @returns {Promise<Profile[]>}
     */
    getProfilesByLabel(handle): Promise<Profile[]>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/profile-labels?handle=' + handle)
                .subscribe((labels: any) => {

                    const labelId = labels[0].id;

                    this._httpClient.get('api/profile-profiles?labels=' + labelId)
                        .subscribe((profiles: any) => {

                            this.profiles = profiles.map(profile => {
                                return new Profile(profile);
                            });

                            this.profiles = FuseUtils.filterArrayByString(this.profiles, this.searchText);

                            this.onProfilesChanged.next(this.profiles);

                            resolve(this.profiles);

                        }, reject);
                });
        });
    }

    /**
     * Toggle selected profile by id
     *
     * @param id
     */
    toggleSelectedProfile(id): void
    {
        // First, check if we already have that profile as selected...
        if ( this.selectedProfiles.length > 0 )
        {
            for ( const profile of this.selectedProfiles )
            {
                // ...delete the selected profile
                if ( profile.id === id )
                {
                    const index = this.selectedProfiles.indexOf(profile);

                    if ( index !== -1 )
                    {
                        this.selectedProfiles.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedProfilesChanged.next(this.selectedProfiles);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedProfiles.push(
            this.profiles.find(profile => {
                return profile.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedProfilesChanged.next(this.selectedProfiles);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedProfiles.length > 0 )
        {
            this.deselectProfiles();
        }
        else
        {
            this.selectProfiles();
        }

    }

    /**
     * Select profiles
     *
     * @param filterParameter
     * @param filterValue
     */
    selectProfiles(filterParameter?, filterValue?): void
    {
        this.selectedProfiles = [];

        // If there is no filter, select all profiles
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedProfiles = this.profiles;
        }
        else
        {
            this.selectedProfiles.push(...
                this.profiles.filter(profile => {
                    return profile[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedProfilesChanged.next(this.selectedProfiles);
    }

    /**
     * Deselect profiles
     */
    deselectProfiles(): void
    {
        this.selectedProfiles = [];

        // Trigger the next event
        this.onSelectedProfilesChanged.next(this.selectedProfiles);
    }

    /**
     * Set current profile by id
     *
     * @param id
     */
    setCurrentProfile(id): void
    {
        this.currentProfile = this.profiles.find(profile => {
            return profile.id === id;
        });

        this.onCurrentProfileChanged.next(this.currentProfile);
    }

    /**
     * Toggle label on selected profiles
     *
     * @param labelId
     */
    toggleLabelOnSelectedProfiles(labelId): void
    {
        this.selectedProfiles.map(profile => {

            const index = profile.labels.indexOf(labelId);

            if ( index !== -1 )
            {
                profile.labels.splice(index, 1);
            }
            else
            {
                profile.labels.push(labelId);
            }

            this.updateProfile(profile);
        });
    }

    /**
     * Set folder on selected profiles
     *
     * @param folderId
     */
    setFolderOnSelectedProfiles(folderId): void
    {
        this.selectedProfiles.map(profile => {
            profile.folder = folderId;

            this.updateProfile(profile);
        });

        this.deselectProfiles();
    }

    /**
     * Update the profile
     *
     * @param profile
     * @returns {Promise<any>}
     */
    updateProfile(profile): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/profile-profiles/' + profile.id, {...profile})
                .subscribe(response => {

                    this.getProfiles().then(profiles => {

                        if ( profiles && this.currentProfile )
                        {
                            this.setCurrentProfile(this.currentProfile.id);
                        }

                        resolve(profiles);

                    }, reject);
                });
        });
    }
}
