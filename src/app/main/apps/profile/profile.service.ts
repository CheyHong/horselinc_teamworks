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
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }
}
