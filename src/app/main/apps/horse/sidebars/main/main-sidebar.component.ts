import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { HorseService } from 'app/main/apps/horse/horse.service';
import { HorseComposeDialogComponent } from 'app/main/apps/horse/dialogs/compose/compose.component';

@Component({
    selector     : 'horse-main-sidebar',
    templateUrl  : './main-sidebar.component.html',
    styleUrls    : ['./main-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HorseMainSidebarComponent implements OnInit, OnDestroy
{
    folders: any[];
    filters: any[];
    labels: any[];
    accounts: object;
    selectedAccount: string;
    dialogRef: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {horseService} _horseService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _horseService: HorseService,
        public _matDialog: MatDialog
    )
    {
        // Set the defaults
        this.accounts = {
            creapond    : 'johndoe@creapond.com',
            withinpixels: 'johndoe@withinpixels.com'
        };
        this.selectedAccount = 'creapond';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._horseService.onFoldersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.folders = folders;
            });

        this._horseService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(filters => {
                this.filters = filters;
            });

        this._horseService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
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
     * Compose dialog
     */
    composeDialog(): void
    {
        this.dialogRef = this._matDialog.open(HorseComposeDialogComponent, {
            panelClass: 'horse-compose-dialog'
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Send
                     */
                    case 'send':
                        console.log('new horse', formData.getRawValue());
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        console.log('delete horse');
                        break;
                }
            });
    }
}
