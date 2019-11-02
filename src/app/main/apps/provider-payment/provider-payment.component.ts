import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';

import { Provider } from 'app/main/apps/provider-payment/provider.model';
import { ProviderPaymentService } from 'app/main/apps/provider-payment/provider-payment.service';

@Component({
    selector     : 'provider',
    templateUrl  : './provider-payment.component.html',
    styleUrls    : ['./provider-payment.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProviderPaymentComponent implements OnInit, OnDestroy
{
    hasSelectedTodos: boolean;
    isIndeterminate: boolean;
    filters: any[];
    tags: any[];
    searchInput: FormControl;
    currentTodo: Provider;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProviderPaymentService} _todoService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _todoService: ProviderPaymentService,
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
        // this._todoService.onSelectedTodosChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(selectedTodos => {
        //     });

        // this._todoService.onFiltersChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(folders => {
        //         this.filters = this._todoService.filters;
        //     });

        // this._todoService.onTagsChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(tags => {
        //         this.tags = this._todoService.tags;
        //     });

        // this.searchInput.valueChanges
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         debounceTime(300),
        //         distinctUntilChanged()
        //     )
        //     .subscribe(searchText => {
        //         this._todoService.onSearchTextChanged.next(searchText);
        //     });

        // this._todoService.onCurrentTodoChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(([currentTodo, formType]) => {
        //         if ( !currentTodo )
        //         {
        //             this.currentTodo = null;
        //         }
        //         else
        //         {
        //             this.currentTodo = currentTodo;
        //         }
        //     });
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
     * Deselect current todo
     */
    deselectCurrentTodo(): void
    {
        this._todoService.onCurrentProviderChanged.next([null, null]);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        // this._todoService.toggleSelectAll();
    }

    /**
     * Select todos
     *
     * @param filterParameter
     * @param filterValue
     */
    selectTodos(filterParameter?, filterValue?): void
    {
        // this._todoService.selectProviders(filterParameter, filterValue);
    }

    /**
     * Deselect todos
     */
    deselectTodos(): void
    {
        // this._todoService.deselectProviders();
    }

    /**
     * Toggle tag on selected todos
     *
     * @param tagId
     */
    toggleTagOnSelectedTodos(tagId): void
    {
        // this._todoService.toggleTagOnSelectedProviders(tagId);
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
