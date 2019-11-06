import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { HorseManager } from 'app/main/apps/horse-manager/horse-manager.model';
import { HorseManagerService } from 'app/main/apps/horse-manager/horse-manager.service';

import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector     : 'horse-manager',
    templateUrl  : './horse-manager.component.html',
    styleUrls    : ['./horse-manager.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorseManagerComponent implements OnInit, OnDestroy
{
    hasSelectedHorseManagers: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentHorseManager: HorseManager;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {HorseManagerService} _horsemanagerService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _horsemanagerService: HorseManagerService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
    )
    
        // Configure the layout   
    {
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
        this._horsemanagerService.onSelectedHorseManagersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedHorseManagers => {
                setTimeout(() => {
                    this.hasSelectedHorseManagers = selectedHorseManagers.length > 0;
                    this.isIndeterminate = (selectedHorseManagers.length !== this._horsemanagerService.horsemanagers.length && selectedHorseManagers.length > 0);
                }, 0);
            });

        this._horsemanagerService.onFoldersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.folders = this._horsemanagerService.folders;
            });

        this._horsemanagerService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this._horsemanagerService.filters;
            });

        this._horsemanagerService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = this._horsemanagerService.labels;
            });

        this._horsemanagerService.onCurrentHorseManagerChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentHorseManager => {
                if ( !currentHorseManager )
                {
                    this.currentHorseManager = null;
                }
                else
                {
                    this.currentHorseManager = currentHorseManager;
                }
            });

        this.searchInput.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        )
            .subscribe(searchText => {
                this._horsemanagerService.onSearchTextChanged.next(searchText);
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
        this._horsemanagerService.toggleSelectAll();
    }

    /**
     * Select horses
     *
     * @param filterParameter
     * @param filterValue
     */
    selectHorseManagers(filterParameter?, filterValue?): void
    {
        this._horsemanagerService.selectHorseManagers(filterParameter, filterValue);
    }

    /**
     * Deselect horses
     */
    deselectHorseManagers(): void
    {
        this._horsemanagerService.deselectHorseManagers();
    }

    /**
     * Deselect current horse
     */
    deselectCurrentHorseManager(): void
    {
        this._horsemanagerService.onCurrentHorseManagerChanged.next(null);
    }

    /**
     * Toggle label on selected horses
     *
     * @param labelId
     */
    toggleLabelOnSelectedHorseManagers(labelId): void
    {
        this._horsemanagerService.toggleLabelOnSelectedHorseManagers(labelId);
    }

    /**
     * Set folder on selected horses
     *
     * @param folderId
     */
    // setFolderOnSelectedHorseManagers(folderId): void
    // {
    //     this._horsemanagerService.setFolderOnSelectedHorseManagers(folderId);
    // }

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
