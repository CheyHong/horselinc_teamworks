import { Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Provider } from 'app/main/apps/horse-provider/provider.model';
import { HorseProviderService } from 'app/main/apps/horse-provider/horse-provider.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'horse-provider-list-item',
  templateUrl: './horse-provider-list-item.component.html',
  styleUrls: ['./horse-provider-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HorseProviderListItemComponent implements OnInit, OnDestroy
{

    @Input()
    provider: Provider;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {HorseService} _providerService
     * @param {ActivatedRoute} _activatedRoute
     */
    constructor(
        private _providerService: HorseProviderService,
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
