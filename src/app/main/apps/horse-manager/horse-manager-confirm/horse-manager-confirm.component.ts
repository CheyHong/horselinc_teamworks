import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';

interface Food {
    value: string;
    viewValue: string;
  }
  
@Component({
    selector     : 'horse-manager-searchprofile',
    templateUrl  : './horse-manager-searchprofile.component.html',
    styleUrls    : ['./horse-manager-searchprofile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorseManagerSearchProfileComponent implements OnInit, OnDestroy
{
    hasSelectedHorseSearchProfileComponent: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentHorseSearchProfileComponent: HorseManagerSearchProfileComponent;

    foods:Food[];

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
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
    )
    
        // Configure the layout
        
      
    {

      
        // Load the translations
        // this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: false
                },
                toolbar  : {
                    hidden: false
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.searchInput.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        )
            
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
     * Toggle select all
     */
    toggleSelectAll(): void
    {
         
    }

   
    
    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
         this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
    confirmCancel():void
    {
        this._fuseSidebarService.getSidebar('horse-manager-confirm-panel').toggleOpen();
        this._fuseSidebarService.getSidebar('horse-manager-schedule-panel').toggleOpen();
    }   
   
}
 