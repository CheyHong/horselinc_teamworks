import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { Horse } from 'app/main/apps/horse/horse.model';
import { HorseService } from 'app/main/apps/horse/horse.service';

import { locale as english } from 'app/main/apps/horse//i18n/en';
import { locale as turkish } from 'app/main/apps/horse//i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector     : 'horse',
    templateUrl  : './horse.component.html',
    styleUrls    : ['./horse.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorseComponent implements OnInit, OnDestroy
{
    hasSelectedHorses: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentHorse: Horse;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {HorseService} _horseService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _horseService: HorseService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
    )
    
        // Configure the layout
        
    
    {
        // Load the translations
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

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
        this._horseService.onSelectedHorsesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedHorses => {
                setTimeout(() => {
                    this.hasSelectedHorses = selectedHorses.length > 0;
                    this.isIndeterminate = (selectedHorses.length !== this._horseService.horses.length && selectedHorses.length > 0);
                }, 0);
            });

        this._horseService.onFoldersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.folders = this._horseService.folders;
            });

        this._horseService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this._horseService.filters;
            });

        this._horseService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = this._horseService.labels;
            });

        this._horseService.onCurrentHorseChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentHorse => {
                if ( !currentHorse )
                {
                    this.currentHorse = null;
                }
                else
                {
                    this.currentHorse = currentHorse;
                }
            });

        this.searchInput.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        )
            .subscribe(searchText => {
                this._horseService.onSearchTextChanged.next(searchText);
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
        this._horseService.toggleSelectAll();
    }

    /**
     * Select horses
     *
     * @param filterParameter
     * @param filterValue
     */
    selecthorses(filterParameter?, filterValue?): void
    {
        this._horseService.selectHorses(filterParameter, filterValue);
    }

    /**
     * Deselect horses
     */
    deselectHorses(): void
    {
        this._horseService.deselectHorses();
    }

    /**
     * Deselect current horse
     */
    deselectCurrentHorse(): void
    {
        this._horseService.onCurrentHorseChanged.next(null);
    }

    /**
     * Toggle label on selected horses
     *
     * @param labelId
     */
    toggleLabelOnSelectedHorses(labelId): void
    {
        this._horseService.toggleLabelOnSelectedHorses(labelId);
    }

    /**
     * Set folder on selected horses
     *
     * @param folderId
     */
    setFolderOnSelectedHorses(folderId): void
    {
        this._horseService.setFolderOnSelectedHorses(folderId);
    }

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
