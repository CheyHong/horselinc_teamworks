import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { Edithorseprofile } from 'app/main/apps/edithorseprofile/edithorseprofile.model';
import { EdithorseprofileService } from 'app/main/apps/edithorseprofile/edithorseprofile.service';

// import { locale as english } from 'app/main/apps/edithorseprofile//i18n/en';
// import { locale as turkish } from 'app/main/apps/edithorseprofile//i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';

interface Food {
    value: string;
    viewValue: string;
  }
  
@Component({
    selector     : 'edit-horse-profile',
    templateUrl  : './edithorseprofile.component.html',
    styleUrls    : ['./edithorseprofile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EdithorseprofileComponent implements OnInit, OnDestroy
{
    hasSelectedEdithorseprofiles: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentEdithorseprofile: Edithorseprofile;

    foods:Food[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EdithorseprofileService} _edithorseprofileService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _edithorseprofileService: EdithorseprofileService,
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

        this.foods = [
            {value: 'steak-0', viewValue: 'Steak'},
            {value: 'pizza-1', viewValue: 'Pizza'},
            {value: 'tacos-2', viewValue: 'Tacos'}
          ];

        this._edithorseprofileService.onSelectedEdithorseprofilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedEdithorseprofiles => {
                setTimeout(() => {
                    this.hasSelectedEdithorseprofiles = selectedEdithorseprofiles.length > 0;
                    this.isIndeterminate = (selectedEdithorseprofiles.length !== this._edithorseprofileService.edithorseprofiles.length && selectedEdithorseprofiles.length > 0);
                }, 0);
            });

        this._edithorseprofileService.onFoldersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.folders = this._edithorseprofileService.folders;
            });

        this._edithorseprofileService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this._edithorseprofileService.filters;
            });

        this._edithorseprofileService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = this._edithorseprofileService.labels;
            });

        this._edithorseprofileService.onCurrentEdithorseprofileChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentEdithorseprofile => {
                if ( !currentEdithorseprofile )
                {
                    this.currentEdithorseprofile = null;
                }
                else
                {
                    this.currentEdithorseprofile = currentEdithorseprofile;
                }
            });

        this.searchInput.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        )
            .subscribe(searchText => {
                this._edithorseprofileService.onSearchTextChanged.next(searchText);
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
         this._edithorseprofileService.toggleSelectAll();
    }

    /**
     * Select edithorseprofiles
     *
     * @param filterParameter
     * @param filterValue
     */
    selectEdithorseprofiles(filterParameter?, filterValue?): void
    {
         this._edithorseprofileService.selectEdithorseprofiles(filterParameter, filterValue);
    }

    /**
     * Deselect edithorseprofiles
     */
    deselectEdithorseprofiles(): void
    {
         this._edithorseprofileService.deselectEdithorseprofiles();
    }

    /**
     * Deselect current edithorseprofile
     */
    deselectCurrentEdithorseprofile(): void
    {
        this._edithorseprofileService.onCurrentEdithorseprofileChanged.next(null);
    }

    /**
     * Toggle label on selected edithorseprofiles
     *
     * @param labelId
     */
    toggleLabelOnSelectedEdithorseprofiles(labelId): void
    {
         this._edithorseprofileService.toggleLabelOnSelectedEdithorseprofiles(labelId);
    }

    /**
     * Set folder on selected edithorseprofiles
     *
     * @param folderId
     */
    setFolderOnSelectedEdithorseprofiles(folderId): void
    {
         this._edithorseprofileService.setFolderOnSelectedEdithorseprofiles(folderId);
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
   
}
 