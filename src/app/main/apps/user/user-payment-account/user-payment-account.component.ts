import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
//import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';


@Component({
  selector: 'apps-user-payment-account',
  templateUrl: './user-payment-account.component.html',
  styleUrls: ['./user-payment-account.component.scss']
})
export class UserPaymentAccountComponent implements OnInit {
    accountForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
//        private _fuseSidebarService: FuseSidebarService,
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
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
        this.accountForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    toggleSidebarOpen(key): void
    {
//        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
