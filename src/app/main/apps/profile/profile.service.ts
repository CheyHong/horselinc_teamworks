import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

@Injectable()
export class ProfileService implements Resolve<any>
{
    selectedProfileNo: number;
    isSelectedProfile: boolean;
    routeParams: any;

    onSelectedProfileNoChanged: BehaviorSubject<any>;
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

        this.selectedProfileNo = 0;
        this.isSelectedProfile = false;
        this.onSelectedProfileNoChanged = new BehaviorSubject([]);
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
        console.log("profile service resolve");
        console.log(route.params);

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

    /**
     * Set selected profile no
     *
     * @returns {Promise<any>}
     */
    selectProfile(selectedProfileNo: number): void
    {
        this.selectedProfileNo = selectedProfileNo;
        this.onSelectedProfileNoChanged.next(this.selectedProfileNo);
    }
}
