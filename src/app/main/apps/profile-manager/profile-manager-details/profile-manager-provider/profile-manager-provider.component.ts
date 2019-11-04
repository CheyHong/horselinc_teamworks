import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'apps-profile-manager-provider',
    templateUrl: './profile-manager-provider.component.html',
    styleUrls  : ['./profile-manager-provider.component.scss']
})
export class ProfileManagerProviderComponent
{
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
    )
    {
        // Configure the layout
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
}
