import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Provider } from 'app/main/apps/payment/provider.model';

@Injectable()
export class ProviderPaymentService implements Resolve<any>{

    providers: Provider[];
    currentProvider: Provider;
    routeParams: any;

    onProvidersChanged: BehaviorSubject<any>;
    onCurrentProviderChanged: BehaviorSubject<any>;
    onNewProviderClicked: Subject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {Location} _location
     */

    constructor(
        private _httpClient: HttpClient,
        private _location: Location
    ) {

        this.onProvidersChanged = new BehaviorSubject([]);
        this.onCurrentProviderChanged = new BehaviorSubject([]);
        this.onNewProviderClicked = new Subject();
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
                this.getProviders()
            ]).then(
                () => {
                    if ( this.routeParams.todoId )
                    {
                        this.setCurrentProvider(this.routeParams.todoId);
                    }
                    else
                    {
                        this.setCurrentProvider(null);
                    }
                    resolve();
                },
                reject
            );
        });
    }

    getProviders(): Promise <Provider[]>
    {
        return this.getProvidersByParams(this.routeParams);
    }

    getProvidersByParams(handle): Promise<Provider[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/provider-providers')
                .subscribe((providers: any) => {

                    this.providers = providers.map(provider => {
                        return new Provider(provider);
                    });
                    // this.providers = FuseUtils.filterArrayByString(this.todos, this.searchText);

                    this.onProvidersChanged.next(this.providers);
                    resolve(this.providers);

                });
        });
    }

    /**
     * Set current provider by id
     *
     * @param id
     */
    setCurrentProvider(id): void
    {
        this.currentProvider = this.providers.find(provider => {
            return provider.id === id;
        });

        this.onCurrentProviderChanged.next(this.currentProvider);
    }

}
