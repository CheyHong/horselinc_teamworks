import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'apps-user-payment-info',
  templateUrl: './user-payment-info.component.html',
  styleUrls: ['./user-payment-info.component.scss']
})
export class UserPaymentInfoComponent implements OnInit {
    infoForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder
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
}
