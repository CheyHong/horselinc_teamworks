import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { Payment } from 'app/main/apps/payment/payment.model';
import { PaymentService } from 'app/main/apps/payment/payment.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class PaymentListComponent implements OnInit, OnDestroy {

    payments: Payment[];
    currentPayment: Payment;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {PaymentService} _managerService
     * @param {Location} _location
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _managerService: PaymentService,
        private _location: Location
    )
    {
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
   
        this._managerService.onPaymentsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(payments => {
                this.payments = payments;
            });

        this._managerService.onCurrentPaymentChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentPayment => {
                if ( !currentPayment )
                {
             
                    this.currentPayment = null;

                    // Handle the location changes
                    const tagHandle    = this._activatedRoute.snapshot.params.tagHandle,
                          filterHandle = this._activatedRoute.snapshot.params.filterHandle;

                    if ( tagHandle )
                    {
                        this._location.go('apps/payment/tag/' + tagHandle);
                    }
                    else if ( filterHandle )
                    {
                        this._location.go('apps/payment/filter/' + filterHandle);
                    }
                    else
                    {
                        this._location.go('apps/payment/all');
                    }
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
     * @param paymentId
     */
    readPayment(paymentId): void
    {
        this._managerService.setCurrentPayment(paymentId);
    }

    /**
     * On drop
     *
     * @param ev
     */
    onDrop(ev): void
    {

    }

}
