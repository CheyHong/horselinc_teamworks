import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Provider } from 'app/main/apps/horse-provider/provider.model';

@Injectable()
export class HorseProviderService implements Resolve<any>{

    providers: Provider[];
    currentProvider: Provider;
    routeParams: any;
    selectedProviders: Provider[];
    searchText: string;
    filters: any[];
    tags: any[];

    onProvidersChanged: BehaviorSubject<any>;
    onCurrentProviderChanged: BehaviorSubject<any>;
    onNewProviderClicked: Subject<any>;
    onSelectedProvidersChanged: BehaviorSubject<any>;
    onFiltersChanged: BehaviorSubject<any>;
    onTagsChanged: BehaviorSubject<any>;
    onSearchTextChanged: BehaviorSubject<any>;

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
        // Set the defaults
        this.selectedProviders = [];
        this.searchText = '';
        this.onProvidersChanged = new BehaviorSubject([]);
        this.onSelectedProvidersChanged = new BehaviorSubject([]);
        this.onCurrentProviderChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onTagsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
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
                this.getFilters(),
                this.getTags(),
                this.getProviders()
            ]).then(
                () => {
                    if ( this.routeParams.providerId )
                    {
                        this.setCurrentProvider(this.routeParams.providerId);
                    }
                    else
                    {
                        this.setCurrentProvider(this.providers[0].id);
                        // this.setCurrentProvider(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getProviders();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getProviders();
                        }
                    });
                    resolve();
                },
                reject
            );
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
            this._httpClient.get('api/provider-filters')
                .subscribe((response: any) => {
                    this.filters = response;
                    this.onFiltersChanged.next(this.filters);
                    resolve(this.filters);
                }, reject);
        });
    }

    /**
     * Get all tags
     *
     * @returns {Promise<any>}
     */
    getTags(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/provider-tags')
                .subscribe((response: any) => {
                    this.tags = response;
                    this.onTagsChanged.next(this.tags);
                    resolve(this.tags);
                }, reject);
        });
    }

    /**
     * Get providers
     *
     * @returns {Promise<Provider[]>}
     */
    getProviders(): Promise<Provider[]>
    {
        if ( this.routeParams.tagHandle )
        {
            return this.getProvidersByTag(this.routeParams.tagHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getProvidersByFilter(this.routeParams.filterHandle);
        }

        return this.getProvidersByParams(this.routeParams);
    }

    /**
     * Get providers by params
     *
     * @param handle
     * @returns {Promise<Provider[]>}
     */
    getProvidersByParams(handle): Promise<Provider[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/provider-providers')
                .subscribe((providers: any) => {
                    this.providers = providers.map(provider => {
                        return new Provider(provider);
                    });
                    this.providers = FuseUtils.filterArrayByString(this.providers, this.searchText);

                    this.onProvidersChanged.next(this.providers);
                    resolve(this.providers);
                });
        });
    }

    /**
     * Get providers by filter
     *
     * @param handle
     * @returns {Promise<Provider[]>}
     */
    getProvidersByFilter(handle): Promise<Provider[]>
    {

        let param = handle + '=true';

        if ( handle === 'dueDate' )
        {
            param = handle + '=^$|\\s+';
        }

        return new Promise((resolve, reject) => {

            this._httpClient.get('api/provider-providers?' + param)
                .subscribe((providers: any) => {

                    this.providers = providers.map(provider => {
                        return new Provider(provider);
                    });

                    this.providers = FuseUtils.filterArrayByString(this.providers, this.searchText);

                    this.onProvidersChanged.next(this.providers);

                    resolve(this.providers);

                }, reject);
        });
    }

    /**
     * Get providers by tag
     *
     * @param handle
     * @returns {Promise<Provider[]>}
     */
    getProvidersByTag(handle): Promise<Provider[]>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/provider-tags?handle=' + handle)
                .subscribe((tags: any) => {

                    const tagId = tags[0].id;

                    this._httpClient.get('api/provider-providers?tags=' + tagId)
                        .subscribe((providers: any) => {

                            this.providers = providers.map(provider => {
                                return new Provider(provider);
                            });

                            this.providers = FuseUtils.filterArrayByString(this.providers, this.searchText);

                            this.onProvidersChanged.next(this.providers);

                            resolve(this.providers);

                        }, reject);
                });
        });
    }

    toggleSelectedProvider(id): void
    {
        // First, check if we already have that provider as selected...
        if ( this.selectedProviders.length > 0 )
        {
            for ( const provider of this.selectedProviders )
            {
                // ...delete the selected provider
                if ( provider.id === id )
                {
                    const index = this.selectedProviders.indexOf(provider);

                    if ( index !== -1 )
                    {
                        this.selectedProviders.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedProvidersChanged.next(this.selectedProviders);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedProviders.push(
            this.providers.find(provider => {
                return provider.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedProvidersChanged.next(this.selectedProviders);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedProviders.length > 0 )
        {
            this.deselectProviders();
        }
        else
        {
            this.selectProviders();
        }

    }

    /**
     * Select providers
     *
     * @param filterParameter
     * @param filterValue
     */
    selectProviders(filterParameter?, filterValue?): void
    {
        this.selectedProviders = [];

        // If there is no filter, select all providers
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedProviders = this.providers;
        }
        else
        {
            this.selectedProviders.push(...
                this.providers.filter(provider => {
                    return provider[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedProvidersChanged.next(this.selectedProviders);
    }

    /**
     * Deselect providers
     */
    deselectProviders(): void
    {
        this.selectedProviders = [];

        // Trigger the next event
        this.onSelectedProvidersChanged.next(this.selectedProviders);
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
        console.log(id);
        this._location.go('apps/horse-provider/all/' + id);
    }

    /**
     * Toggle tag on selected providers
     *
     * @param tagId
     */
    toggleTagOnSelectedProviders(tagId): void
    {
        this.selectedProviders.map(provider => {
            this.toggleTagOnProvider(tagId, provider);
        });
    }

    /**
     * Toggle tag on provider
     *
     * @param tagId
     * @param provider
     */
    toggleTagOnProvider(tagId, provider): void
    {
        const index = provider.tags.indexOf(tagId);

        if ( index !== -1 )
        {
            provider.tags.splice(index, 1);
        }
        else
        {
            provider.tags.push(tagId);
        }

        this.updateProvider(provider);
    }

    /**
     * Has tag?
     *
     * @param tagId
     * @param provider
     * @returns {boolean}
     */
    hasTag(tagId, provider): any
    {
        if ( !provider.tags )
        {
            return false;
        }

        return provider.tags.indexOf(tagId) !== -1;
    }

    /**
     * Update the provider
     *
     * @param provider
     * @returns {Promise<any>}
     */
    updateProvider(provider): any
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/provider-providers/' + provider.id, {...provider})
                .subscribe(response => {

                    this.getProviders().then(providers => {

                        resolve(providers);

                    }, reject);
                });
        });
    }
}
