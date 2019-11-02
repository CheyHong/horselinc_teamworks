import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Edithorseprofile } from 'app/main/apps/edithorseprofile/edithorseprofile.model';

@Injectable()
export class EdithorseprofileService implements Resolve<any>
{
    edithorseprofiles: Edithorseprofile[];
    selectedEdithorseprofiles: Edithorseprofile[];
    currentEdithorseprofile: Edithorseprofile;
    searchText = '';

    folders: any[];
    filters: any[];
    labels: any[];
    routeParams: any;

    onEdithorseprofilesChanged: BehaviorSubject<any>;
    onSelectedEdithorseprofilesChanged: BehaviorSubject<any>;
    onCurrentEdithorseprofileChanged: BehaviorSubject<any>;
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
        this.selectedEdithorseprofiles = [];
        this.onEdithorseprofilesChanged = new BehaviorSubject([]);
        this.onSelectedEdithorseprofilesChanged = new BehaviorSubject([]);
        this.onCurrentEdithorseprofileChanged = new BehaviorSubject([]);
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
                this.getEdithorseprofiles()
            ]).then(
                () => {
                    if ( this.routeParams.edithorseprofileId )
                    {
                        this.setCurrentEdithorseprofile(this.routeParams.edithorseprofileId);
                    }
                    else
                    {
                        this.setCurrentEdithorseprofile(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getEdithorseprofiles();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getEdithorseprofiles();
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
            this._httpClient.get('api/edithorseprofile-folders')
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
            this._httpClient.get('api/edithorseprofile-filters')
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
            this._httpClient.get('api/edithorseprofile-labels')
                .subscribe((response: any) => {
                    this.labels = response;
                    this.onLabelsChanged.next(this.labels);
                    resolve(this.labels);
                }, reject);
        });
    }

    /**
     * Get all Edithorseprofiles
     *
     * @returns {Promise<Edithorseprofile[]>}
     */
    getEdithorseprofiles(): Promise<Edithorseprofile[]>
    {
        if ( this.routeParams.labelHandle )
        {
            return this.getEdithorseprofilesByLabel(this.routeParams.labelHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getEdithorseprofilesByFilter(this.routeParams.filterHandle);
        }

        return this.getEdithorseprofilesByFolder(this.routeParams.folderHandle);
    }

    /**
     * Get edithorseprofiles by folder
     *
     * @param handle
     * @returns {Promise<edithorseprofile[]>}
     */
    getEdithorseprofilesByFolder(handle): Promise<Edithorseprofile[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/edithorseprofile-folders?handle=' + handle)
                .subscribe((folders: any) => {

                    const folderId = folders[0].id;

                    this._httpClient.get('api/edithorseprofile-edithorseprofiles?folder=' + folderId)
                        .subscribe((edithorseprofiles: any) => {

                            this.edithorseprofiles = edithorseprofiles.map(edithorseprofile => {
                                return new Edithorseprofile(edithorseprofile);
                            });

                            this.edithorseprofiles = FuseUtils.filterArrayByString(this.edithorseprofiles, this.searchText);

                            this.onEdithorseprofilesChanged.next(this.edithorseprofiles);

                            resolve(this.edithorseprofiles);

                        }, reject);
                });
        });
    }

    /**
     * Get edithorseprofiles by filter
     *
     * @param handle
     * @returns {Promise<Edithorseprofile[]>}
     */
    getEdithorseprofilesByFilter(handle): Promise<Edithorseprofile[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/edithorseprofile-edithorseprofiles?' + handle + '=true')
                .subscribe((edithorseprofiles: any) => {

                    this.edithorseprofiles = edithorseprofiles.map(edithorseprofile => {
                        return new Edithorseprofile(edithorseprofile);
                    });

                    this.edithorseprofiles = FuseUtils.filterArrayByString(this.edithorseprofiles, this.searchText);

                    this.onEdithorseprofilesChanged.next(this.edithorseprofiles);

                    resolve(this.edithorseprofiles);

                }, reject);
        });
    }

    /**
     * Get edithorseprofiles by label
     *
     * @param handle
     * @returns {Promise<Edithorseprofile[]>}
     */
    getEdithorseprofilesByLabel(handle): Promise<Edithorseprofile[]>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/edithorseprofile-labels?handle=' + handle)
                .subscribe((labels: any) => {

                    const labelId = labels[0].id;

                    this._httpClient.get('api/edithorseprofile-edithorseprofiles?labels=' + labelId)
                        .subscribe((edithorseprofiles: any) => {

                            this.edithorseprofiles = edithorseprofiles.map(edithorseprofile => {
                                return new Edithorseprofile(edithorseprofile);
                            });

                            this.edithorseprofiles = FuseUtils.filterArrayByString(this.edithorseprofiles, this.searchText);

                            this.onEdithorseprofilesChanged.next(this.edithorseprofiles);

                            resolve(this.edithorseprofiles);

                        }, reject);
                });
        });
    }

    /**
     * Toggle selected edithorseprofile by id
     *
     * @param id
     */
    toggleSelectedEdithorseprofile(id): void
    {
        // First, check if we already have that edithorseprofile as selected...
        if ( this.selectedEdithorseprofiles.length > 0 )
        {
            for ( const edithorseprofile of this.selectedEdithorseprofiles )
            {
                // ...delete the selected edithorseprofile
                if ( edithorseprofile.id === id )
                {
                    const index = this.selectedEdithorseprofiles.indexOf(edithorseprofile);

                    if ( index !== -1 )
                    {
                        this.selectedEdithorseprofiles.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedEdithorseprofilesChanged.next(this.selectedEdithorseprofiles);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedEdithorseprofiles.push(
            this.edithorseprofiles.find(edithorseprofile => {
                return edithorseprofile.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedEdithorseprofilesChanged.next(this.selectedEdithorseprofiles);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedEdithorseprofiles.length > 0 )
        {
            this.deselectEdithorseprofiles();
        }
        else
        {
            this.selectEdithorseprofiles();
        }

    }

    /**
     * Select edithorseprofiles
     *
     * @param filterParameter
     * @param filterValue
     */
    selectEdithorseprofiles(filterParameter?, filterValue?): void
    {
        this.selectedEdithorseprofiles = [];

        // If there is no filter, select all edithorseprofiles
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedEdithorseprofiles = this.edithorseprofiles;
        }
        else
        {
            this.selectedEdithorseprofiles.push(...
                this.edithorseprofiles.filter(edithorseprofile => {
                    return edithorseprofile[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedEdithorseprofilesChanged.next(this.selectedEdithorseprofiles);
    }

    /**
     * Deselect edithorseprofiles
     */
    deselectEdithorseprofiles(): void
    {
        this.selectedEdithorseprofiles = [];

        // Trigger the next event
        this.onSelectedEdithorseprofilesChanged.next(this.selectedEdithorseprofiles);
    }

    /**
     * Set current edithorseprofile by id
     *
     * @param id
     */
    setCurrentEdithorseprofile(id): void
    {
        this.currentEdithorseprofile = this.edithorseprofiles.find(edithorseprofile => {
            return edithorseprofile.id === id;
        });

        this.onCurrentEdithorseprofileChanged.next(this.currentEdithorseprofile);
    }

    /**
     * Toggle label on selected edithorseprofiles
     *
     * @param labelId
     */
    toggleLabelOnSelectedEdithorseprofiles(labelId): void
    {
        this.selectedEdithorseprofiles.map(edithorseprofile => {

            const index = edithorseprofile.labels.indexOf(labelId);

            if ( index !== -1 )
            {
                edithorseprofile.labels.splice(index, 1);
            }
            else
            {
                edithorseprofile.labels.push(labelId);
            }

            this.updateEdithorseprofile(edithorseprofile);
        });
    }

    /**
     * Set folder on selected edithorseprofiles
     *
     * @param folderId
     */
    setFolderOnSelectedEdithorseprofiles(folderId): void
    {
        this.selectedEdithorseprofiles.map(edithorseprofile => {
            edithorseprofile.folder = folderId;

            this.updateEdithorseprofile(edithorseprofile);
        });

        this.deselectEdithorseprofiles();
    }

    /**
     * Update the edithorseprofile
     *
     * @param edithorseprofile
     * @returns {Promise<any>}
     */
    updateEdithorseprofile(edithorseprofile): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/edithorseprofile-edithorseprofiles/' + edithorseprofile.id, {...edithorseprofile})
                .subscribe(response => {

                    this.getEdithorseprofiles().then(edithorseprofiles => {

                        if ( edithorseprofiles && this.currentEdithorseprofile )
                        {
                            this.setCurrentEdithorseprofile(this.currentEdithorseprofile.id);
                        }

                        resolve(edithorseprofiles);

                    }, reject);
                });
        });
    }
}
