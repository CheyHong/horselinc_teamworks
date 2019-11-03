import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Provider } from 'app/main/apps/provider-payment/provider.model';
import { ProviderPaymentService } from 'app/main/apps/provider-payment/provider-payment.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'provider-payment-list-item',
  templateUrl: './provider-payment-list-item.component.html',
  styleUrls: ['./provider-payment-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProviderPaymentListItemComponent implements OnInit, OnDestroy
{

    @Input()
    provider: Provider;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {PaymentService} _providerService
     * @param {ActivatedRoute} _activatedRoute
     */
    constructor(
        private _providerService: ProviderPaymentService,
    ){
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
