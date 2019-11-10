import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PaymentManager } from 'app/main/apps/payment/payment-manager/payment-manager.model';
import { PaymentManagerService } from 'app/main/apps/payment/payment-manager/payment-manager.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector     : 'payment-manager-list-item',
    templateUrl  : './payment-manager-list-item.component.html',
    styleUrls    : ['./payment-manager-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaymentManagerListItemComponent implements OnInit, OnDestroy
{
    tags: any[];

    @Input()
    payment: PaymentManager;

    @Input() completed1: boolean;

    @HostBinding('class.selected')
    selected: boolean;

    @HostBinding('class.completed')
    completed: boolean;

    @HostBinding('class.move-disabled')
    moveDisabled: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {PaymentManagerService} _paymentService
     * @param {ActivatedRoute} _activatedRoute
     */
    constructor(
        private _paymentService: PaymentManagerService,
        private _activatedRoute: ActivatedRoute
    )
    {
        // Disable move if path is not /all
        if ( _activatedRoute.snapshot.url[0].path !== 'all' )
        {
            this.moveDisabled = true;
        }

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
        // Set the initial values
        this.payment = new PaymentManager(this.payment);
        this.completed = this.payment.completed;

        // Subscribe to update on selected payment change
        this._paymentService.onSelectedPaymentsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedPayments => {
                this.selected = false;

                if ( selectedPayments.length > 0 )
                {
                    for ( const payment of selectedPayments )
                    {
                        if ( payment.id === this.payment.id )
                        {
                            this.selected = true;
                            break;
                        }
                    }
                }
            });

        // Subscribe to update on tag change
        this._paymentService.onTagsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(tags => {
                this.tags = tags;
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
     * On selected change
     */
    onSelectedChange(): void
    {
        this._paymentService.toggleSelectedPayment(this.payment.id);
    }

    /**
     * Toggle star
     */
    toggleStar(event): void
    {
        event.stopPropagation();

        this.payment.toggleStar();
        this._paymentService.updatePayment(this.payment);
    }

    /**
     * Toggle Important
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.payment.toggleImportant();
        this._paymentService.updatePayment(this.payment);
    }

    /**
     * Toggle Completed
     */
    toggleCompleted(event): void
    {
        event.stopPropagation();

        this.payment.toggleCompleted();
        this._paymentService.updatePayment(this.payment);
    }
}
