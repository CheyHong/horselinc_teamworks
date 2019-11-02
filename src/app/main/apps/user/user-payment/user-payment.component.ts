import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'apps-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss']
})
export class UserPaymentComponent implements OnInit {
    accountForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
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
    toggleSidebarOpen(): void
    {
        this._fuseSidebarService.getSidebar('user-payment-info-panel').toggleOpen();
    }
}
