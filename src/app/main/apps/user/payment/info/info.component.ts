import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
  selector: 'user-payment-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class UserPaymentInfoComponent implements OnInit {
    infoForm: FormGroup;

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
        this.infoForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    closePanel(): void
    {
        this._fuseSidebarService.getSidebar('user-payment-info').toggleOpen();
    }
    openPaymentApprover(): void
    {
        this._fuseSidebarService.getSidebar('user-payment-info').close();
        this._fuseSidebarService.getSidebar('user-payment-approver').toggleOpen();
    }
}
