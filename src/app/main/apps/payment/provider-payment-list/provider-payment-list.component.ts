import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { ProviderPaymentService } from 'app/main/apps/payment/provider-payment.service';
import { Provider } from 'app/main/apps/payment/provider.model';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'provider-payment-list',
  templateUrl: './provider-payment-list.component.html',
  styleUrls: ['./provider-payment-list.component.scss']
})
export class ProviderPaymentListComponent implements OnInit, OnDestroy {

    providers: Provider[];
    currentProvider: Provider;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {ProviderPaymentService} _providerService
     * @param {Location} _location
     */

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _location: Location,
        private _providerService: ProviderPaymentService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        // Subscribe to update todos on changes
        this._providerService.onProvidersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(providers => {
                this.providers = providers;
            }
        );
    }

    readProvider(providerId): void {
        this._providerService.setCurrentProvider(providerId);
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

}
