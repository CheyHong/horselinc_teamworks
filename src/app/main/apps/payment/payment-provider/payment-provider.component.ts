import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';

import { Provider } from 'app/main/apps/payment/payment-provider/provider.model';
import { PaymentProviderService } from 'app/main/apps/payment/payment-provider/payment-provider.service';

@Component({
    selector     : 'provider',
    templateUrl  : './payment-provider.component.html',
    styleUrls    : ['./payment-provider.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PaymentProviderComponent implements OnInit, OnDestroy
{
    hasSelectedProviders: boolean;
    isIndeterminate: boolean;
    filters: any[];
    tags: any[];
    searchInput: FormControl;
    currentProvider: Provider;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {PaymentProviderService} _providerService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _providerService: PaymentProviderService,
        private _fuseConfigService: FuseConfigService,

    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // Configure the layout
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
        this._providerService.onSelectedProvidersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedProviders => {
            });

        this._providerService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this._providerService.filters;
            });

        this._providerService.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tags => {
                this.tags = this._providerService.tags;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._providerService.onSearchTextChanged.next(searchText);
            });

        this._providerService.onCurrentProviderChanged
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
        this._providerService.onCurrentProviderChanged.next(null);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        this._providerService.toggleSelectAll();
    }

    /**
     * Select providers
     *
     * @param filterParameter
     * @param filterValue
     */
    selectProviders(filterParameter?, filterValue?): void
    {
        this._providerService.selectProviders(filterParameter, filterValue);
    }

    /**
     * Deselect providers
     */
    deselectProviders(): void
    {
        this._providerService.deselectProviders();
    }

    /**
     * Toggle tag on selected providers
     *
     * @param tagId
     */
    toggleTagOnSelectedProviders(tagId): void
    {
        this._providerService.toggleTagOnSelectedProviders(tagId);
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
