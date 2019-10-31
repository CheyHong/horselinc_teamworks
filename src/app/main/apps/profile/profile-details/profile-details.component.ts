import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';

import { Profile } from 'app/main/apps/profile/profile.model';
import { ProfileService } from 'app/main/apps/profile/profile.service';

@Component({
    selector     : 'profile-details',
    templateUrl  : './profile-details.component.html',
    styleUrls    : ['./profile-details.component.scss'],
//    encapsulation: ViewEncapsulation.None,
 //   animations   : fuseAnimations
})
export class ProfileDetailsComponent implements OnInit, OnDestroy
{
    todo: Profile;
    tags: any[];
    formType: string;
    todoForm: FormGroup;

    @ViewChild('titleInput', {static: false})
    titleInputField;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Profile} _todoService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _todoService: ProfileService,
        private _formBuilder: FormBuilder
    )
    {
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
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
     
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
}
