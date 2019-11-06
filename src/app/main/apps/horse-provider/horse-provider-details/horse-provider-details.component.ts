import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'horse-provider-details',
    templateUrl: './horse-provider-details.component.html',
    styleUrls  : ['./horse-provider-details.component.scss']
})
export class HorseProviderDetailsComponent
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
