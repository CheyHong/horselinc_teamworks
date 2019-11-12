import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { HorseManager } from 'app/main/horse/horse-manager/horse-manager.model';

@Injectable()
export class HorseManagerService implements Resolve<any>
{
    horsemanagers: HorseManager[];
    selectedHorseManagers: HorseManager[];
    currentHorseManager: HorseManager;
    searchText = '';
    currentHorseFlag: boolean;

    folders: any[];
    filters: any[];
    labels: any[];
    routeParams: any;

    onHorseManagersChanged: BehaviorSubject<any>;
    onSelectedHorseManagersChanged: BehaviorSubject<any>;
    onCurrentHorseManagerChanged: BehaviorSubject<any>;
    onFoldersChanged: BehaviorSubject<any>;
    onFiltersChanged: BehaviorSubject<any>;
    onLabelsChanged: BehaviorSubject<any>;
    onSearchTextChanged: BehaviorSubject<any>;
    onCurrentHorseFlagChanged: BehaviorSubject<any>;
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
        this.selectedHorseManagers = [];
        this.onHorseManagersChanged = new BehaviorSubject([]);
        this.onSelectedHorseManagersChanged = new BehaviorSubject([]);
        this.onCurrentHorseManagerChanged = new BehaviorSubject([]);
        this.onFoldersChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onLabelsChanged = new BehaviorSubject([]);
        this.onCurrentHorseFlagChanged = new BehaviorSubject([]);
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
                this.getHorseManagers()
            ]).then(
                () => {
                    
                    this.setCurrentHorseManager(this.horsemanagers[0].id);
                    
                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getHorseManagers();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getHorseManagers();
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
            this._httpClient.get('api/horsemanager-folders')
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
            this._httpClient.get('api/horsemanager-filters')
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
            this._httpClient.get('api/horsemanager-labels')
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
     * @returns {Promise<HorseManager[]>}
     */
    getHorseManagers(): Promise<HorseManager[]>
    {
        if ( this.routeParams.labelHandle )
        {
            return this.getHorseManagersByLabel(this.routeParams.labelHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getHorseManagersByFilter(this.routeParams.filterHandle);
        }

        return this.getHorseManagersByFolder(this.routeParams.folderHandle);
    }

    /**
     * Get horses by folder
     *
     * @param handle
     * @returns {Promise<horse[]>}
     */
    getHorseManagersByFolder(handle): Promise<HorseManager[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/horsemanager-folders?handle=' + handle)
                .subscribe((folders: any) => {

                    const folderId = folders[0].id;

                    this._httpClient.get('api/horsemanager-horsemanagers?folder=' + folderId)
                        .subscribe((horsemanagers: any) => {

                            this.horsemanagers = horsemanagers.map(horsemanager => {
                                return new HorseManager(horsemanager);
                            });

                            this.horsemanagers = FuseUtils.filterArrayByString(this.horsemanagers, this.searchText);

                            this.onHorseManagersChanged.next(this.horsemanagers);

                            resolve(this.horsemanagers);

                        }, reject);
                });
        });
    }

    /**
     * Get horses by filter
     *
     * @param handle
     * @returns {Promise<horsemanager[]>}
     */
    getHorseManagersByFilter(handle): Promise<HorseManager[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/horsemanager-horsemanagers?' + handle + '=true')
                .subscribe((horsemanagers: any) => {

                    this.horsemanagers = horsemanagers.map(horsemanager => {
                        return new horsemanager(horsemanager);
                    });

                    this.horsemanagers = FuseUtils.filterArrayByString(this.horsemanagers, this.searchText);

                    this.onHorseManagersChanged.next(this.horsemanagers);

                    resolve(this.horsemanagers);

                }, reject);
        });
    }

    /**
     * Get horses by label
     *
     * @param handle
     * @returns {Promise<horsemanger[]>}
     */
    getHorseManagersByLabel(handle): Promise<HorseManager[]>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/horsemanager-labels?handle=' + handle)
                .subscribe((labels: any) => {

                    const labelId = labels[0].id;

                    this._httpClient.get('api/horse-horses?labels=' + labelId)
                        .subscribe((horsemanagers: any) => {

                            this.horsemanagers = horsemanagers.map(horsemanager => {
                                return new HorseManager(horsemanager);
                            });

                            this.horsemanagers = FuseUtils.filterArrayByString(this.horsemanagers, this.searchText);

                            this.onHorseManagersChanged.next(this.horsemanagers);

                            resolve(this.horsemanagers);

                        }, reject);
                });
        });
    }

    /**
     * Toggle selected horse by id
     *
     * @param id
     */
    toggleSelectedHorseManager(id): void
    {
        // First, check if we already have that horse as selected...
        if ( this.selectedHorseManagers.length > 0 )
        {
            for ( const horsemanager of this.selectedHorseManagers )
            {
                // ...delete the selected horse
                if ( horsemanager.id === id )
                {
                    const index = this.selectedHorseManagers.indexOf(horsemanager);

                    if ( index !== -1 )
                    {
                        this.selectedHorseManagers.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedHorseManagersChanged.next(this.selectedHorseManagers);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedHorseManagers.push(
            this.horsemanagers.find(horsemanager => {
                return horsemanager.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedHorseManagersChanged.next(this.selectedHorseManagers);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedHorseManagers.length > 0 )
        {
            this.deselectHorseManagers();
        }
        else
        {
            this.selectHorseManagers();
        }

    }

    /**
     * Select horses
     *
     * @param filterParameter
     * @param filterValue
     */
    selectHorseManagers(filterParameter?, filterValue?): void
    {
        this.selectedHorseManagers = [];

        // If there is no filter, select all horses
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedHorseManagers = this.horsemanagers;
        }
        else
        {
            this.selectedHorseManagers.push(...
                this.horsemanagers.filter(horsemanager => {
                    return horsemanager[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedHorseManagersChanged.next(this.selectedHorseManagers);
    }

    /**
     * Deselect horses
     */
    deselectHorseManagers(): void
    {
        this.selectedHorseManagers = [];

        // Trigger the next event
        this.onSelectedHorseManagersChanged.next(this.selectedHorseManagers);
    }

    /**
     * Set current horse by id
     *
     * @param id
     */
    setCurrentHorseManager(id): void
    {
        this.currentHorseManager = this.horsemanagers.find(horsemanager => {
            return horsemanager.id === id;
        });

        this.onCurrentHorseManagerChanged.next(this.currentHorseManager);
    }

    /**
     * Toggle label on selected horses
     *
     * @param labelId
     */
    toggleLabelOnSelectedHorseManagers(labelId): void
    {
        this.selectedHorseManagers.map(horsemanager => {

            const index = horsemanager.labels.indexOf(labelId);

            if ( index !== -1 )
            {
                horsemanager.labels.splice(index, 1);
            }
            else
            {
                horsemanager.labels.push(labelId);
            }

            this.updateHorseManager(horsemanager);
        });
    }

    /**
     * Set folder on selected horses
     *
     * @param folderId
     */
    setFolderOnSelectedHorses(folderId): void
    {
        this.selectedHorseManagers.map(horsemanager => {
            horsemanager.folder = folderId;

            this.updateHorseManager(horsemanager);
        });

        this.deselectHorseManagers();
    }

    /**
     * Update the horse
     *
     * @param horse
     * @returns {Promise<any>}
     */
    updateHorseManager(horsemanager): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/horsemanager-horsemanager/' + horsemanager.id, {...horsemanager})
                .subscribe(response => {

                    this.getHorseManagers().then(horsemanagers => {

                        if ( horsemanagers && this.currentHorseManager )
                        {
                            this.setCurrentHorseManager(this.currentHorseManager.id);
                        }

                        resolve(horsemanagers);

                    }, reject);
                });
        });
    }
    setCurrentHorseFlag(currentHorseFlag: boolean): void
    {
        this.currentHorseFlag = currentHorseFlag; 
        console.log('CurrentHorseFlag', this.currentHorseFlag);
        this.onCurrentHorseFlagChanged.next(this.currentHorseFlag);
       
    } 
}
