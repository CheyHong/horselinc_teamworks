import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { PaymentProviderService } from 'app/main/payment/payment-provider/payment-provider.service';
import { Provider } from 'app/main/payment/payment-provider/provider.model';

import { takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'payment-provider-list',
  templateUrl: './payment-provider-list.component.html',
  styleUrls: ['./payment-provider-list.component.scss']
})
export class PaymentProviderListComponent implements OnInit, OnDestroy {

    paid: boolean;
    providers: Provider[];
    currentProvider: Provider;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {PaymentProviderService} _providerService
     * @param {Location} _location
     */

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _location: Location,
        private _providerService: PaymentProviderService,
        private _fuseSidebarService: FuseSidebarService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.paid = true;
    }

    ngOnInit() {
        this._providerService.onProvidersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(providers => {
                this.providers = providers;
            });

        this._providerService.onCurrentProviderChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentPayment => {
                if ( !currentPayment )
                {
             
                    this.currentProvider = null;

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
                    this.currentProvider = currentPayment;
                }
            });
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
    onShowCreateDialog()
    {
        this._fuseSidebarService.getSidebar('payment-provider-create-panel').toggleOpen();
    }

    onDrop(ev): void
    {

    }
}
