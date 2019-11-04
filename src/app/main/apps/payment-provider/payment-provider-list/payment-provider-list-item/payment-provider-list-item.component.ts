import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Provider } from 'app/main/apps/payment-provider/provider.model';
import { PaymentProviderService } from 'app/main/apps/payment-provider/payment-provider.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'payment-provider-list-item',
  templateUrl: './payment-provider-list-item.component.html',
  styleUrls: ['./payment-provider-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PaymentProviderListItemComponent implements OnInit, OnDestroy
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
        private _providerService: PaymentProviderService,
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
