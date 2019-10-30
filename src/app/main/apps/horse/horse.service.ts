import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Horse } from 'app/main/apps/horse/horse.model';

@Injectable()
export class HorseService implements Resolve<any>
{
    horses: Horse[];
    selectedHorses: Horse[];
    currentHorse: Horse;
    searchText = '';

    folders: any[];
    filters: any[];
    labels: any[];
    routeParams: any;

    onHorsesChanged: BehaviorSubject<any>;
    onSelectedHorsesChanged: BehaviorSubject<any>;
    onCurrentHorseChanged: BehaviorSubject<any>;
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
        this.selectedHorses = [];
        this.onHorsesChanged = new BehaviorSubject([]);
        this.onSelectedHorsesChanged = new BehaviorSubject([]);
        this.onCurrentHorseChanged = new BehaviorSubject([]);
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
                this.getHorses()
            ]).then(
                () => {
                    if ( this.routeParams.horseId )
                    {
                        this.setCurrentHorse(this.routeParams.horseId);
                    }
                    else
                    {
                        this.setCurrentHorse(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getHorses();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getHorses();
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
            this._httpClient.get('api/horse-folders')
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
            this._httpClient.get('api/horse-filters')
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
            this._httpClient.get('api/horse-labels')
                .subscribe((response: any) => {
                    this.labels = response;
                    this.onLabelsChanged.next(this.labels);
                    resolve(this.labels);
                }, reject);
        });
    }

    /**
     * Get all horses
     *
     * @returns {Promise<Horse[]>}
     */
    getHorses(): Promise<Horse[]>
    {
        if ( this.routeParams.labelHandle )
        {
            return this.getHorsesByLabel(this.routeParams.labelHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getHorsesByFilter(this.routeParams.filterHandle);
        }

        return this.getHorsesByFolder(this.routeParams.folderHandle);
    }

    /**
     * Get horses by folder
     *
     * @param handle
     * @returns {Promise<horse[]>}
     */
    getHorsesByFolder(handle): Promise<Horse[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/horse-folders?handle=' + handle)
                .subscribe((folders: any) => {

                    const folderId = folders[0].id;

                    this._httpClient.get('api/horse-horses?folder=' + folderId)
                        .subscribe((horses: any) => {

                            this.horses = horses.map(horse => {
                                return new Horse(horse);
                            });

                            this.horses = FuseUtils.filterArrayByString(this.horses, this.searchText);

                            this.onHorsesChanged.next(this.horses);

                            resolve(this.horses);

                        }, reject);
                });
        });
    }

    /**
     * Get horses by filter
     *
     * @param handle
     * @returns {Promise<horse[]>}
     */
    getHorsesByFilter(handle): Promise<Horse[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/horse-horses?' + handle + '=true')
                .subscribe((horses: any) => {

                    this.horses = horses.map(horse => {
                        return new horse(horse);
                    });

                    this.horses = FuseUtils.filterArrayByString(this.horses, this.searchText);

                    this.onHorsesChanged.next(this.horses);

                    resolve(this.horses);

                }, reject);
        });
    }

    /**
     * Get horses by label
     *
     * @param handle
     * @returns {Promise<horse[]>}
     */
    getHorsesByLabel(handle): Promise<Horse[]>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/horse-labels?handle=' + handle)
                .subscribe((labels: any) => {

                    const labelId = labels[0].id;

                    this._httpClient.get('api/horse-horses?labels=' + labelId)
                        .subscribe((horses: any) => {

                            this.horses = horses.map(horse => {
                                return new Horse(horse);
                            });

                            this.horses = FuseUtils.filterArrayByString(this.horses, this.searchText);

                            this.onHorsesChanged.next(this.horses);

                            resolve(this.horses);

                        }, reject);
                });
        });
    }

    /**
     * Toggle selected horse by id
     *
     * @param id
     */
    toggleSelectedhorse(id): void
    {
        // First, check if we already have that horse as selected...
        if ( this.selectedHorses.length > 0 )
        {
            for ( const horse of this.selectedHorses )
            {
                // ...delete the selected horse
                if ( horse.id === id )
                {
                    const index = this.selectedHorses.indexOf(horse);

                    if ( index !== -1 )
                    {
                        this.selectedHorses.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedHorsesChanged.next(this.selectedHorses);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedHorses.push(
            this.horses.find(horse => {
                return horse.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedHorsesChanged.next(this.selectedHorses);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedHorses.length > 0 )
        {
            this.deselectHorses();
        }
        else
        {
            this.selectHorses();
        }

    }

    /**
     * Select horses
     *
     * @param filterParameter
     * @param filterValue
     */
    selectHorses(filterParameter?, filterValue?): void
    {
        this.selectedHorses = [];

        // If there is no filter, select all horses
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedHorses = this.horses;
        }
        else
        {
            this.selectedHorses.push(...
                this.horses.filter(horse => {
                    return horse[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedHorsesChanged.next(this.selectedHorses);
    }

    /**
     * Deselect horses
     */
    deselectHorses(): void
    {
        this.selectedHorses = [];

        // Trigger the next event
        this.onSelectedHorsesChanged.next(this.selectedHorses);
    }

    /**
     * Set current horse by id
     *
     * @param id
     */
    setCurrentHorse(id): void
    {
        this.currentHorse = this.horses.find(horse => {
            return horse.id === id;
        });

        this.onCurrentHorseChanged.next(this.currentHorse);
    }

    /**
     * Toggle label on selected horses
     *
     * @param labelId
     */
    toggleLabelOnSelectedHorses(labelId): void
    {
        this.selectedHorses.map(horse => {

            const index = horse.labels.indexOf(labelId);

            if ( index !== -1 )
            {
                horse.labels.splice(index, 1);
            }
            else
            {
                horse.labels.push(labelId);
            }

            this.updateHorse(horse);
        });
    }

    /**
     * Set folder on selected horses
     *
     * @param folderId
     */
    setFolderOnSelectedHorses(folderId): void
    {
        this.selectedHorses.map(horse => {
            horse.folder = folderId;

            this.updateHorse(horse);
        });

        this.deselectHorses();
    }

    /**
     * Update the horse
     *
     * @param horse
     * @returns {Promise<any>}
     */
    updateHorse(horse): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/horse-horses/' + horse.id, {...horse})
                .subscribe(response => {

                    this.getHorses().then(horses => {

                        if ( horses && this.currentHorse )
                        {
                            this.setCurrentHorse(this.currentHorse.id);
                        }

                        resolve(horses);

                    }, reject);
                });
        });
    }
}
