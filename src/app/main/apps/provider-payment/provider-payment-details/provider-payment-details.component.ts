import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';

import { Provider } from 'app/main/apps/provider-payment/provider.model';
import { ProviderPaymentService } from 'app/main/apps/provider-payment/provider-payment.service';

@Component({
  selector: 'provider-payment-details',
  templateUrl: './provider-payment-details.component.html',
  styleUrls: ['./provider-payment-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class ProviderPaymentDetailsComponent implements OnInit, OnDestroy
{
    provider: Provider;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Payment} _providerService
     * @param {FormBuilder} _formBuilder
     */

    constructor(
        private _providerService: ProviderPaymentService,
        private _formBuilder: FormBuilder
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        
        this._providerService.onCurrentProviderChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(provider => {
                this.provider = provider;
            });

        this._providerService.onNewProviderClicked
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.provider = new Provider({});
                this.provider.id = FuseUtils.generateGUID();
                this._providerService.onCurrentProviderChanged.next([this.provider, 'new']);
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

}
