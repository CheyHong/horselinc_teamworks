import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'apps-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations   : fuseAnimations,
})
export class UserLoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _formBuilder: FormBuilder,
        private _router: Router,
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
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit(): void
    {
        let loginType: string;
        let loginUrl: string;

        loginType = this.f.email.value === 'provider@gmail.com' ? 'provider' : 'manager';
        loginUrl = '/apps/horse/' + loginType;

        this._fuseNavigationService.setCurrentNavigation(loginType);
        console.log("onSubmit:", loginUrl);
        this._router.navigate([loginUrl]);
    }
}
