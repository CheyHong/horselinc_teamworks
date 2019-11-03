import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';

import { Payment } from 'app/main/apps/payment/payment.model';
import { PaymentService } from 'app/main/apps/payment/payment.service';

@Component({
    selector     : 'payment',
    templateUrl  : './payment.component.html',
    styleUrls    : ['./payment.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class PaymentComponent implements OnInit, OnDestroy
{
    hasSelectedPayments: boolean;
    isIndeterminate: boolean;
    filters: any[];
    tags: any[];
    searchInput: FormControl;
    currentPayment: Payment;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {PaymentService} _paymentService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _paymentService: PaymentService,
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
        this._paymentService.onSelectedPaymentsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedPayments => {
            });

        this._paymentService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this._paymentService.filters;
            });

        this._paymentService.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tags => {
                this.tags = this._paymentService.tags;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._paymentService.onSearchTextChanged.next(searchText);
            });

        this._paymentService.onCurrentPaymentChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentPayment => {
                if ( !currentPayment )
                {
                    this.currentPayment = null;
                }
                else
                {
                    this.currentPayment = currentPayment;
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
     * 
     */
    deselectCurrentPayment(): void
    {
        this._paymentService.onCurrentPaymentChanged.next(null);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        this._paymentService.toggleSelectAll();
    }

    /**
     * 
     * @param filterParameter
     * @param filterValue
     */
    selectPayments(filterParameter?, filterValue?): void
    {
        this._paymentService.selectPayments(filterParameter, filterValue);
    }

    /**
     * 
     */
    deselectPayments(): void
    {
        this._paymentService.deselectPayments();
    }

    /**
     
     *
     * @param tagId
     */
    toggleTagOnSelectedPayments(tagId): void
    {
        this._paymentService.toggleTagOnSelectedPayments(tagId);
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
