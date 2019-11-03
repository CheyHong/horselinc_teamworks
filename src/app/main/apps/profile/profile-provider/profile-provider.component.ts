import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'profile-provider',
    templateUrl: './profile-provider.component.html',
    styleUrls  : ['./profile-provider.component.scss']
})
export class ProfileProviderComponent
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
