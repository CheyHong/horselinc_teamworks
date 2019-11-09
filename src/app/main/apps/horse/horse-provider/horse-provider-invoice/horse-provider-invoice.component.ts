import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';

interface Food {
    value: string;
    viewValue: string;
  }
  
@Component({
    selector     : 'horse-provider-invoice',
    templateUrl  : './horse-provider-invoice.component.html',
    styleUrls    : ['./horse-provider-invoice.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorseProviderInvoiceComponent implements OnInit, OnDestroy
{

    currentHorseScheduleComponent: HorseProviderInvoiceComponent;
    toggle: boolean;
    foods: Food[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * 
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
    )
    
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
      
        this.foods = [
            {value: 'steak-0', viewValue: 'Steak'},
            {value: 'pizza-1', viewValue: 'Pizza'},
            {value: 'tacos-2', viewValue: 'Tacos'}
          ];

        this.toggle = true;

    }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle select all
     */
  
   
    InvoiceCancel():void
    {
        this._fuseSidebarService.getSidebar('horse-provider-invoice-panel').toggleOpen();
    }
    InvoiceSave():void
    {
        this._fuseSidebarService.getSidebar('horse-provider-invoice-panel').toggleOpen();
        this._fuseSidebarService.getSidebar('horse-provider-confirm-panel').toggleOpen();
    }    
    AddService():void
    {
        this.toggle = !this.toggle;
        console.log(this.toggle);
    }
}

