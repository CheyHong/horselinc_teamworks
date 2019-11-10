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
    selector     : 'horse-manager-profile',
    templateUrl  : './horse-manager-profile.component.html',
    styleUrls    : ['./horse-manager-profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HorseManagerProfileComponent implements OnInit, OnDestroy
{
    hasSelectedHorseProfileComponent: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentHorseProfileComponent: HorseManagerProfileComponent;

    stateMessage: string;
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

        this.foods = [
            {value: 'steak-0', viewValue: 'Steak'},
            {value: 'pizza-1', viewValue: 'Pizza'},
            {value: 'tacos-2', viewValue: 'Tacos'}
          ];


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

    
  

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
         this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
    ProfileDelete():void
    {
        this.stateMessage = "Delete Button Click!";
    }
    ProfileSave():void
    {
        this.stateMessage = "Save Button Click!";
    }
    ProfileCancel():void
    {
        this._fuseSidebarService.getSidebar('horse-manager-profile-panel').toggleOpen();
    }

}
 