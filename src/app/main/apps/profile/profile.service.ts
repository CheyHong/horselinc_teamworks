import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseUtils } from '@fuse/utils';

@Injectable()
export class ProfileService implements Resolve<any>
{
    selectedProfileNo: number;
    currentProfileFlag: boolean;
    routeParams: any;

    onSelectedProfileNoChanged: BehaviorSubject<any>;
    onCurrentProfileFlagChanged: BehaviorSubject<any>;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _router: Router
    )
    {
        // Set the defaults

        this.selectedProfileNo = 0;
        this.currentProfileFlag = false;
        this.onSelectedProfileNoChanged = new BehaviorSubject([]);
        this.onCurrentProfileFlagChanged = new BehaviorSubject([]);
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
        console.log('profile service resolve');
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
    setSelectProfileNo(selectedProfileNo: number): void
    {
        this.selectedProfileNo = selectedProfileNo;
        this.onSelectedProfileNoChanged.next(this.selectedProfileNo);
    }
    setCurrentProfileFlag(currentProfileFlag: boolean): void
    {
        this.currentProfileFlag = currentProfileFlag;
        this.onCurrentProfileFlagChanged.next(this.currentProfileFlag);
    }
    exportManagerPayment(): void
    {
        this.setSelectProfileNo(1);
    }
}
