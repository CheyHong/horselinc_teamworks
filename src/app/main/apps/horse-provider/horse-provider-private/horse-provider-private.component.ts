import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
@Component({
    selector   : 'horse-provider-private',
    templateUrl: './horse-provider-private.component.html',
    styleUrls  : ['./horse-provider-private.component.scss']
})
export class HorseProviderPrivateComponent
{
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
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
    CancelPrivate():void{
        this._fuseSidebarService.getSidebar('horse-provider-private-panel').toggleOpen();
    }
}
