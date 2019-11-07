import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
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
        private _fuseSidebarService: FuseSidebarService,
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
    AddNote():void{

        this._fuseSidebarService.getSidebar('horse-provider-private-panel').toggleOpen();
    //     this._fuseSidebarService.getSidebar('horse-manager-confirm-panel').toggleOpen();
    }
    CreateInvoice():void{
        this._fuseSidebarService.getSidebar('horse-provider-invoice-panel').toggleOpen();
    }
}
