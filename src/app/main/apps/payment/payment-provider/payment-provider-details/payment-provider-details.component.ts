import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';

import { Provider } from 'app/main/apps/payment/payment-provider/provider.model';
import { PaymentProviderService } from 'app/main/apps/payment/payment-provider/payment-provider.service';

@Component({
  selector: 'payment-provider-details',
  templateUrl: './payment-provider-details.component.html',
  styleUrls: ['./payment-provider-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})

export class PaymentProviderDetailsComponent implements OnInit, OnDestroy
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
        private _providerService: PaymentProviderService,
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
