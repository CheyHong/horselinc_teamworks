import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';


import { Provider } from 'app/main/apps/horse/horse-provider/provider.model';
import { HorseProviderService } from 'app/main/apps/horse/horse-provider/horse-provider.service';

@Component({
    selector     : 'provider',
    templateUrl  : './horse-provider.component.html',
    styleUrls    : ['./horse-provider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HorseProviderComponent implements OnInit, OnDestroy
{
    hasSelectedProviders: boolean;
    isIndeterminate: boolean;
    filters: any[];
    tags: any[];
    searchInput: FormControl;
    currentProvider: Provider;
    currentHorseFlag: boolean;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {HorseProviderService} _providerService
     */
    constructor(
        private _horseProviderService: HorseProviderService,

    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._horseProviderService.onSelectedProvidersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedProviders => {
            });

        this._horseProviderService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this._horseProviderService.filters;
            });

       

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._horseProviderService.onSearchTextChanged.next(searchText);
            });

        this._horseProviderService.onCurrentProviderChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentProvider => {
                if ( !currentProvider )
                {
                    this.currentProvider = null;
                }
                else
                {
                    this.currentProvider = currentProvider;
                }
            });

        this._horseProviderService.onCurrentHorseFlagChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentHorseFlag => {
                this.currentHorseFlag = currentHorseFlag;
                console.log('CurrentHorseFlag:', this.currentHorseFlag);
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
     * Deselect current provider
     */
    deselectCurrentProvider(): void
    {
        this._horseProviderService.onCurrentProviderChanged.next(null);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        this._horseProviderService.toggleSelectAll();
    }

    /**
     * Select providers
     *
     * @param filterParameter
     * @param filterValue
     */
    selectProviders(filterParameter?, filterValue?): void
    {
        this._horseProviderService.selectProviders(filterParameter, filterValue);
    }

    /**
     * Deselect providers
     */
    deselectProviders(): void
    {
        this._horseProviderService.deselectProviders();
    }

    /**
     * Toggle tag on selected providers
     *
     * @param tagId
     */
    toggleTagOnSelectedProviders(tagId): void
    {
        this._horseProviderService.toggleTagOnSelectedProviders(tagId);
    }
    gotoList():void
    {
        this._horseProviderService.setCurrentHorseFlag(false);
    }

}
